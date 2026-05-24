import { prevNext, go, buildSearchIndex, finish } from "./go.js";
import { dir, minisearchOpts } from './lib/settings.js';
import { compileTemplates } from './lib/index.js';
import { parseArgs } from "util";

async function init() {
    const templates = compileTemplates(dir.templates);
    
    const data = await go(dir.docs);
    prevNext(data);
    buildSearchIndex('mini', data);
    return { templates, data };
}

function writeByName(entry, templates) {
    try {
        entry.content = templates.views[entry.template](entry);
    }
    catch(e) {
        console.log(entry);
    }

    entry.minisearchOpts = minisearchOpts;
    
    let tmpl = entry.layout;

    if (entry.isPresentation) {
        tmpl = entry.name === 'Biodiversity-Literature-Repository'
            ? 'presentationPlazi'
            : 'presentation';
        
        entry.content = templates.views[tmpl](entry);
    }

    return templates.layouts[tmpl](entry);
}

async function serve() {
    const { templates, data } = await init();
    const responseHeaders = {
        headers: { "Content-Type": "text/html" }
    };

    const server = Bun.serve({

        // `routes` requires Bun v1.2.3+
        routes: {

            // Serve a file by lazily loading it into memory
            "/favicon.ico": Bun.file("./_lib/img/favicon.ico"),

            // Static routes
            "/_lib/*": req => {
                const filePath = new URL(req.url).pathname;
                const file = Bun.file(`./${filePath}`);
                return new Response(file);
            },

            // Dynamic routes
            "/:entry": req => {
                const entry = data.entries.byName[req.params.entry.toLowerCase()];
                const html = writeByName(entry, templates);
                return new Response(html, responseHeaders);
            },

            "/:entry/img/:image": req => {
                const entry = req.params.entry;
                const file = Bun.file(`./docs/${entry}/img/${req.params.image}`);
                return new Response(file);
            },

            "/": () => {
                const byDate = data.entries.byDate;
                const last = byDate.length - 1;
                const entryName = byDate[last].name === 'cv-latest' 
                    ? byDate[last - 1].name 
                    : byDate[last].name;

                const entry = data.entries.byName[ entryName.toLowerCase() ];
                const html = writeByName(entry, templates);
                return new Response(html, responseHeaders);
            },
            
        },

        // (optional) fallback for unmatched routes:
        // Required if Bun's version < 1.2.3
        fetch(req) {
            return new Response("Not Found", { status: 404 });
        },
    });

    console.log(`server running at ${server.url}`);
}

async function build() {
    const { templates, data } = await init();
    finish(data);
    fs.writeFileSync(publishedFile, JSON.stringify(data.published));
}

const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        build: {
            type: "boolean",
        },
        serve: {
            type: "boolean",
        },
    },
    strict: true,
    allowPositionals: true,
});

if (values.serve) {
    serve();
}
else if (values.build) {
    build();
}