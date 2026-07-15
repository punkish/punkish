// node generator.js
// 👉 Development mode (starts server & watches files)
// node generator.js development (or --development)
// 👉 Development mode (starts server & watches files)
// node generator.js production (or --production / -p)
// 👉 Production mode (runs a single build and writes static files to disk)

import { promises as fs, readdirSync, readFileSync, existsSync, statSync } from 'fs';
import path from 'path';
import Walker from 'walker';
import yamlFront from 'yaml-front-matter';
import showdown from 'showdown';
import { footnotes } from './lib/showdown-footnotes.js';
import browserSync from 'browser-sync';
import Handlebars from 'handlebars';

const settings = {
    dir: {
        entries: './entries',
        templates: './templates',
        docs: './docs',
        hanozDir: './docs/Hanoz'
    },
    dateOptions: { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    },
    baseUrl: '',
    untaggedLabel: 'untagged',
    publishedFile: './published.json',
    me: 'Puneet Kishor',
    minisearchOpts: {
    
        // fields to index for full-text search
        fields: ['title', 'name', 'text'],
    
        processTerm: (term, _fieldName) => stopWords.has(term) 
            ? null 
            : term.toLowerCase(),
    
        searchOptions: {
            boost: { title: 2 },
            fuzzy: 0.2
        },
    
        // fields to return with search results
        storeFields: ['title', 'name']
    },
    stopWords: new Set([
        'and', 'or', 'to', 'in', 'a', 'the', /* ...and more */ 
    ])
};

class SiteGenerator {
    constructor(mode = 'development') {
        this.mode = mode;
        this.templates = this.compileTemplates(settings.dir.templates);
        this.bs = browserSync.create();
        this.converter = new showdown.Converter({
            extensions: [ footnotes ], 
            tables: true,

            // ![foo](foo.jpg =100x80)     simple, assumes units are in px
            // ![bar](bar.jpg =100x*)      sets the height to "auto"
            // ![baz](baz.jpg =80%x5em)    Image with w of 80% and h of 5em
            parseImgDimensions: true,
            literalMidWordUnderscores: true,
            literalMidWordAsterisks: true,
            strikethrough: true,
            omitExtraWLInCodeBlocks: true,     // Robustness
            customizedHeaderId: true,          // Robustness
            ghCodeBlocks: true,                // Better block handling
            simplifiedAutoLink: true,
            simpleLineBreaks: false,           // Set to false to ensure <p> 
                                               // tags handle breaks correctly
            openLinksInNewWindow: true,
            splitAdjacentBlockquotes: true
        });

        this.data = {
            entries: { byName: {}, byDate: [], hanoz: [] },
            published: { entries: {} }
        };
    }

    compileTemplates(templateDir) {
        const templates = { layouts: {}, views: {} };

        ['layouts', 'partials', 'views'].forEach(type => {
            const fullPath = path.join(templateDir, type);
            if (!existsSync(fullPath)) return;

            readdirSync(fullPath).forEach(file => {
                const name = path.parse(file).name;
                const filePath = path.join(fullPath, file);
                const content = readFileSync(filePath, 'utf-8');

                if (type === 'partials') {
                    Handlebars.registerPartial(name, content);
                }
                else {
                    templates[type][name] = Handlebars.compile(content);
                }
            });
        });

        return templates;
    }

    /**
     * POST-PROCESSOR (The "Plugin" logic)
     * Cleans up the messy if/else logic into a single mutation point
     */
    postProcess(entry, entryUrl) {
        const slug = entry.slug; // <-- Added this to fix "slug is not defined"

        // 1. Handle Images/Videos in content
        entry.__content = this.makeImgVid(entry.__content, entryUrl);

        // 2. Handle Entry-Specific CSS/JS (like /Where/)
        if (entry.css && !Array.isArray(entry.css)) entry.css = [entry.css];
        if (entry.js && !Array.isArray(entry.js)) entry.js = [entry.js];

        // 3. Automated Flags
        if (entry.tags?.includes('map') || entry.gmap) entry.isMap = true;
        if (entry.__content.includes('<code')) entry.hasCode = true;

        // 4. Presentation Logic
        if (entry.tags?.includes('presentation')) {
            entry.template = entry.name === 'Biodiversity-Literature-Repository' 
                ? 'presentationPlazi' 
                : 'presentation';
            entry.layout = entry.template;
            entry.authors = entry.authors 
                ? `${settings.me} and ${entry.authors.join(', ')}` 
                : settings.me;
        } 
        else {
            entry.template = 'entry';
            entry.layout = 'main';
            entry.__content = this.makeImgVid(this.converter.makeHtml(entry.__content), entryUrl);
        }

        this.data.entries.byName[slug] = entry;
        return entry;
    }

    /**
     * MEDIA PROCESSING
     * Restored the URL prefixing logic to ensure images/videos resolve 
     * correctly from any context.
     */
    makeImgVid(html, entryUrl) {
        if (!html) return '';
        // Ensure entryUrl is a clean path like "/my-post"
        const prefix = entryUrl.startsWith('/') ? entryUrl : `/${entryUrl}`;
        const re = /<img\s+src="(?<path>img)\/(?<basename>[^"]+?)\.(?<ext>[^".]+)"(?<after>[^>]*)>/g;
        
        return html.replace(re, (match, p, basename, ext, after) => {
            const cleanExt = ext.toLowerCase();
            // Result: /my-post/img/image.jpg
            const mediaPath = `${prefix}/${p}/${basename}.${cleanExt}`;
            
            if (cleanExt === 'mp4') {
                const poster = `${prefix}/${p}/${basename}.jpg`;
                return `<video width="100%" controls poster="${poster}">
                    <source src="${mediaPath}" type="video/mp4">
                </video>`;
            }

            return `<img src="${mediaPath}" ${after}>`;
        });
    }

    makeAlbum(entry, url) {
        url = url ? `${url}/img` : 'img';
        
        entry.images = fs.readdirSync(`${entry.dir}/img`)
            .filter(img => {
                const imgExt = img.slice(-4)
                return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif'
            })
            .map(img => `${url}/${img}`);
    }

    async processFile(file, stat) {
        if (path.basename(file) !== 'index.md') return;

        // REMOVED .toLowerCase() - We preserve the case of the folder exactly
        const slug = path.dirname(file).split(path.sep).pop();
        const mtime = stat.mtime;
        let changed = true;

        if (this.mode === 'production' && this.data.published.entries[slug]) {

            // Note: published.json will store case-sensitive keys
            if (new Date(this.data.published.entries[slug]) >= mtime) {
                changed = false;
                this.data.entries.byName[slug] = { slug, mtime, changed };
                return;
            }
        }

        try {
            const raw = await fs.readFile(file, 'utf8');
            const meta = yamlFront.loadFront(raw);
            const content = meta.__content || '';

            // entryUrl now preserves case for both Dev and Prod
            const entryUrl = this.mode === 'development' 
                ? `/${slug}` 
                : `${settings.baseUrl}/${slug}`;

            const entry = {
                ...meta,
                slug,
                name: slug,
                mtime,
                changed,
                title: meta.title || slug,
                baseUrl: this.mode === 'development' ? '' : settings.baseUrl,
                tags: (Array.isArray(meta.tags) ? meta.tags : [])
                    .filter(t => t && typeof t === 'string')
                    .map(tag => ({ 
                        tag, 
                        tagUrl: tag.trim().replace(/\//g, '-').replace(/ /g, '-') 
                    }))
            };

            // Apply our clean "plugin" logic
            this.data.entries.byName[slug] = this.postProcess(entry, entryUrl);
        } 
        catch (err) {
            console.error(`⚠️ Skipping [${slug}] due to error:`, err.message);
        }
    }

    async build() {
        console.log(`Building Data... [Mode: ${this.mode}]`);
        try {
            if (existsSync(settings.publishedFile)) {
                const cache = await fs.readFile(settings.publishedFile, 'utf8');
                this.data.published = JSON.parse(cache);
            }
        } 
        catch (e) { 
            console.warn("Cache ignored."); 
        }

        await new Promise(res => {
            Walker(settings.dir.docs)
                .on('file', (f, s) => this.processFile(f, s))
                .on('end', res);
        });

        this.data.entries.byDate = Object.values(this.data.entries.byName)
            .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

        this.data.entries.byDate.forEach((e, i, arr) => {
            e.prev = arr[i + 1] ? { name: arr[i + 1].slug, title: arr[i + 1].title } : null;
            e.next = arr[i - 1] ? { name: arr[i - 1].slug, title: arr[i - 1].title } : null;
        });

        if (this.mode === 'production') await this.writeProductionFiles();
    }

    /**
     * PRODUCTION ONLY: Writes changed files and the default index.html
     */
    // async writeProductionFiles() {
    //     const jobs = [];
    //     let count = 0;

    //     // 1. Get entries sorted by date
    //     const entries = Object.values(this.data.entries.byName)
    //         .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

    //     const latestEntry = entries[0];

    //     // 2. Write individual changed entries
    //     for (const entry of entries) {
    //         // We only write if the .md changed, OR if it's the latest entry 
    //         // (to ensure the root index.html is always fresh)
    //         if (!entry.changed && entry !== latestEntry) continue;
    //         if (!entry.template) continue;

    //         const html = this.renderEntry(entry);
    //         const outPath = path.join(settings.dir.docs, entry.slug, 'index.html');
            
    //         // Liberal directory creation
    //         const dirPath = path.dirname(outPath);
    //         if (!existsSync(dirPath)) {
    //             await fs.mkdir(dirPath, { recursive: true });
    //         }

    //         jobs.push(fs.writeFile(outPath, html));
            
    //         // Update cache only for real files
    //         this.data.published.entries[entry.slug] = entry.mtime;
    //         count++;
    //     }

    //     // 3. Write the default index.html (root)
    //     if (latestEntry) {
    //         console.log(`Setting [${latestEntry.slug}] as the root index.html`);
            
    //         // Because latestEntry.__content was already processed by makeImgVid 
    //         // with its slug (e.g. /slug/img/...), it will work perfectly 
    //         // from the root directory. No need to move images.
    //         const rootHtml = this.renderEntry(latestEntry);
    //         jobs.push(fs.writeFile(path.join(settings.dir.docs, 'index.html'), rootHtml));
    //     }

    //     // 4. Update the published cache
    //     if (count > 0) {
    //         jobs.push(fs.writeFile(settings.publishedFile, JSON.stringify(this.data.published, null, 2)));
    //     }
        
    //     await Promise.all(jobs);
    //     console.log(`✅ Production build complete. Updated ${count} entries.`);
    // }

    async writeProductionFiles() {
        const entries = Object.values(this.data.entries.byName).filter(e => e.changed);
        for (const entry of entries) {
            const html = this.renderEntry(entry);
            const outPath = path.join(settings.dir.docs, entry.slug, 'index.html');
            await fs.writeFile(outPath, html);
            this.data.published.entries[entry.slug] = entry.mtime;
        }
        // Write latest as root index
        const latest = this.data.entries.byDate[0];
        if (latest) await fs.writeFile(path.join(settings.dir.docs, 'index.html'), this.renderEntry(latest));
        
        await fs.writeFile(settings.publishedFile, JSON.stringify(this.data.published, null, 2));
    }

    renderEntry(entry) {
        // Defensive check if entry is undefined
        if (!entry) {
            return `<html><body><h1>404 Not Found</h1><p>The requested entry does not exist or failed to build.</p></body></html>`;
        }
        try {
            const viewTmpl = this.templates.views[entry.template] || this.templates.views['entry'];
            const layoutTmpl = this.templates.layouts[entry.layout] || this.templates.layouts['main'];
            const viewHtml = viewTmpl(entry);
            return layoutTmpl({ ...entry, content: viewHtml });
        } 
        catch (e) {
            return `<html><body><h1>Render Error</h1><p>${entry.slug || 'Unknown'}: ${e.message}</p></body></html>`;
        }
    }

    serve() {
        this.build().then(() => {
            this.bs.init({
                server: { 
                    baseDir: settings.dir.docs,
                    routes: { "/_lib": "./docs/_lib" } 
                },
                middleware: [(req, res, next) => {
                    const url = req.url.split('?')[0];
                    const fullDiskPath = path.join(settings.dir.docs, url);

                    // 1. If it's a real file (img, css, js) on disk, 
                    // serve it directly 
                    const isFile = !statSync(fullDiskPath).isDirectory();

                    if (existsSync(fullDiskPath) && isFile) {
                        return next();
                    }

                    // 2. Handle Root
                    if (url === '/' || url === '/index.html') {
                        const entry = this.data.entries.byDate[0];
                        return res.end(this.renderEntry(entry));
                    }

                    // 3. Handle Slugs (preserve case)
                    const slug = url.split('/').filter(Boolean)[0];

                    if (slug && this.data.entries.byName[slug]) {
                        res.setHeader('Content-Type', 'text/html');
                        const entry = this.data.entries.byName[slug];
                        return res.end(this.renderEntry(entry));
                    }

                    next();
                }],
                port: 8080,
                notify: false,
                open: false,
                ghostMode: false
            });

            const watchTgt = [
                `${settings.dir.docs}/**/*.md`, 
                `${settings.dir.templates}/**/*`
            ];
            this.bs.watch(watchTgt).on('change', async (file) => {
                console.log(`🔄 Changed: ${path.basename(file)}`);
                this.templates = this.compileTemplates(settings.dir.templates);
                await this.build();
                this.bs.reload();
            });
        });
    }
}

const args = process.argv.slice(2);

// 1. Determine the mode (defaulting to development)
let mode = 'development';

// Check if production is explicitly mentioned (e.g., 'production', '--production', or '-p')
const hasProductionFlag = args.some(arg => 
    arg.toLowerCase().includes('production') || arg === '-p'
);

if (hasProductionFlag) {
    mode = 'production';
}

// 2. Instantiate and run
const generator = new SiteGenerator(mode);

if (mode === 'development') {
    generator.serve();
} else {
    generator.build();
}