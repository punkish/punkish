// node generator.js
// 👉 Development mode (starts server & watches files)
// node generator.js development (or --development)
// 👉 Development mode (starts server & watches files)
// node generator.js production (or --production / -p)
// 👉 Production mode (runs a single build and writes static files to disk)

import { promises as fs, readdirSync, readFileSync, existsSync, lstatSync } from 'fs';
import path from 'path';
import Walker from 'walker';
import yamlFront from 'yaml-front-matter';
import showdown from 'showdown';
import moment from 'moment';
import MiniSearch from 'minisearch';
import lunr from 'lunr';
import browserSync from 'browser-sync';
import Handlebars from 'handlebars';
import { footnotes } from './lib/showdown-footnotes.js';
import { makeAlbum } from './lib/index.js';

// Same settings module that go.js uses, so the search index is built with
// exactly the same minisearchOpts (incl. stop words) the browser uses to query.
import { 
    dir, 
    dateOptions, 
    baseUrl, 
    minisearchOpts, 
    untaggedLabel,
    publishedFile,
    me
} from './lib/settings.js';

const settings = { 
    dir, 
    dateOptions, 
    baseUrl, 
    minisearchOpts, 
    untaggedLabel, 
    publishedFile, 
    me 
};

// ---------------------------------------------------------------------------
// small pure helpers
// ---------------------------------------------------------------------------

const tagUrl = tag => tag.trim().replace(/\//g, '-').replace(/ /g, '-');

// newest first; unparseable dates compare as equal instead of poisoning the sort
const byDateDesc = (a, b) => (new Date(b.date) - new Date(a.date)) || 0;

const monthIndex = month => new Date(`${month} 1, 2000`).getMonth();

class SiteGenerator {
    constructor(mode = 'development') {
        this.mode = mode;

        // in development everything is served from the root
        this.baseUrl = mode === 'development' ? '' : settings.baseUrl;

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

            // Robustness
            omitExtraWLInCodeBlocks: true,     
            customizedHeaderId: true,

            // Better block handling
            ghCodeBlocks: true,
            simplifiedAutoLink: true,

            // Set to false to ensure <p>
            // tags handle breaks correctly
            simpleLineBreaks: false,
                                               
            openLinksInNewWindow: true,
            splitAdjacentBlockquotes: true
        });

        this.data = this.newData();

        // Everything that is not a single blog entry (tag pages, date page,
        // search index, Hanoz, root index) as a Map of "/url/path" -> content.
        // Production writes it to disk, development serves it from memory.
        this.pages = new Map();

        // builds are serialized so quick successive saves can't overlap
        this.queue = Promise.resolve();
    }

    newData() {
        return {
            entries: { 
                byName: {}, 
                byDate: [], 
                byTag: {}, 
                byYear: [], 
                hanoz: [] 
            },
            idx: {},
            published: { datePublished: new Date(), entries: {} }
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
     * MEDIA PROCESSING
     * Prefixes img/ references so images/videos resolve from any context.
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

    // -----------------------------------------------------------------------
    // PER-ENTRY PROCESSING
    // -----------------------------------------------------------------------

    makeDates(entry) {
        const fakedate = new Date('1980-01-01 00:00:00')
            .toLocaleDateString('en-US', settings.dateOptions);

        entry.modified = entry.modified 
            ? new Date(entry.modified).toLocaleDateString('en-US', settings.dateOptions) 
            : fakedate;

        entry.created = entry.created  
            ? new Date(entry.created).toLocaleDateString('en-US', settings.dateOptions) 
            : fakedate;
    }

    addEntryByTags(entry, eIdx, data) {
        const byTag = data.entries.byTag;
        const tags = entry.origTags.length 
            ? entry.origTags 
            : [ settings.untaggedLabel ];

        tags.forEach(t => {
            if (byTag[t]) {
                byTag[t].push(eIdx);
            }
            else {
                byTag[t] = [ eIdx ];
            }
        });
    }

    addEntryByDate(entry, eIdx, data) {
        data.entries.byDate.push(eIdx);

        const date = new Date(entry.created);
        const entryYear = date.getFullYear() || '9999';
        const entryMonth = date.toLocaleDateString('en-US', { month: 'long' }) || 'January';

        const byYear = data.entries.byYear;
        const year = byYear.find(x => x.year === entryYear);

        if (year) {
            const month = year.months.find(x => x.month === entryMonth);

            if (month) {
                month.entries.push(eIdx);
            }
            else {
                year.months.push({ month: entryMonth, entries: [ eIdx ] });
            }
        }
        else {
            byYear.push({
                year: entryYear,
                months: [{ month: entryMonth, entries: [ eIdx ] }]
            });
        }
    }

    async processFile(file, stat, data) {
        if (path.basename(file) !== 'index.md') return;

        // The case of the folder name is preserved exactly
        const slug = path.dirname(file).split(path.sep).pop();
        const mtime = new Date(stat.mtime);

        // Every entry is always parsed (the tag pages, date page and search
        // index need *all* of them). `changed` only decides whether the 
        // entry's own html file gets rewritten.
        let changed = true;

        if (this.mode === 'production') {
            const lastPublished = data.published.entries[slug];
            changed = !lastPublished || mtime > new Date(lastPublished);
        }

        try {
            const raw = await fs.readFile(file, 'utf8');
            const meta = yamlFront.loadFront(raw);

            const origTags = (Array.isArray(meta.tags) ? meta.tags : [])
                .filter(t => t && typeof t === 'string');

            const entry = {
                ...meta,
                baseUrl: this.baseUrl,
                file,
                dir: path.dirname(file),
                name: slug,
                slug,
                url: slug,
                dateGenerated: new Date(),
                dateModified: mtime,
                mtime,
                changed,
                title: meta.title || slug,
                minisearchOpts: settings.minisearchOpts,
                origTags,
                tags: origTags.map(tag => ({ tag, tagUrl: tagUrl(tag) }))
            };

            this.makeDates(entry);

            entry.hasCode = origTags.includes('code');
            if (origTags.includes('map') || entry.gmap) entry.isMap = true;

            // Entry-specific CSS/JS (like /Where/)
            if (entry.css && !Array.isArray(entry.css)) entry.css = [entry.css];
            if (entry.js && !Array.isArray(entry.js)) entry.js = [entry.js];

            if (Array.isArray(entry.type)) {
                entry.type.forEach(t => entry[t] = true);
            }

            if (origTags.includes('presentation')) {
                entry.layout = meta.layout || 'main';
                entry.template = meta.template || 'entry-presentation';

                let authors = settings.me;

                if (entry.name === 'Biodiversity-Literature-Repository') {
                    authors = `${authors} (Plazi)`;
                }

                if (entry.authors) {
                    const others = [].concat(entry.authors);
                    const len = others.length;

                    entry.authors = len > 1
                        ? [ authors, ...others.slice(0, -1), `and ${others[len - 1]}` ].join(', ')
                        : `${authors} and ${others[0]}`;
                }
                else {
                    entry.authors = authors;
                }

                // __content is left as markdown for a presentation 
                // because that conversion is done by remarkjs
                entry.isPresentation = true;
            }
            else if (origTags.includes('album')) {
                entry.layout = meta.layout || 'main';
                entry.template = meta.template || 'entry';
                entry.isAlbum = true;
                makeAlbum(entry, entry.url);
            }
            else {
                entry.layout = meta.layout || 'main';
                entry.template = meta.template || 'entry';

                // raw markdown is what gets indexed for search
                entry.text = entry.__content;

                // Media paths are root-relative, same as go.js
                entry.__content = this.makeImgVid(
                    this.converter.makeHtml(entry.__content || ''), 
                    `/${slug}`
                );

                if (entry.__content.includes('<code')) entry.hasCode = true;
            }

            data.entries.byName[slug] = entry;

            const eIdx = {
                name: entry.name,
                title: entry.title,
                date: entry.modified,
                notes: entry.notes
            };

            this.addEntryByTags(entry, eIdx, data);
            this.addEntryByDate(entry, eIdx, data);
        } 
        catch (err) {
            console.error(`⚠️ Skipping [${slug}] due to error:`, err.message);
        }
    }

    // -----------------------------------------------------------------------
    // INDEXES (run after every entry has been parsed)
    // -----------------------------------------------------------------------

    prevNext(data) {
        console.log('populating prev-next');

        const byDate = data.entries.byDate;
        const j = byDate.length;

        byDate.forEach((e, i) => {
            const p = byDate[i > 0 ? i - 1 : 0];
            const n = byDate[i + 1 < j ? i + 1 : i];

            data.entries.byName[e.name].prev = { name: p.name, title: p.title };
            data.entries.byName[e.name].next = { name: n.name, title: n.title };
        });
    }

    buildHanozIndex(data) {
        const hanozDir = settings.dir.hanozDir;
        if (!hanozDir || !existsSync(hanozDir)) return;

        console.log('building hanoz index');

        const files = readdirSync(hanozDir).filter(file => {
            // remove entries that start with "."
            return file.substring(0, 1) !== '.' 
                && lstatSync(path.join(hanozDir, file)).isFile();
        });

        for (const file of files) {
            const metadata = yamlFront.loadFront(
                readFileSync(path.join(hanozDir, file), 'utf8')
            );

            const page = { gifn: metadata['gifn'] };

            if (metadata['side'] === 'left') {
                page.l_opaque = '.lcol.opaque';
                page.r_opaque = '.rcol';
                page.l_text = metadata['__content'];
                page.r_text = '';
            }
            else {
                page.l_opaque = '.lcol';
                page.r_opaque = '.rcol.opaque';
                page.l_text = '';
                page.r_text = metadata['__content'];
            }

            data.entries.hanoz.push(page);
        }
    }

    buildSearchIndex(type, data) {
        const docs = [];
        let id = 0;

        for (const e in data.entries.byName) {
            const entry = data.entries.byName[e];
            const doc = {
                title: entry.title,
                text: entry.text,
                name: entry.name
            };
            
            if (type === 'mini') doc.id = id++;
            docs.push(doc);
        }

        if (type === 'lunr') {
            console.log('building _lunr_ search index');

            data.idx = lunr(function () {
                this.field('title', { boost: 10 }),
                this.field('text'), { boost: 20 },
                this.ref('name'),
        
                docs.forEach(doc => { this.add(doc) }, this)
            });
        }
        else if (type === 'mini') {
            console.log('building _mini_ search index');

            const miniSearch = new MiniSearch(settings.minisearchOpts);
            miniSearch.addAll(docs);
            data.idx = miniSearch;
        }
    }

    finish(data) {
        const { byDate, byYear } = data.entries;

        byDate.sort(byDateDesc);
        byYear.sort((a, b) => b.year - a.year);
        byYear.forEach(y => y.months.sort((a, b) => monthIndex(b.month) - monthIndex(a.month)));

        this.prevNext(data);
        this.buildHanozIndex(data);
        this.buildSearchIndex('mini', data);
    }

    // -----------------------------------------------------------------------
    // RENDERING
    // -----------------------------------------------------------------------

    // Renders an entry's own page, or (kind === 'presentation') its /p/ page.
    // Throws on missing templates / template errors.
    render(entry, kind = 'entry') {
        const { views, layouts } = this.templates;
        let view, layout;

        if (kind === 'presentation') {
            const tmpl = entry.name === 'Biodiversity-Literature-Repository' 
                ? 'presentationPlazi' 
                : 'presentation';

            view = views[tmpl];
            layout = layouts[tmpl];

            if (!view || !layout) {
                throw new Error(`missing "${tmpl}" view or layout`);
            }
        }
        else {
            view = views[entry.template] || views['entry'];
            layout = layouts[entry.layout] || layouts['main'];
        }

        return layout({ ...entry, content: view(entry) });
    }

    // For the dev server: never throw, show the error in the browser instead
    renderForBrowser(entry, kind) {
        try {
            return this.render(entry, kind);
        } 
        catch (e) {
            return `<html><body><h1>Render Error</h1><p>${entry.slug || 'Unknown'}: ${e.message}</p></body></html>`;
        }
    }

    // The site root is the most recent entry, rendered with no content and 
    // isIndex = true (skipping cv-latest)
    renderDefault(data) {
        const byDate = data.entries.byDate;
        if (!byDate.length) return null;

        const pick = byDate[0].name === 'cv-latest' && byDate[1] 
            ? byDate[1] 
            : byDate[0];

        const entry = data.entries.byName[pick.name];
        const layout = this.templates.layouts[entry.layout] 
            || this.templates.layouts['main'];

        return layout({ ...entry, content: '', isIndex: true });
    }

    renderByDate(data) {
        const content = this.templates.views['entries-by-date']({
            created: moment().format('MMM DD, YYYY'),
            entries: data.entries.byYear,
            baseUrl: this.baseUrl
        });

        return this.templates.layouts.main({
            content,
            baseUrl: this.baseUrl,
            minisearchOpts: settings.minisearchOpts
        });
    }

    // returns Map of "/_tags/…" -> html (index page + one page per tag)
    renderByTags(data) {
        const out = new Map();
        const created = moment().format('MMM DD, YYYY');
        const { views, layouts } = this.templates;
        const layoutOpts = { 
            baseUrl: this.baseUrl, 
            minisearchOpts: settings.minisearchOpts 
        };

        out.set('/_tags/index.html', layouts.main({
            ...layoutOpts,
            content: views['entries-by-tags']({
                created,
                baseUrl: this.baseUrl,
                entries: data.entries.byTag
            })
        }));

        for (const tag in data.entries.byTag) {
            const file = tag.replace(/\//g, '-').replace(/ /g, '-');

            out.set(`/_tags/${file}.html`, layouts.main({
                ...layoutOpts,
                content: views['entries-by-tag']({
                    created,
                    baseUrl: this.baseUrl,
                    entries: data.entries.byTag[tag],
                    tag
                })
            }));
        }

        return out;
    }

    renderHanoz(data) {
        const { views, layouts } = this.templates;
        const content = views.hanoz({ pages: data.entries.hanoz });
        return layouts.hanoz({ content });
    }

    buildPages(data) {
        const pages = new Map();

        const attempt = (label, fn) => {
            try {
                fn();
            }
            catch (e) {
                console.error(`⚠️ Could not build ${label}: ${e.message}`);
            }
        };

        attempt('by-date page', () => {
            console.log('building by dates');
            pages.set('/_dates/index.html', this.renderByDate(data));
        });

        attempt('by-tag pages', () => {
            console.log('building by tags');
            this.renderByTags(data).forEach((html, p) => pages.set(p, html));
        });

        attempt('search index', () => {
            pages.set('/_search/searchIdx.json', JSON.stringify(data.idx));
        });

        if (settings.dir.hanozDir && existsSync(settings.dir.hanozDir)) {
            attempt('Hanoz', () => {
                pages.set('/Hanoz/p/index.html', this.renderHanoz(data));
            });
        }

        attempt('root index', () => {
            const html = this.renderDefault(data);
            if (html) pages.set('/index.html', html);
        });

        return pages;
    }

    // -----------------------------------------------------------------------
    // BUILD
    // -----------------------------------------------------------------------

    async build() {
        console.log(`Building Data... [Mode: ${this.mode}]`);

        // Build into a fresh data object so deleted entries disappear, and
        // so the dev server keeps serving the old data until the new is ready
        const data = this.newData();

        try {
            if (existsSync(settings.publishedFile)) {
                const cache = await fs.readFile(settings.publishedFile, 'utf8');
                data.published = JSON.parse(cache);
            }
        } 
        catch (e) { 
            console.warn('Cache ignored.'); 
        }

        // processFile is async, so we have to wait for every call to settle
        // after the walker is done, otherwise entries could be missing
        const jobs = [];

        await new Promise(resolve => {
            Walker(settings.dir.docs)
                .on('file', (f, s) => jobs.push(this.processFile(f, s, data)))
                .on('error', (er, entry) => console.log(`${er} on entry ${entry}`))
                .on('end', resolve);
        });

        await Promise.all(jobs);
        console.log(`${Object.keys(data.entries.byName).length} entries processed`);

        this.finish(data);
        const pages = this.buildPages(data);

        this.data = data;
        this.pages = pages;

        if (this.mode === 'production') await this.writeProductionFiles(data, pages);
    }

    async writeOut(relPath, content) {
        const full = path.join(settings.dir.docs, relPath);
        await fs.mkdir(path.dirname(full), { recursive: true });
        await fs.writeFile(full, content);
    }

    async writeProductionFiles(data, pages) {
        let count = 0;
        let unchanged = 0;

        // 1. Individual entries (only the new or modified ones)
        for (const entry of Object.values(data.entries.byName)) {
            if (!entry.changed) {
                unchanged++;
                continue;
            }

            try {
                await this.writeOut(`${entry.slug}/index.html`, this.render(entry));

                if (entry.isPresentation) {
                    await this.writeOut(
                        `${entry.slug}/p/index.html`, 
                        this.render(entry, 'presentation')
                    );
                }

                data.published.entries[entry.slug] = entry.mtime;
                count++;
            }
            catch (e) {
                // not marked as published, so it will be retried next time
                console.error(`⚠️ Could not write [${entry.slug}]: ${e.message}`);
            }
        }

        console.log(`wrote ${count} files`);
        console.log(`${unchanged} files were unchanged`);

        // 2. Everything else: tags, dates, search index, Hanoz, root index
        for (const [relPath, content] of pages) {
            console.log(`writing ${relPath}`);
            await this.writeOut(relPath, content);
        }

        // 3. Save published cache
        data.published.datePublished = new Date();
        await fs.writeFile(
            settings.publishedFile, 
            JSON.stringify(data.published, null, 2)
        );
    }

    // -----------------------------------------------------------------------
    // DEV SERVER
    // -----------------------------------------------------------------------

    rebuild() {
        this.queue = this.queue
            .then(() => this.build())
            .catch(e => console.error('⚠️ Build failed:', e));

        return this.queue;
    }

    route(req, res, next) {
        let url;

        try {
            url = decodeURIComponent(req.url.split('?')[0]);
        }
        catch (e) {
            return next();
        }

        // 1. Generated pages (root, tags, dates, search index, Hanoz).
        // Served from memory so they're never stale, even if an old copy 
        // from a production build is sitting in docs/
        const key = [ 
            url, 
            url.endsWith('/') ? `${url}index.html` : `${url}/index.html` 
        ].find(k => this.pages.has(k));

        if (key) {
            res.setHeader(
                'Content-Type', 
                key.endsWith('.json') 
                    ? 'application/json; charset=utf-8' 
                    : 'text/html; charset=utf-8'
            );
            return res.end(this.pages.get(key));
        }

        // 2. Entries (case-sensitive) and their presentations
        const parts = url.split('/').filter(Boolean);
        if (parts[parts.length - 1] === 'index.html') parts.pop();

        const byName = this.data.entries.byName;

        if (parts.length && Object.hasOwn(byName, parts[0])) {
            const entry = byName[parts[0]];
            res.setHeader('Content-Type', 'text/html; charset=utf-8');

            if (parts.length === 1) {
                return res.end(this.renderForBrowser(entry));
            }

            if (parts.length === 2 && parts[1] === 'p' && entry.isPresentation) {
                return res.end(this.renderForBrowser(entry, 'presentation'));
            }
        }

        // 3. Anything else (img, css, js…) is a real file on disk
        next();
    }

    serve() {
        this.rebuild().then(() => {
            this.bs.init({
                server: { 
                    baseDir: settings.dir.docs,
                    routes: { '/_lib': './docs/_lib' } 
                },
                middleware: [ (req, res, next) => this.route(req, res, next) ],
                port: 8080,
                notify: false,
                open: false,
                ghostMode: false
            });

            const watchTgt = [
                `${settings.dir.docs}/**/*.md`, 
                `${settings.dir.templates}/**/*`
            ];

            this.bs.watch(watchTgt, { ignoreInitial: true })
                .on('all', async (event, file) => {
                    if (!['add', 'change', 'unlink'].includes(event)) return;

                    console.log(`🔄 ${event}: ${path.basename(file)}`);

                    try {
                        this.templates = this.compileTemplates(settings.dir.templates);
                    }
                    catch (e) {
                        console.error('⚠️ Template error:', e.message);
                    }

                    await this.rebuild();
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
} 
else {
    generator.build().catch(e => {
        console.error('⚠️ Build failed:', e);
        process.exitCode = 1;
    });
}