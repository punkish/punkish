import { promises as fs, readdirSync, readFileSync, existsSync, statSync } from 'fs';
//import { copyFile } from 'fs/promises';
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
    publishedFile: './published.json',
    me: 'Puneet Kishor',
};

class SiteGenerator {
    constructor(mode = 'production') {
        this.mode = mode;
        this.templates = this.compileTemplates(settings.dir.templates);
        this.bs = browserSync.create();
        this.converter = new showdown.Converter({
            extensions: [ footnotes ], 
            tables: true,

            // ![foo](foo.jpg =100x80)     simple, assumes units are in px
            // ![bar](bar.jpg =100x*)      sets the height to "auto"
            // ![baz](baz.jpg =80%x5em)    Image with width of 80% and height of 5em
            parseImgDimensions: true,
            literalMidWordUnderscores: true,
            literalMidWordAsterisks: true,
            strikethrough: true,
            omitExtraWLInCodeBlocks: true,     // Robustness
            customizedHeaderId: true,          // Robustness
            ghCodeBlocks: true,                // Better block handling
            simplifiedAutoLink: true,
            simpleLineBreaks: false,           // Set to false to ensure <p> tags handle breaks correctly
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
                const content = readFileSync(path.join(fullPath, file), 'utf-8');

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
     * MEDIA PROCESSING
     * Restored the URL prefixing logic to ensure images/videos resolve 
     * correctly from any context.
     */
    makeImgVid(html, entryUrl) {
        if (!html) return '';
        // entryUrl is like "/jammin-at-the-b-flat"
        const re = /<img\s+src="(?<path>img)\/(?<basename>[^"]+?)\.(?<ext>[^".]+)"(?<after>[^>]*)>/g;
        
        return html.replace(re, (match, p, basename, ext, after) => {
            // Result: /jammin-at-the-b-flat/img/photo.jpg
            // This works whether the page is at / or /jammin-at-the-b-flat/
            const mediaPath = `${entryUrl}/${p}/${basename}.${ext.toLowerCase()}`;
            
            if (ext.toLowerCase() === 'mp4') {
                return `<video width="100%" controls poster="${entryUrl}/${p}/${basename}.jpg">
                    <source src="${mediaPath}" type="video/mp4">
                </video>`;
            }
            return `<img src="${mediaPath}" ${after}>`;
        });
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

    async processFile(file, stat) {
        if (path.basename(file) !== 'index.md') return;

        const slug = path.dirname(file).split(path.sep).pop().toLowerCase();
        const mtime = stat.mtime;

        let changed = true;

        if (this.mode === 'production' && this.data.published.entries[slug]) {

            if (new Date(this.data.published.entries[slug]) >= mtime) {
                changed = false;
            }

        }

        try {
            const raw = await fs.readFile(file, 'utf-8');
            const meta = yamlFront.loadFront(raw);
            const content = meta.__content || '';

            // In Dev, the path should be root-relative: /slug
            // In Prod, it respects the settings.baseUrl
            const entryUrl = this.mode === 'development' ? `/${slug}` : `${settings.baseUrl}/${slug}`;

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

            if (meta.tags?.includes('presentation')) {
                entry.template = entry.name === 'Biodiversity-Literature-Repository' ? 'presentationPlazi' : 'presentation';
                entry.layout = entry.template;
                entry.authors = entry.authors ? `${settings.me} and ${entry.authors.join(', ')}` : settings.me;
            } 
            else {
                entry.template = 'entry';
                entry.layout = 'main';
                entry.__content = this.makeImgVid(this.converter.makeHtml(content), entryUrl);
                // entry.__content = this.converter.makeHtml(content);
                // entry.__content = this.makeImgVid(entry.__content, `/${entry.name}`);
            }

            this.data.entries.byName[slug] = entry;
        } 
        catch (err) {
            console.error(`⚠️ Skipping [${slug}] due to error:`, err.message);
        }
    }

        /**
     * PRODUCTION ONLY: Writes changed files and the default index.html
     */
    async writeProductionFiles() {
        const jobs = [];
        let count = 0;

        // 1. Sort entries to find the latest one
        const entries = Object.values(this.data.entries.byName)
            .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

        const latestEntry = entries[0];

        // 2. Write individual changed entries
        for (const entry of entries) {
            if (!entry.changed || !entry.template) continue;

            const html = this.renderEntry(entry);
            const outPath = path.join(settings.dir.docs, entry.slug, 'index.html');
            
            // Ensure the directory exists (liberal check)
            if (!existsSync(path.dirname(outPath))) {
                await fs.mkdir(path.dirname(outPath), { recursive: true });
            }

            jobs.push(fs.writeFile(outPath, html));
            this.data.published.entries[entry.slug] = entry.mtime;
            count++;
        }

        // 3. THE MISSING PIECE: Write the default index.html (root)
        if (latestEntry) {
            console.log(`Setting ${latestEntry.slug} as the default index.html`);
            const defaultHtml = this.renderEntry(latestEntry);
            jobs.push(fs.writeFile(path.join(settings.dir.docs, 'index.html'), defaultHtml));
        }

        // 4. Update the published cache
        if (count > 0 || latestEntry) {
            jobs.push(fs.writeFile(settings.publishedFile, JSON.stringify(this.data.published, null, 2)));
            await Promise.all(jobs);
        }
        
        console.log(`✅ Done. Updated ${count} files + root index.html.`);
    }

    renderEntry(entry) {
        try {
            const viewTmpl = this.templates.views[entry.template] || this.templates.views['entry'];
            const layoutTmpl = this.templates.layouts[entry.layout] || this.templates.layouts['main'];
            const viewHtml = viewTmpl(entry);
            return layoutTmpl({ ...entry, content: viewHtml });
        } 
        catch (e) {
            return `<html><body><h1>Render Error</h1><p>${entry.slug}: ${e.message}</p></body></html>`;
        }
    }

    serve() {
        this.mode = 'development';
        this.build().then(() => {
            this.bs.init({
                server: {
                    baseDir: settings.dir.docs, // This allows BS to serve images/css from disk
                    routes: { "/_lib": "./docs/_lib" }
                },
                middleware: [(req, res, next) => {
                    const url = req.url.split('?')[0];
                    const parts = url.split('/').filter(Boolean);
                    
                    // 1. Skip middleware for files that actually exist on disk (images, css, js)
                    // This is the most important part!
                    const localPath = path.join(settings.dir.docs, url);
                    if (existsSync(localPath) && !statSync(localPath).isDirectory()) {
                        return next(); 
                    }

                    // 2. Route: Home
                    if (url === '/' || url === '/index.html') {
                        const latest = this.data.entries.byDate[0];
                        return latest ? res.end(this.renderEntry(latest)) : next();
                    }

                    // 3. Route: Dynamic Entry HTML
                    const slug = parts[0]?.toLowerCase();
                    if (slug && this.data.entries.byName[slug]) {
                        res.setHeader('Content-Type', 'text/html');
                        return res.end(this.renderEntry(this.data.entries.byName[slug]));
                    }
                    
                    next();
                }],
                port: 3000,
                notify: false,
                open: false,
                ghostMode: false
            });

            this.bs.watch([`${settings.dir.docs}/**/*.md`, `${settings.dir.templates}/**/*`]).on('change', async (file) => {
                console.log(`🔄 Changed: ${path.basename(file)}`);
                this.templates = this.compileTemplates(settings.dir.templates);
                await this.build();
                this.bs.reload();
            });
        });
    }
}

const args = process.argv.slice(2);
const generator = new SiteGenerator(args.includes('--serve') ? 'development' : 'production');

if (args.includes('--serve')) {
    generator.serve();
}
else {
    generator.build();
}