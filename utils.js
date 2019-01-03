'use strict';

const fs = require('fs');
const path = require('path');
const lunr = require('lunr');
const Yaml = require('yaml-front-matter');
const showdown = require('showdown');
const footnotes = require('./public/js/footnotes.js');
const sh = new showdown.Converter({
    extensions: [footnotes],
    tables: true
});

const dir = './entries';
const untaggedLabel = 'untagged';
const today  = new Date();
const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};
const me = 'Puneet Kishor';
const hanozDir = "./entries/H/HA/HAN/Hanoz/hindi";
const hanoz = [];

const findFile = function(file, showHidden) {

    // since the user-entered file could be different from the 
    // actual file on disk (different case, different words, etc.)
    // we have to figure out the correct file. We do that by 
    // finding its instance in the pre-built 'posts' index
    if (showHidden) {
        for (let i = 0, j = utils.hiddenPosts.byDate.length; i < j; i++) {
            if (file.toLowerCase() === utils.hiddenPosts.byDate[i]['file'].toLowerCase()) {
                file = utils.hiddenPosts.byDate[i]['file'];
                return file;
            }
        }
    }
    else {
        for (let i = 0, j = utils.posts.byDate.length; i < j; i++) {
            if (file.toLowerCase() === utils.posts.byDate[i]['file'].toLowerCase()) {
                file = utils.posts.byDate[i]['file'];
                return file;
            }
        }
    }

    return false
};

const fileNotFound = function(file) {
    return {
        template: 'search',
        created: today.toLocaleDateString("en-US", dateOptions),
        searchTitle: 'Error',
        searchMessage: "The page you requested doesn’t exist. Perhaps you were looking for one of the following.",
        layout: 'main',
        searchResults: utils.idx.search(`title:${file}~1`).map(function(result) {
            return {
                ref: result.ref,
                disp: result.ref.replace(/-/g, ' ')
            }
        })
    };
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

        hanoz.push(page);
    }
};

const posts = function(file, entry, typeOfPost, entryIdx) {

    const entrySmallIdx = {
        title: entry.title,
        file: file,
        notes: entry.notes
    };


    if (entry.tags) {
        for (let i = 0, j = entry.tags.length; i < j; i++) {
            if (utils[typeOfPost].byTag[entry.tags[i]]) {
                utils[typeOfPost].byTag[entry.tags[i]].push(entrySmallIdx);
            }
            else {
                utils[typeOfPost].byTag[entry.tags[i]] = [entrySmallIdx]
            }
        }
    }
    else {
        if (utils[typeOfPost].byTag[untaggedLabel]) {
            utils[typeOfPost].byTag[untaggedLabel].push(entrySmallIdx);
        }
        else {
            utils[typeOfPost].byTag[untaggedLabel] = [entrySmallIdx]
        }
    }



    /*
    const years = [
        { 
            year: 2008,
            months: [
                { 
                    month: 12,
                    entries: [
                        {
                            title: "One Entry in 2008-12", 
                            file: "One-Entry", 
                            notes: "This is entry one in Dec 2008" 
                        },
                        { 
                            title: "Two Entry in 2008-12", 
                            file: "Two-Entry", 
                            notes: "This is entry two in Dec 2008" 
                        },
                        { 
                            title: "Three Entry in 2008-12", 
                            file: "Three-Entry", 
                            notes: "This is entry three in Dec 2008" 
                        }
                    ]
                },
                { 
                    month: 11,
                    entries: [
                        {
                            title: "One Entry in 2008-11", 
                            file: "One-Entry", 
                            notes: "This is entry one in Nov 2008" 
                        },
                        { 
                            title: "Two Entry in 2008-11", 
                            file: "Two-Entry", 
                            notes: "This is entry two in Nov 2008" 
                        },
                        { 
                            title: "Three Entry in 2008-11", 
                            file: "Three-Entry", 
                            notes: "This is entry three in Nov 2008" 
                        }
                    ]
                }
            ]
        },
        { 
            year: 2007,
            months: [
                { 
                    month: 12,
                    entries: [
                        {
                            title: "One Entry in 2007-12", 
                            file: "One-Entry", 
                            notes: "This is entry one in Dec 2007" 
                        },
                        { 
                            title: "Two Entry in 2007-12", 
                            file: "Two-Entry", 
                            notes: "This is entry two in Dec 2007" 
                        },
                        { 
                            title: "Three Entry in 2007-12", 
                            file: "Three-Entry", 
                            notes: "This is entry three in Dec 2007" 
                        }
                    ]
                },
                { 
                    month: 11,
                    entries: [
                        {
                            title: "One Entry in 2007-11", 
                            file: "One-Entry", 
                            notes: "This is entry one in Nov 2007" 
                        },
                        { 
                            title: "Two Entry in 2007-11", 
                            file: "Two-Entry", 
                            notes: "This is entry two in Nov 2007" 
                        },
                        { 
                            title: "Three Entry in 2007-11", 
                            file: "Three-Entry", 
                            notes: "This is entry three in Nov 2007" 
                        }
                    ]
                }
            ]
        }
    ];

    data['years'] = years;
    */
    const entryYear = new Date(entry.created).getFullYear();
    const entryMonth = new Date(entry.created).getMonth();
    const indexOfYear = utils[typeOfPost].byYear.map(x => { return x.year }).indexOf(entryYear);

    if (indexOfYear > -1) {
        
        const indexOfMonth = utils[typeOfPost].byYear[indexOfYear].months.map(x => { return x.month }).indexOf(entryMonth);
        if (indexOfMonth > -1) {

            if (utils[typeOfPost].byYear[indexOfYear].months[indexOfMonth].entries.length) {
                utils[typeOfPost].byYear[indexOfYear].months[indexOfMonth].entries.push(entrySmallIdx);
            }
            else {
                utils[typeOfPost].byYear[indexOfYear].months[indexOfMonth].entries = [ entrySmallIdx ];
            }
        }
        else {
            utils[typeOfPost].byYear[indexOfYear].months.push({
                month: entryMonth,
                entries: [ entrySmallIdx ]
            })
        }
    }
    else {
        utils[typeOfPost].byYear.push(
            {
                year: entryYear,
                months: [{
                    month: entryMonth,
                    entries: [ entrySmallIdx ]
                }]
            }
        )
    }

    utils[typeOfPost].byDate.push(entryIdx);
};

const dirWalker = function(start) {
    const files = fs.readdirSync(start);
    let i = 0;
    let j = files.length;

    for (; i < j; i++) {
        const f = files[i];
        const next = start + '/' + f;
        const stats = fs.statSync(next);
        if (stats.isDirectory()) {
            dirWalker(next);
        }
        else if (stats.isFile()) {
            if (path.basename(next) === 'index.md') {

                const nextParts = next.split('/');
                const file = nextParts[nextParts.length - 2];
                const entry = utils.getEntry({
                    file: file, 
                    subfile: false
                });

                if (entry) {
                    const entryIdx = {
                        title: entry.title,
                        file: file,
                        tags: entry.tags,
                        body: entry.__content,
                        notes: entry.notes,
                        created: entry.created
                    };

                    if (entry.hidden) {
                        posts(file, entry, 'hiddenPosts', entryIdx);
                    }
                    else {
                        posts(file, entry, 'posts', entryIdx);
                    }
                }
            }
        }
    }
};

const utils = {

    getSingleEntry: function(options) {
        let file = options['file'];
        let subfile = options['subfile'];
        const presentation = options['presentation'];
        const showHidden = options['showHidden'];

        // since the file name has been provided 
        // by the user, we have to check whether it 
        // exists or not
        const res = findFile(file, showHidden);
        if (res) {
            file = res;
        }
        
        // if no valid file was found, return an error message
        // and suggestions for possibly matching files
        else {
            return fileNotFound(file);
        }

        // construct the entry directory and the entry URL
        const o = file.substr(0, 1).toUpperCase();
        const t = file.substr(0, 2).toUpperCase();
        const r = file.substr(0, 3).toUpperCase();
        const pathToFile = `${o}/${t}/${r}/${file}`;
        let entryDir = `./entries/${pathToFile}`;
        let entryUrl = `${pathToFile}`;

        // modify the entry direction and the entry URL 
        // if a subfile is present
        if (subfile) {

            const res = findFile(subfile, showHidden);
            if (res) {
                subfile = res;
            }
            else {
                return fileNotFound(subfile);;
            }

            entryDir = `./entries/${pathToFile}/${subfile}`;
            entryUrl = `${pathToFile}/${subfile}`;
        }

        // this is the path to the actual entry file
        const entryIndex = `${entryDir}/index.md`;

        // if the queryParam 'presentation' is true
        // we have to show the presentation using remarkjs
        // if (presentation) {

            
        // }
        // else {
                
            // get basic details of the entry
            try {
                const fileContents = fs.readFileSync(entryIndex, 'utf8');

                let entry = Yaml.loadFront(fileContents);
                
                if (entry.hidden && (entry.hidden !== showHidden)) {
                    return fileNotFound(file);
                }
                else {
                    if (entry.modified) {
                        entry.created = new Date(entry.modified);
                    }
                    else if (entry.created) {
                        entry.created = new Date(entry.created);
                    }
                    else {
                        entry.created = today;
                    }

                    entry.created = entry.created.toLocaleDateString("en-US", dateOptions)

                    if (!entry.title) {
                        entry.title = file;
                    }

                    entry.entryDir = entryDir;
                    entry.entryUrl = entryUrl;
                    entry.url = file;
                }

                if (presentation) {

                    if (file.toLowerCase() === 'hanoz') {

                        if (hanoz.length == 0) {
                            buildHanozIndex();
                        }
                        
                        return {
                            pages: hanoz,
                            layout: 'hanoz',
                            template: 'hanoz'
                        };
                    }
                    else {
                        if (!entry.layout) {
                            entry.layout = 'presentation';
                        }
                        if (!entry.template) {
                            entry.template = 'presentation';
                        }
                    }
                }
                else {
                    if (entry.tags.indexOf('presentation') > -1) {

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
                    else if (entry.tags.indexOf('album') > -1) {
                        entry.images = fs.readdirSync(entry.entryDir + '/img')
                            .filter(img => {
                                const imgExt = img.slice(-4);
                                return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif';
                            })
                            .map(img => {
                                return `/entry-files/${entry.entryUrl}/img/${img}`;
                            });

                        entry.type = 'album';
                        entry.__content = sh.makeHtml(entry.__content);
                        entry.__content = entry.__content.replace(
                            /img src="(.*?)\.(png|gif|jpg)(.*)/g, 
                            `img src="/entry-files/${entryUrl}/img/$1.$2$3`
                        );

                        // find prev and next entries
                        let i = 0;
                        const j = this.posts.byDate.length;
                        for (; i < j; i++) {
                            if (file.toLowerCase() === this.posts.byDate[i]['file'].toLowerCase()) {

                                if (i == 0) {
                                    entry.prev = this.posts.byDate[i];
                                }
                                else if (i > 0) {
                                    entry.prev = this.posts.byDate[i - 1];
                                }
                                
                                if (i < j) {
                                    entry.next = this.posts.byDate[i + 1];
                                }
                                else if (i == j) {
                                    entry.next = this.posts.byDate[i];
                                }
                                
                                break;
                            }
                        }
                    }
                    else {
                        if (!entry.layout) {
                            entry.layout = 'main';
                        }
                        
                        if (!entry.template) {
                            entry.template = 'entry';
                        }

                        entry.__content = sh.makeHtml(entry.__content);
                        entry.__content = entry.__content.replace(
                            /img src="(.*?)\.(png|gif|jpg)(.*)/g, 
                            `img src="/entry-files/${entryUrl}/img/$1.$2$3`
                        );
                    }
                }

                if (entry.tags && entry.tags.includes('code')) {
                    entry.hasCode = true;
                }

                entry.hasCss = entry.css ? true : false;
                entry.hasJs = entry.js   ? true : false;

                // find prev and next entries
                let i = 0;
                const j = this.posts.byDate.length;
                for (; i < j; i++) {
                    if (file.toLowerCase() === this.posts.byDate[i]['file'].toLowerCase()) {

                        if (i == 0) {
                            entry.prev = this.posts.byDate[i];
                        }
                        else if (i > 0) {
                            entry.prev = this.posts.byDate[i - 1];
                        }
                        
                        if (i < j) {
                            entry.next = this.posts.byDate[i + 1];
                        }
                        else if (i == j) {
                            entry.next = this.posts.byDate[i];
                        }
                        
                        break;
                    }
                }

                //console.log(entry.layout, entry.template);

                return entry;
            }
            catch (e) {
                return {
                    title: "Error",
                    __content: "Unable to read the file"
                }
            }
        //}
    },

    getEntry: function(options) {
        let file = options['file'];
        let subfile = options['subfile'];

        // construct the entry directory and the entry URL
        const o = file.substr(0, 1).toUpperCase();
        const t = file.substr(0, 2).toUpperCase();
        const r = file.substr(0, 3).toUpperCase();
        const pathToFile = `${o}/${t}/${r}/${file}`;
        let entryDir = `./entries/${pathToFile}`;
        let entryUrl = `${pathToFile}`;

        // modify the entry direction and the entry URL 
        // if a subfile is present
        if (subfile) {

            const res = this.findFile(subfile);
            if (res) {
                subfile = res;
            }

            entryDir = `./entries/${pathToFile}/${subfile}`;
            entryUrl = `${pathToFile}/${subfile}`;
        }

        // this is the path to the actual entry file
        const entryIndex = `${entryDir}/index.md`;


        // get basic details of the entry
        try {
            const fileContents = fs.readFileSync(entryIndex, 'utf8');

            let entry = Yaml.loadFront(fileContents);

            if (entry.modified) {
                entry.created = new Date(entry.modified);
            }
            else if (entry.created) {
                entry.created = new Date(entry.created);
            }
            else {
                entry.created = today;
            }

            if (!entry.title) {
                entry.title = file;
            }

            entry.entryDir = entryDir;
            entry.entryUrl = entryUrl;

            // if (entry.tags.indexOf('presentation') > -1) {

            //     if (entry.authors) {
            //         if (entry.authors.length > 1) {
            //             entry.authors[entry.authors.length - 1] = 'and ' + entry.authors[entry.authors.length - 1];
            //             entry.authors.unshift(me);
            //             entry.authors = entry.authors.join(', ');
            //         }
            //         else {
            //             entry.authors = me + ' and ' + entry.authors[0];
            //         }
            //     }
            //     else {
            //         entry.authors = me;
            //     }
            // }
            
            return entry;
        }
        catch (e) {
            return {
                title: "Error",
                __content: "Unable to read the file"
            }
        }
    },

    posts: {
        byTag: {},
        byDate: [],
        byYear: []
    },

    hiddenPosts: {
        byTag: {},
        byDate: [],
        byYear: []
    },

    init: function() {
        
        dirWalker(dir);
        
        const sortFunc = function(field) {
            return function(a, b) {
                if (a[field] < b[field]) {
                    return 1;
                }
                if (a[field] > b[field]) {
                    return -1;
                }
        
                // names must be equal
                return 0;
            }
        };

        this.posts.byDate.sort(sortFunc('created'));
        //this.posts.byDate.sort(sortFunc('title'));

        this.posts.byYear.sort((a, b) => b['year'] - a['year']); // For descending sort

        this.posts.byYear.forEach(x => {
            x.months.sort((a, b) => b['month'] - a['month']); // For descending sort
        });

        // create the search index and store it for later use
        utils['idx'] = lunr(function () {
            this.field('title', { boost: 10 }),
            this.field('tags'),
            this.field('body'), { boost: 20 },
            this.field('created'),
            this.ref('file'),

            utils.posts.byDate.forEach(function (doc) {
                this.add(doc)
            }, this)
        });

        // let postsByTitle = [];
        // this.posts.byDate.forEach(function(el) {
        //     postsByTitle.push([el.title, el.file]);
        // });

        // fs.writeFileSync('public/js/posts.js', JSON.stringify(postsByTitle.sort()));

        return this.posts;
    }
};

module.exports = utils;