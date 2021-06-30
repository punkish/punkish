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
const { exec } = require('child_process')

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

    searchIdx: {}
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
    return text.replace(
        /<img src="(.*?)\.(mp4)(.*)/g, 
        `<video width="100%" controls poster="img/$1.jpg">
            <source src="img/$1.$2" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
        </video>`
    )
}

const makeImg = function(text, url) {
    return text.replace(
        /img src="(.*?)\.(png|gif|jpg)(.*)/g, 
        `img src="img/$1.$2$3`
    )
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
    if (entry.tags) {
        entry.tags.forEach(t => {
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
        return field === 'date' ? new Date(b[field]) - new Date(a[field]) : b[field] - a[field]
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

const buildSearchIndex = function(entries) {
    data.searchIdx = lunr(function () {
        this.field('title', { boost: 10 }),
        this.field('tags'),
        this.field('body'), { boost: 20 },
        this.field('created'),
        this.ref('name'),

        entries.forEach(doc => { this.add(doc) }, this)
    })
}

const writeByName = function() {
    for (let e in data.entries.byName) {
        const entry = data.entries.byName[e]
        entry.content = templates.views[entry.template](entry)
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
        entries: data.entries.byYear
    }

    const content = templates.views['entries-by-date'](d)
    const html = templates.layouts.main({content: content})
    fs.writeFileSync(`${dir.docs}/_dates/index.html`, html)
}

const writeByTags = function() {
    console.log('writing by tags')
    const d = {
        created: moment().format('MMM DD, YYYY'),
        entries: []
    }

    const lowerCaseTags = {}

    for (const tag in data.entries.byTag) {
        const lct = tag.toLowerCase()
        const entriesByTag = data.entries.byTag[tag]

        if (lct in lowerCaseTags) {
            lowerCaseTags[lct].push(entriesByTag)
        }
        else {
            lowerCaseTags[lct] = entriesByTag
        }
    }

    const tags = Object.keys(lowerCaseTags).sort()
    
    for (let i = 0, j = tags.length; i < j; i++) {
        const entriesByTag = lowerCaseTags[tags[i]]
        d.entries.push({
            tag: tags[i], 
            entriesByTag: entriesByTag
        })
    }

    const content = templates.views['entries-by-tag'](d)
    const html = templates.layouts.main({content: content})
    fs.writeFileSync(`${dir.docs}/_tags/index.html`, html)
}

const writeDefault = function() {
    const entryName = data.entries.byDate[0].name
    const entry = data.entries.byName[entryName]
    entry.content = templates.views[entry.template](entry)
    const html = templates.layouts[entry.layout](entry)
    fs.writeFileSync(`${dir.docs}/index.html`, html)
}

const write = function() {
    writeByName()
    writePresentations()
    writeByDate()
    writeByTags()
    writeDefault()
}

const finish = function() {
    data.entries.byDate.sort(sortFunc('date'))
    data.entries.byYear.sort((a, b) => b['year'] - a['year'])
    data.entries.byYear.forEach(x => {
        x.months.sort((a, b) => b['month'] - a['month'])
    })
    prevNext()
    buildHanozIndex()
    buildSearchIndex(Object.values(data.entries.byName))
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

const moveFiles = function() {
    Walker(dir.entries)
        .on('file', function(file, stat) {

            // file = ./entries/Y/YI/YI-/Yi-Fu-Tuan/index.md
            // name = Yi-Fu-Tuan
            // dir  = ./entries/Y/YI/YI-/Yi-Fu-Tuan/
            // url  = Y/YI/YI-/Yi-Fu-Tuan/
            if (path.basename(file) === 'index.md') {

                // let's copy the files from 'entries' to 'html'
                exec(`cp -r ${path.dirname(file)} ${dir.docs}`)
            }
        })
        .on('error', function(er, entry, stat) {
            console.log('Got error ' + er + ' on entry ' + entry)
        })
        .on('end', function() {
            console.log('All files moved.')
        })
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
                const entry = {}
                entry.file = file
                entry.dir = path.dirname(file)
                entry.name = entry.dir.split('/')[1]
                
                const fm = yamlFront.loadFront(fs.readFileSync(file, 'utf-8'))

                for (let key in fm) {
                    entry[key] = fm[key]
                }

                makeDates(entry)

                entry.hasCode = entry.tags && entry.tags.includes('code') ? true : false
                entry.hasCss = entry.css ? true : false
                entry.hasJs = entry.js   ? true : false

                // presentation entry
                if (entry.tags && entry.tags.indexOf('presentation') > -1) {
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
                else if (entry.tags && entry.tags.indexOf('album') > -1) {
                    entry.layout = fm.layout || 'main'
                    entry.template = fm.template || 'entry'

                    const imgdir = `${entry.dir}/img`
                    entry.images = fs.readdirSync(imgdir)
                        .filter(img => {
                            const imgExt = img.slice(-4)
                            return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif'
                        })
                        .map(img => {
                            return 'img/${img}'
                        });

                    entry.type = 'album'
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
            //console.log(data.entries)
            finish()
        })
}

//moveFiles()
go(dir.docs)