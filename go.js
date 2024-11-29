'use strict';

import Walker from 'walker';
import path from 'path';
import fs from 'fs';
import yamlFront from 'yaml-front-matter';
import showdown from 'showdown';
import moment from 'moment';
import MiniSearch from 'minisearch';
import lunr from 'lunr';

import { footnotes } from './lib/showdown-footnotes.js';

import { 
    dir,
    dateOptions,
    baseUrl,
    minisearchOpts,
    untaggedLabel
} from './lib/settings.js';

import { 
    templates,
    makeVid,
    makeImg,
    makeAlbum
} from './lib/index.js';

const sh = new showdown.Converter({
    extensions: [ footnotes ], 
    tables: true,

    // ![foo](foo.jpg =100x80)     simple, assumes units are in px
    // ![bar](bar.jpg =100x*)      sets the height to "auto"
    // ![baz](baz.jpg =80%x5em)    Image with width of 80% and height of 5em
    parseImgDimensions: true,
    literalMidWordUnderscores: true,
    literalMidWordAsterisks: true,
    strikethrough: true
})


let me = 'Puneet Kishor';

const prevNext = function(data) {
    console.log('populating prev-next')

    const byDate = data.entries.byDate;
    const j = byDate.length;

    for (let name in data.entries.byName) {
    
        let prev;
        let next;

        for (let i = 0; i < j; i++) {
            if (name.toLowerCase() === byDate[i].name.toLowerCase()) {

                const x = i > 0 ? i - 1 : 0;

                prev = {
                    name: byDate[x].name, 
                    title: byDate[x].title
                }
                
                const y = i + 1 < j ? i + 1 : i;

                next = {
                    name: byDate[y].name, 
                    title: byDate[y].title
                }
                
                break;
            }
        }

        data.entries.byName[name].prev = prev
        data.entries.byName[name].next = next
    }   
}

const addEntryByTags = function(entry, eIdx, data) {

    if (entry.origTags) {
        entry.origTags.forEach(t => {
            if (data.entries.byTag[t]) {
                data.entries.byTag[t].push(eIdx)
            }
            else {
                data.entries.byTag[t] = [ eIdx ]
            }
        })
    }
    else {
        if (data.entries.byTag[ untaggedLabel ]) {
            data.entries.byTag[ untaggedLabel ].push(eIdx)
        }
        else {
            data.entries.byTag[ untaggedLabel ] = [ eIdx ]
        }    
    }

}

const addEntryByDate = function(entry, eIdx, data) {
    data.entries.byDate.push(eIdx);

    const date = new Date(entry.created);
    const entryYear = date.getFullYear() || '9999';
    const entryMonth = date.toLocaleDateString('en-US', {month: 'long'}) || 'January';

    const byYear = data.entries.byYear;
    const indexOfYear = byYear.map(x => { return x.year }).indexOf(entryYear);

    if (indexOfYear > -1) {
        const indexOfMonth = byYear[indexOfYear]
            .months.map(x => { return x.month }).indexOf(entryMonth);

        if (indexOfMonth > -1) {
            if (byYear[indexOfYear].months[indexOfMonth].entries.length) {
                byYear[indexOfYear].months[indexOfMonth].entries.push(eIdx)
            }
            else {
                byYear[indexOfYear].months[indexOfMonth].entries = [ eIdx ]
            }
        }
        else {
            byYear[indexOfYear].months.push({
                month: entryMonth,
                entries: [ eIdx ]
            })
        }
    }
    else {
        byYear.push({
            year: entryYear,
            months: [{
                month: entryMonth,
                entries: [ eIdx ]
            }]
        })
    }
}

const sortFunc = function(field) {
    return function(a, b) {
        return field === 'date' 
            ? new Date(b[field]) - new Date(a[field]) 
            : b[field] - a[field]
    }
}

const buildHanozIndex = function(data) {
    console.log('building hanoz index')

    const files = fs.readdirSync(dir.hanozDir)
        .filter(function(file, index) {
            const path_to_file = path.join(dir.hanozDir, file)

            // remove entries that start with "."
            if (file.substring(0, 1) !== ".") {
                return fs.lstatSync(path_to_file).isFile()
            }
        })
    
    let i = 0;
    let j = files.length;

    for (; i < j; i++) {
        const filename = dir.hanozDir + '/' + files[i];
        const fileContents = fs.readFileSync(filename, 'utf8');
        const metadata = yamlFront.loadFront(fileContents);

        let page = {}

        if (metadata) {
            page.gifn = metadata["gifn"]
            if (metadata["side"] === "left") {
                page.l_opaque = ".lcol.opaque"
                page.r_opaque = ".rcol"
                page.l_text = metadata["__content"]
                page.r_text = ""
            }
            else {
                page.l_opaque = ".lcol"
                page.r_opaque = ".rcol.opaque"
                page.l_text = ""
                page.r_text = metadata["__content"]
            }
        }

        data.entries.hanoz.push(page)
    }
}

const writeHanoz = function(data) {
    const content = templates.views.hanoz({ pages: data.entries.hanoz });
    const html = templates.layouts.hanoz({ content });
    fs.writeFileSync(`${dir.docs}/Hanoz/p/index.html`, html);
}

const buildSearchIndex = function(type, data) {
    const docs = [];
    let id = 0;

    for (let e in data.entries.byName) {
        const entry = data.entries.byName[e]
        const doc = {
            title: entry.title,
            text: entry.__content,
            name: entry.name
        }
        
        if (type === 'mini') doc.id = id++;
        docs.push(doc);
    }

    if (type === 'lunr') {
        console.log(`building _lunr_ search index`);

        data.idx = lunr(function () {
            this.field('title', { boost: 10 }),
            this.field('text'), { boost: 20 },
            this.ref('name'),
    
            docs.forEach(doc => { this.add(doc) }, this)
        })
    } 
    else if (type === 'mini') {
        console.log(`building _mini_ search index`)

        const miniSearch = new MiniSearch(minisearchOpts)

        miniSearch.addAll(docs)
        data.idx = miniSearch
    }

}

const writeSearchIdx = function(data) {
    console.log('writing search index');
    fs.writeFileSync(
        `${dir.docs}/_search/searchIdx.json`, 
        JSON.stringify(data.idx)
    )
}

const writeByName = function(data) {
    for (let e in data.entries.byName) {
        const entry = data.entries.byName[e];

        try {
            entry.content = templates.views[entry.template](entry)
        }
        catch(e) {
            console.log(entry)
        }

        entry.minisearchOpts = minisearchOpts
        const html = templates.layouts[entry.layout](entry);
        fs.writeFileSync(`${dir.docs}/${entry.name}/index.html`, html)

        if (entry.isPresentation) {
            let tmpl = 'presentation';
            if (entry.name === 'Biodiversity-Literature-Repository') {
                tmpl = 'presentationPlazi';
            }
            
            entry.content = templates.views[tmpl](entry);
            const html = templates.layouts[tmpl](entry);

            const entryDir = `${dir.docs}/${entry.name}/p`;
            const dirExists = fs.existsSync(entryDir);

            if (!dirExists) {
                fs.mkdirSync(entryDir);
            }

            fs.writeFileSync(`${entryDir}/index.html`, html)
        }
    }
}

const writeByDate = function(data) {
    console.log('writing by dates');
    const d = {
        created: moment().format('MMM DD, YYYY'),
        entries: data.entries.byYear,
        baseUrl: baseUrl
    }

    const content = {
        content: templates.views['entries-by-date'](d),
        baseUrl: baseUrl,
        minisearchOpts: minisearchOpts
    }

    const html = templates.layouts.main(content);
    fs.writeFileSync(`${dir.docs}/_dates/index.html`, html);
}

const writeByTags = function(data) {
    console.log('writing by tags');
    const date = moment().format('MMM DD, YYYY');
    const d = {
        created: date,
        baseUrl: baseUrl,
        entries: data.entries.byTag
    }

    const content = {
        content: templates.views['entries-by-tags'](d),
        baseUrl: baseUrl,
        minisearchOpts: minisearchOpts
    }

    const html = templates.layouts.main(content);
    fs.writeFileSync(`${dir.docs}/_tags/index.html`, html);

    for (let tag in data.entries.byTag) {
        const d = {
            created: date,
            baseUrl: baseUrl,
            entries: data.entries.byTag[tag],
            tag: tag
        }

        const content = {
            content: templates.views['entries-by-tag'](d),
            baseUrl: baseUrl,
            minisearchOpts: minisearchOpts
        }

        const html = templates.layouts.main(content);
        tag = tag.replace(/\//g, '-');
        tag = tag.replace(/ /g, '-');
        fs.writeFileSync(`${dir.docs}/_tags/${tag}.html`, html);
    }
}

const writeDefault = function(data) {
    const entryName = data.entries.byDate[0].name === 'cv-latest' 
        ? data.entries.byDate[1].name 
        : data.entries.byDate[0].name;

    const entry = data.entries.byName[ entryName.toLowerCase() ];
    
    entry.content = '';
    entry.isIndex = true;
    entry.minisearchOpts = minisearchOpts;
    const html = templates.layouts[entry.layout](entry);
    fs.writeFileSync(`${dir.docs}/index.html`, html);
}

const write = function(data) {
    writeByName(data);
    writeByDate(data);
    writeByTags(data);
    writeDefault(data);
    writeSearchIdx(data);
    writeHanoz(data);
}

const finish = function(data) {
    data.entries.byDate.sort(sortFunc('date'));
    data.entries.byYear.sort((a, b) => b['year'] - a['year']);
    data.entries.byYear.forEach(x => x.months.sort((a, b) => b['month'] - a['month']));
    prevNext(data);
    buildHanozIndex(data);
    buildSearchIndex('mini', data);
    write(data);
}

const makeDates = function(entry) {
    const fakedate = new Date('1980-01-01 00:00:00')
        .toLocaleDateString("en-US", dateOptions);

    entry.modified = entry.modified 
        ? new Date(entry.modified).toLocaleDateString("en-US", dateOptions) 
        : fakedate

    entry.created = entry.created  
        ? new Date(entry.created).toLocaleDateString("en-US", dateOptions) 
        : fakedate;
}

const go = function(dir) {
    const data = {
        entries: {
            byName: {},
            byDate: [],
            byTag: {},
            byTag2: [],
            byYear: [],
            hanoz: []
        },
    
        idx: {}
    };

    Walker(dir)
        // @ts-ignore
        .on('file', function(file, stat) {

            // file = .docs/Yi-Fu-Tuan/index.md
            // name = Yi-Fu-Tuan
            // dir  = .docs/Yi-Fu-Tuan/
            // url  = https://punkish.org/Yi-Fu-Tuan/
            if (path.basename(file) === 'index.md') {
                const entry = {
                    baseUrl,
                    file,
                    dir: path.dirname(file),
                    name: path.dirname(file).split('/')[1],
                    url: '',
                    dateGenerated: new Date()
                }
                
                const fileContent = fs.readFileSync(file, 'utf-8');
                const fm = yamlFront.loadFront(fileContent);

                for (let key in fm) {
                    if (key === 'tags') {
                        entry.origTags = fm.tags;
                        entry.tags = [];
                        
                        fm.tags.forEach(tag => {
                            if (tag) {
                                let tagUrl = tag;
                                tagUrl = tagUrl.replace(/\//g, '-');
                                tagUrl = tagUrl.replace(/ /g, '-');
                                entry.tags.push({ tag, tagUrl });
                            }
                        })
                    }
                    else {
                        entry[key] = fm[key];
                    }
                }

                makeDates(entry);

                let hasCode = false;
                let isPresentation = false;
                let isAlbum = false;

                if (entry.origTags) {
                    const origTags = entry.origTags;

                    hasCode = origTags.includes('code');
                    isPresentation = origTags.indexOf('presentation') > -1;
                    isAlbum = origTags.indexOf('album') > -1
                }

                entry.hasCode = hasCode ? true : false;

                if (entry.type) {
                    entry.type.forEach(t => entry[t] = true)
                }

                if (isPresentation) {
                    entry.layout = fm.layout || 'main';
                    entry.template = fm.template || 'entry-presentation';

                    if (entry.name === 'Biodiversity-Literature-Repository') {
                        me = `${me} (Plazi)`;
                    }

                    if (entry.authors) {
                        const len = entry.authors.length;

                        if (len > 1) {
                            entry.authors[len - 1] = 'and ' + entry.authors[len - 1];
                            entry.authors.unshift(me);
                            entry.authors = entry.authors.join(', ');
                        }
                        else {
                            entry.authors = me + ' and ' + entry.authors[0];
                        }
                    }
                    else {
                        entry.authors = me;
                    }

                    entry.isPresentation = true;
                }

                // album entry
                else if (isAlbum) {
                    entry.layout = fm.layout || 'main';
                    entry.template = fm.template || 'entry';
                    entry.isAlbum = true;

                    makeAlbum(entry, entry.url);
                    entry.isAlbum = true;
                }

                // regular entry
                else {
                    entry.layout = fm.layout || 'main';
                    entry.template = fm.template || 'entry';

                    // convert Markdown to html *only* if entry is 
                    // regular kind. Don't convert for a presentation 
                    // because that conversion is done by remarkjs
                    entry.__content = sh.makeHtml(entry.__content);
                    entry.__content = makeImg(entry.__content, entry.url);
                    entry.__content = makeVid(entry.__content, entry.url);
                }
            
                data.entries.byName[ entry.name.toLowerCase() ] = entry;
                
                const eIdx = {
                    name: entry.name,
                    title: entry.title,
                    date: entry.modified,
                    notes: entry.notes
                }

                addEntryByTags(entry, eIdx, data);
                addEntryByDate(entry, eIdx, data);
            }
        })
        .on('error', function(er, entry, stat) {
            console.log('Got error ' + er + ' on entry ' + entry);
        })
        .on('end', function() {
            console.log('All files traversed.');
            finish(data);
        })
}

go(dir.docs)