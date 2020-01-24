'use strict';

const fs = require('fs');
const path = require('path');
const Yaml = require('yaml-front-matter');
const lunr = require('lunr');
const showdown = require('showdown');
const footnotes = require('./public/js/footnotes.js');
const sh = new showdown.Converter({extensions: [footnotes], tables: true});
const log = require('picolog');

log.level = log.INFO;
const me = 'Puneet Kishor';
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dir = './entries';
const hanozDir = "./entries/H/HA/HAN/Hanoz/hindi";
const untaggedLabel = 'untagged';

const dirWalker = function(dir) {

    const allfiles = fs.readdirSync(dir);
    let i = 0;
    let j = allfiles.length;

    for (; i < j; i++) {

        const filename = allfiles[i];
        const fullfilename = dir + '/' + filename;

        const stats = fs.statSync(fullfilename);
        if (stats.isDirectory()) {
            dirWalker(fullfilename);
        }
        else if (stats.isFile()) {
            if (path.basename(fullfilename) === 'index.md') {

                const fileContents = fs.readFileSync(fullfilename, 'utf8');

                const entry = Yaml.loadFront(fileContents);

                //const pres = {};

                /*
                m => home '.'
                r => root 'entries'
                o => D
                t => DI
                h => DIS
                rest
                    e => entry
                    s => subentry
                    i => index.md
                */
                const [m, r, o, t, h, e, ...rest] = fullfilename.split('/');
                
                entry.name = rest.length === 2 ? `${e}/${rest[0]}` : e;
                entry.url = `${o}/${t}/${h}/${entry.name}`;

                // remove content
                delete entry.__content;

                // clean the dates
                const fakedate = new Date('1980-01-01 00:00:00').toLocaleDateString("en-US", dateOptions);
    
                if (entry.modified) {
                    entry.modified = new Date(entry.modified).toLocaleDateString("en-US", dateOptions);
                }
                else {
                    entry.modified = fakedate;
                }

                if (entry.created) {
                    entry.created = new Date(entry.created).toLocaleDateString("en-US", dateOptions);
                }
                else {
                    entry.created = fakedate;
                }


                // make the entry

                // presentation entry
                if (entry.tags && entry.tags.indexOf('presentation') > -1) {
                    entry.layout = 'main';
                    entry.template = 'entry-presentation';

                    if (entry.authors) {
                        if (entry.authors.length > 1) {
                            entry.authors[entry.authors.length - 1] = 'and ' + entry.authors[entry.authors.length - 1];
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
                }

                // album entry
                else if (entry.tags && entry.tags.indexOf('album') > -1) {
                    const imgdir = `./entries/${entry.url}/img`;
                    entry.images = fs.readdirSync(imgdir)
                        .filter(img => {
                            const imgExt = img.slice(-4);
                            return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif';
                        })
                        .map(img => {
                            return `/entry-files/${entry.url}/img/${img}`;
                        });

                    entry.type = 'album';
                }

                // regular entry
                else {
                    if (!entry.layout) entry.layout = 'main';
                    if (!entry.template) entry.template = 'entry';
                }
            
                entry.hasCode = entry.tags && entry.tags.includes('code') ? true : false;
                entry.hasCss = entry.css ? true : false;
                entry.hasJs = entry.js   ? true : false;

                addEntryByNameAndTagsAndYears(entry);                
            }
        }
    }
};

const addEntryByNameAndTagsAndYears = function(entry) {

    const type = entry.hidden ? 'hidden' : 'public';
    const eLower = entry.name.toLowerCase();

    utils.entries[type].byName[eLower] = entry;

    const entrySmallIdx = {
        name: entry.name,
        title: entry.title,
        notes: entry.notes
    };

    if (entry.tags) {

        let i = 0;
        let j = entry.tags.length;

        for (; i < j; i++) {

            if (utils.entries[type].byTag[entry.tags[i]]) {
                utils.entries[type].byTag[entry.tags[i]].push(entrySmallIdx);
            }
            else {
                utils.entries[type].byTag[entry.tags[i]] = [entrySmallIdx]
            }

        }
        
    }
    else {

        if (utils.entries[type].byTag[untaggedLabel]) {
            utils.entries[type].byTag[untaggedLabel].push(entrySmallIdx);
        }
        else {
            utils.entries[type].byTag[untaggedLabel] = [entrySmallIdx]
        }

    }

    // now build an index of entries by year and month
    const entryYear = new Date(entry.created).getFullYear() || '9999';
    const entryMonth = new Date(entry.created).toLocaleDateString('en-US', {month: 'long'}) || 'January';
    const indexOfYear = utils.entries[type].byYear.map(x => { return x.year }).indexOf(entryYear);

    if (indexOfYear > -1) {
        
        const indexOfMonth = utils.entries[type].byYear[indexOfYear].months.map(x => { return x.month }).indexOf(entryMonth);

        if (indexOfMonth > -1) {

            if (utils.entries[type].byYear[indexOfYear].months[indexOfMonth].entries.length) {
                utils.entries[type].byYear[indexOfYear].months[indexOfMonth].entries.push(entrySmallIdx);
            }
            else {
                utils.entries[type].byYear[indexOfYear].months[indexOfMonth].entries = [ entrySmallIdx ];
            }
        }
        else {
            utils.entries[type].byYear[indexOfYear].months.push({
                month: entryMonth,
                entries: [ entrySmallIdx ]
            })
        }
    }
    else {
        utils.entries[type].byYear.push({
            year: entryYear,
            months: [{
                month: entryMonth,
                entries: [ entrySmallIdx ]
            }]
        })
    }

};

const moonShot = function(entries) {

    utils.idx = lunr(function () {
        this.field('title', { boost: 10 }),
        this.field('tags'),
        this.field('body'), { boost: 20 },
        this.field('created'),
        this.ref('name'),

        entries.forEach(doc => { this.add(doc) }, this)
    });
};

const postsByDate = function(posts) {
    for (let i in posts) {
        const e = posts[i];
        utils.entries.public.byDate.push({
            date: new Date(e.created),
            name: e.name,
            title: e.title
        })
    }

    const sortFunc = function(field) {
        return function(a, b) {
            //return a[field] < b[field] ? 1 : -1;
            if (a[field] < b[field]) {
                return 1;
            }
            else if (a[field] > b[field]) {
                return -1;
            }
    
            //names must be equal
            return 0;
        }
    };

    utils.entries.public.byDate.sort(sortFunc('date'));
};

const prevNext = function() {

    const entries = utils.entries.public.byName;
    for (let name in entries) {
    
        // find prev and next entries
        const e = utils.entries.public.byDate;
        let i = 0;
        const j = e.length;

        let prev, next;

        for (; i < j; i++) {
            if (name.toLowerCase() === e[i].name.toLowerCase()) {

                const x = i > 0 ? i - 1 : 0;
                prev = {name: e[x].name, title: e[x].title};
                
                const y = i + 1 < j ? i + 1 : i;
                next = {name: e[y].name, title: e[y].title};
                
                break;
            }
        }

        entries[name].prev = prev;
        entries[name].next = next;
    }   
};

const makeVid = function(text, url) {

    return text.replace(
        /<img src="(.*?)\.(mp4)(.*)/g, 
        `<video width="100%" controls>
            <source src="/entry-files/${url}/img/$1.$2" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
        </video>`
    )
};

const makeImg = function(text, url) {
    return text.replace(
        /img src="(.*?)\.(png|gif|jpg)(.*)/g, 
        `img src="/entry-files/${url}/img/$1.$2$3`
    )
};

const buildHanozIndex = function() {

    const files = fs.readdirSync(hanozDir).filter(function(file, index) {
        var path_to_file = path.join(hanozDir, file);

        // remove entries that start with "."
        if (file.substr(0, 1) !== ".") {
            return fs.lstatSync(path_to_file).isFile();
        }
    });
    
    for (let i = 0, j = files.length; i < j; i++) {
        const filename = hanozDir + '/' + files[i];
        const fileContents = fs.readFileSync(filename, 'utf8');
        const metadata = Yaml.loadFront(fileContents);

        let page = {};

        if (metadata) {
            page.gifn = metadata["gifn"];
            if (metadata["side"] === "left") {
                page.l_opaque = ".lcol.opaque";
                page.r_opaque = ".rcol";
                page.l_text = metadata["__content"];
                page.r_text = "";
            }
            else {
                page.l_opaque = ".lcol";
                page.r_opaque = ".rcol.opaque";
                page.l_text = "";
                page.r_text = metadata["__content"];
            }
        }

        utils.entries.public.hanoz.push(page);
    }
};

const utils = {

    getEntry: function({name, showHidden = false, entrytype = 'regular'}) {

        //log.info(`name: ${name}`);

        const nameLowerCase = name.toLowerCase();
        if (nameLowerCase === 'hanoz') {
            return {
                pages: this.entries.public.hanoz,
                layout: 'hanoz',
                template: 'hanoz'
            };
        }

        const type = showHidden ? 'hidden' : 'public';
        const entry = this.entries[type].byName[nameLowerCase];

        //log.info(JSON.stringify(entry));

        if (entry) {

            const fullfilename = `${dir}/${entry.url}/index.md`;
            const fileContents = fs.readFileSync(fullfilename, 'utf8');
            const e = Yaml.loadFront(fileContents);

            for (let key in e) {
                if (key === '__content') {
                    let text = e.__content;

                    if (entrytype === 'regular') {
                        text = sh.makeHtml(text);
                        text = makeImg(text, entry.url);
                        text = makeVid(text, entry.url);
                    }
                    
                    entry.__content = text;
                }
                else if (!(key in entry)) {
                    entry[key] = e[key];
                }
            }

            //log.info(JSON.stringify(entry));
            return entry;
        }
        else {
            const t = name.replace(/-/g, ' ');
            const possible = utils.idx.search(`title:${t}~1`).map(r => {
                return { ref: r.ref, disp: r.ref.replace(/-/g, ' ') }
            });

            return {
                template: 'search',
                created: new Date().toLocaleDateString("en-US", dateOptions),
                searchTitle: 'Error',
                searchMessage: "The page you requested doesn’t exist. Perhaps you were looking for one of the following.",
                layout: 'main',
                searchResults: possible
            };
        }
    },

    entries: {
        public: {
            byName: {},
            byDate: [],
            byTag: {},
            byYear: [],
            presentations: {},
            hanoz: []
        },
        hidden: {
            byName: {},
            byDate: [],
            byTag: {},
            byYear: [],
            presentations: {},
            hanoz: []
        }
    },

    idx: {},

    init: function() {
        dirWalker(dir);
        postsByDate(this.entries.public.byName);

        // For descending sort
        this.entries.public.byYear.sort((a, b) => b['year'] - a['year']); 
        this.entries.public.byYear.forEach(x => {
            x.months.sort((a, b) => b['month'] - a['month']); 
        });

        prevNext();
        buildHanozIndex();
        moonShot(Object.values(this.entries.public.byName));
        return this.entries.public;
    }
};

module.exports = utils;