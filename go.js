'use strict'

const Walker = require('walker')
const path = require('path')
const fs = require('fs')
const yamlFront = require('yaml-front-matter')
const showdown = require('showdown');
const footnotes = require('./public/js/footnotes.js');
const sh = new showdown.Converter({extensions: [footnotes], tables: true});
const Handlebars = require('handlebars')
const lunr = require('lunr')
const moment = require('moment')
const MiniSearch = require('minisearch')

const baseUrl = ''
const me = 'Puneet Kishor';
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
const dir = {
    entries: './entries',
    t: './views',
    tl: `./views/layouts`,
    tp: `./views/partials`,
    docs: './docs',
    hanozDir: './docs/Hanoz/hindi'
}
const minisearchOpts = {
    fields: ['title', 'text'],
    storeFields: ['title', 'name'],
    searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2
    }
}

const untaggedLabel = 'untagged'
const templates = { layouts: {}, views: {} }
const data = {
    entries: {
        byName: {},
        byDate: [],
        byTag: {},
        byYear: [],
        presentations: {},
        hanoz: []
    },

    idx: {}
}

const makeTemplates = function() {
    console.log('making templates')

    const layouts = fs.readdirSync(dir.tl)
    layouts.forEach(l => {
        const layout = l.split('.')[0]
        templates.layouts[layout] = Handlebars.compile(fs.readFileSync(`${dir.tl}/${l}`, 'utf-8'))
    })
    
    const partials = fs.readdirSync(dir.tp)
    partials.forEach(p => {
        const partial = p.split('.')[0]
        Handlebars.registerPartial(partial, fs.readFileSync(`${dir.tp}/${p}`, 'utf-8'))
    })
    
    const views = fs.readdirSync(dir.t)
    views.forEach(v => {
        if (fs.statSync(`${dir.t}/${v}`).isFile()) {
            const view = v.split('.')[0]
            templates.views[view] = Handlebars.compile(fs.readFileSync(`${dir.t}/${v}`, 'utf-8'))
        }
    })
}

const makeVid = function(text, url) {
    url = url ? `${url}/img` : 'img'

    return text.replace(
        /<img src="(.*?)\.(mp4)(.*)/g, 
        `<video width="100%" controls poster="img/$1.jpg">
            <source src="${url}/$1.$2" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
        </video>`
    )
}

const makeImg = function(text, url) {
    url = url ? `${url}/img` : 'img'
    
    return text.replace(
        /img src="(.*?)\.(png|gif|jpg)(.*)/g, 
        `img src="${url}/$1.$2$3`
    )
}

const makeAlbum = function(entry, url) {
    url = url ? `${url}/img` : 'img'
    entry.images = fs.readdirSync(`${entry.dir}/img`)
        .filter(img => {
            const imgExt = img.slice(-4)
            return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif'
        })
        .map(img => {
            return `${url}/${img}`
        });

}
const prevNext = function() {
    console.log('populating prev-next')

    const j = data.entries.byDate.length
    for (let name in data.entries.byName) {
    
        let prev
        let next

        for (let i = 0; i < j; i++) {
            if (name.toLowerCase() === data.entries.byDate[i].name.toLowerCase()) {

                const x = i > 0 ? i - 1 : 0
                prev = {
                    name: data.entries.byDate[x].name, 
                    title: data.entries.byDate[x].title
                }
                
                const y = i + 1 < j ? i + 1 : i;
                next = {
                    name: data.entries.byDate[y].name, 
                    title: data.entries.byDate[y].title
                }
                
                break
            }
        }

        data.entries.byName[name].prev = prev
        data.entries.byName[name].next = next
    }   
}

const addEntryByTags = function(entry, eIdx) {
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

const addEntryByDate = function(entry, eIdx) {
    data.entries.byDate.push(eIdx)

    const date = new Date(entry.created)
    const entryYear = date.getFullYear() || '9999'
    const entryMonth = date.toLocaleDateString('en-US', {month: 'long'}) || 'January'
    const indexOfYear = data.entries.byYear.map(x => { return x.year }).indexOf(entryYear)

    if (indexOfYear > -1) {
        const indexOfMonth = data.entries.byYear[indexOfYear]
            .months.map(x => { return x.month }).indexOf(entryMonth)

        if (indexOfMonth > -1) {
            if (data.entries.byYear[indexOfYear].months[indexOfMonth].entries.length) {
                data.entries.byYear[indexOfYear].months[indexOfMonth].entries.push(eIdx)
            }
            else {
                data.entries.byYear[indexOfYear].months[indexOfMonth].entries = [ eIdx ]
            }
        }
        else {
            data.entries.byYear[indexOfYear].months.push({
                month: entryMonth,
                entries: [ eIdx ]
            })
        }
    }
    else {
        data.entries.byYear.push({
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
        return field === 'date' ? 
            new Date(b[field]) - new Date(a[field]) : 
            b[field] - a[field]
    }
}

const buildHanozIndex = function() {
    console.log('building hanoz index')
    const files = fs.readdirSync(dir.hanozDir).filter(function(file, index) {
        const path_to_file = path.join(dir.hanozDir, file)

        // remove entries that start with "."
        if (file.substr(0, 1) !== ".") {
            return fs.lstatSync(path_to_file).isFile()
        }
    })
    
    for (let i = 0, j = files.length; i < j; i++) {
        const filename = dir.hanozDir + '/' + files[i]
        const fileContents = fs.readFileSync(filename, 'utf8')
        const metadata = yamlFront.loadFront(fileContents)

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

const buildSearchIndex = function(type) {
    console.log(`building **${type}** search index`)

    const docs = []
    let id = 0
    for (let e in data.entries.byName) {
        const entry = data.entries.byName[e]
        const doc = {
            title: entry.title,
            text: entry.__content,
            name: entry.name
        }
        
        if (type === 'mini') doc.id = id++
        docs.push(doc)
    }

    if (type === 'lunr') {
        data.idx = lunr(function () {
            this.field('title', { boost: 10 }),
            this.field('text'), { boost: 20 },
            this.ref('name'),
    
            docs.forEach(doc => { this.add(doc) }, this)
        })
    } 
    else if (type === 'mini') {
        const miniSearch = new MiniSearch(minisearchOpts)

        miniSearch.addAll(docs)
        data.idx = miniSearch
    }

}

const writeSearchIdx = function() {
    fs.writeFileSync(`${dir.docs}/_search/searchIdx.json`, JSON.stringify(data.idx))
}

const writeByName = function() {
    for (let e in data.entries.byName) {
        const entry = data.entries.byName[e]
        entry.content = templates.views[entry.template](entry)
        entry.minisearchOpts = minisearchOpts
        const html = templates.layouts[entry.layout](entry)
        fs.writeFileSync(`${dir.docs}/${entry.name}/index.html`, html)
    }
}

const writePresentations = function() {
    for (let e in data.entries.presentations) {
        const entry = data.entries.presentations[e]
        entry.content = templates.views[entry.template](entry)
        const html = templates.layouts[entry.layout](entry)
        fs.writeFileSync(`${dir.docs}/${entry.name}/p/index.html`, html)
    }
}

const writeByDate = function() {
    console.log('writing by dates')
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
    const html = templates.layouts.main(content)
    fs.writeFileSync(`${dir.docs}/_dates/index.html`, html)
}

const writeByTags = function() {
    console.log('writing by tags')
    const date = moment().format('MMM DD, YYYY')
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
    const html = templates.layouts.main(content)
    fs.writeFileSync(`${dir.docs}/_tags/index.html`, html)

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
        const html = templates.layouts.main(content)
        tag = tag.replace(/\//g, '-')
        tag = tag.replace(/ /g, '-')
        fs.writeFileSync(`${dir.docs}/_tags/${tag}.html`, html)
    }
}

const writeDefault = function() {
    const entryName = data.entries.byDate[0].name === 'cv-latest' ? 
        data.entries.byDate[1].name : 
        data.entries.byDate[0].name
    const entry = data.entries.byName[entryName.toLowerCase()]
    
    entry.content = ''
    entry.isIndex = true
    entry.minisearchOpts = minisearchOpts
    const html = templates.layouts[entry.layout](entry)
    fs.writeFileSync(`${dir.docs}/index.html`, html)
}

const write = function() {
    writeByName()
    writePresentations()
    writeByDate()
    writeByTags()
    writeDefault()
    writeSearchIdx()
}

const finish = function() {
    data.entries.byDate.sort(sortFunc('date'))
    data.entries.byYear.sort((a, b) => b['year'] - a['year'])
    data.entries.byYear.forEach(x => {
        x.months.sort((a, b) => b['month'] - a['month'])
    })
    prevNext()
    buildHanozIndex()
    buildSearchIndex('mini')
    write()
}

const makeDates = function(entry) {
    const fakedate = new Date('1980-01-01 00:00:00')
        .toLocaleDateString("en-US", dateOptions)

    entry.modified = entry.modified ? 
        new Date(entry.modified).toLocaleDateString("en-US", dateOptions) : 
        fakedate

    entry.created = entry.created  ? 
        new Date(entry.created).toLocaleDateString("en-US", dateOptions) :
        fakedate
}

const go = function(dir) {
    makeTemplates()

    Walker(dir)
        .on('file', function(file, stat) {

            // file = .docs/Yi-Fu-Tuan/index.md
            // name = Yi-Fu-Tuan
            // dir  = .docs/Yi-Fu-Tuan/
            // url  = https://punkish.org/Yi-Fu-Tuan/
            if (path.basename(file) === 'index.md') {
                const entry = {
                    baseUrl: baseUrl,
                    file: file,
                    dir: path.dirname(file),
                    name: path.dirname(file).split('/')[1],
                    url: ''
                }
                
                const fm = yamlFront.loadFront(fs.readFileSync(file, 'utf-8'))

                for (let key in fm) {
                    if (key === 'tags') {
                        entry.origTags = fm.tags
                        entry.tags = []
                        
                        fm.tags.forEach(t => {
                            if (t) {
                                let tagUrl = t
                                tagUrl = tagUrl.replace(/\//g, '-')
                                tagUrl = tagUrl.replace(/ /g, '-')
                                entry.tags.push({tag: t, tagUrl: tagUrl})
                            }
                        })
                    }
                    else {
                        entry[key] = fm[key]
                    }
                }

                makeDates(entry)

                entry.hasCode = entry.origTags && entry.origTags.includes('code') ? true : false
                // entry.hasCss = entry.css ? true : false
                // entry.hasJs = entry.js   ? true : false

                if (entry.type) {
                    entry.type.forEach(t => {
                        entry[t] = true
                    })
                }

                // presentation entry
                if (entry.origTags && entry.origTags.indexOf('presentation') > -1) {
                    entry.layout = fm.layout || 'main'
                    entry.template = fm.template || 'entry-presentation'

                    if (entry.authors) {
                        if (entry.authors.length > 1) {
                            entry.authors[entry.authors.length - 1] = 'and ' + entry.authors[entry.authors.length - 1]
                            entry.authors.unshift(me)
                            entry.authors = entry.authors.join(', ')
                        }
                        else {
                            entry.authors = me + ' and ' + entry.authors[0]
                        }
                    }
                    else {
                        entry.authors = me
                    }
                }

                // album entry
                else if (entry.origTags && entry.origTags.indexOf('album') > -1) {
                    entry.layout = fm.layout || 'main'
                    entry.template = fm.template || 'entry'

                    makeAlbum(entry, entry.url)
                    //entry.type = 'album'
                }

                // regular entry
                else {
                    entry.layout = fm.layout || 'main'
                    entry.template = fm.template || 'entry'

                    // convert Markdown to html *only* if entry is 
                    // regular kind. Don't convert for a presentation 
                    // because that conversion is done by remarkjs
                    entry.__content = sh.makeHtml(entry.__content);
                    entry.__content = makeImg(entry.__content, entry.url)
                    entry.__content = makeVid(entry.__content, entry.url)
                }
            
                data.entries.byName[ entry.name.toLowerCase() ] = entry
                
                const eIdx = {
                    name: entry.name,
                    title: entry.title,
                    date: entry.modified,
                    notes: entry.notes
                }

                addEntryByTags(entry, eIdx)
                addEntryByDate(entry, eIdx)
            }
        })
        .on('error', function(er, entry, stat) {
            console.log('Got error ' + er + ' on entry ' + entry)
        })
        .on('end', function() {
            console.log('All files traversed.')
            finish()
        })
}

go(dir.docs)