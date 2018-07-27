'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
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

const utils = {

    toTitleCase: function(str) {
        return str.replace(
            /\w\S*/g, 
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    },

    hanoz: [],

    findFile: function(file) {

        // since the user-entered file could be different from the 
        // actual file on disk (different case, different words, etc.)
        // we have to figure out the correct file. We do that by 
        // finding its instance in the pre-built 'posts' index
        for (let i = 0, j = utils.posts.byDate.length; i < j; i++) {
            if (file.toLowerCase() === utils.posts.byDate[i]['file'].toLowerCase()) {
                file = utils.posts.byDate[i]['file'];
                return file;
            }
        }

        return {
            type: 'search',
            created: moment().format('MMM DD, YYYY'),
            searchTitle: 'Error',
            searchMessage: "The page you requested doesn't exist. Perhaps you were looking for one of the following.",
            layout: 'main',
            searchResults: utils.idx.search(`title:${file}~1`).map(function(result) {
                return {
                    ref : result.ref,
                    disp : result.ref.replace(/-/g, ' ')
                }
            })
        };
    },

    getEntry: function(options) {
        let file = options['file'];
        let subfile = options['subfile'];
        const queryParam = options['queryParam'];
        const singleEntry = options['singleEntry'];

        if (singleEntry) {

            const res = this.findFile(file);
            if (typeof(res) === 'string') {
                file = res;
            }
            else {
                return res;
            }
        }
        

        // construct the entry directory and the entry URL
        const o = file.substr(0, 1).toUpperCase();
        const t = file.substr(0, 2).toUpperCase();
        const r = file.substr(0, 3).toUpperCase();
        let entryDir = `./entries/${o}/${t}/${r}/${file}`;
        let entryUrl = `${o}/${t}/${r}/${file}`;

        // modify the entry direction and the entry URL if a subfile is present
        if (subfile) {

            const res = this.findFile(subfile);
            if (typeof(res) === 'string') {
                subfile = res;
            }
            else {
                return res;
            }

            entryDir = `./entries/${o}/${t}/${r}/${file}/${subfile}`;
            entryUrl = `${o}/${t}/${r}/${file}/${subfile}`;
        }

        // this is the path to the actual entry file
        const entryIndex = `${entryDir}/index.md`;
        
        try {
            if ((file === 'Hanoz') && (queryParam === 'presentation')) {

                if (this.hanoz.length == 0) {
                    this.buildHanozIndex();
                }
                
                return {
                    pages: this.hanoz,
                    layout: 'hanoz',
                    type: 'hanoz'
                };
            }
            else {

                const fileContents = fs.readFileSync(entryIndex, 'utf8');

                let entry = Yaml.loadFront(fileContents);
                if (entry) {

                    // format user-entered date using moment
                    let dateFormat = 'YYYY-MM-DD HH:MM:SS';
                    if (singleEntry) {
                        dateFormat = 'MMM DD, YYYY';
                    }
                    
                    if (entry.modified) {
                        entry.created = moment(entry.modified).format(dateFormat);
                    }
                    else if (entry.created) {
                        entry.created = moment(entry.created).format(dateFormat);
                    }
                    else {
                        entry.created = moment().format(dateFormat);
                    }

                    if (!entry.title) {
                        entry.title = file;
                    }

                    entry.entryDir = entryDir;
                    entry.entryUrl = entryUrl;

                    if (singleEntry) {
                        
                        if (entry.type !== 'presentation') {
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

                        if (entry.tags && entry.tags.includes('code')) {
                            entry.hasCode = true;
                        }

                        if (entry.css) {
                            entry.hasCss = true;
                        }

                        if (entry.js) {
                            entry.hasJs = true;
                        }
                    }

                    return entry;
                }
            }
        }
        catch (e) {
            return {
                title: "Error",
                __content: "Not found"
            }
        }
    },

    buildHanozIndex: function() {

        const dir = "./entries/H/HA/HAN/Hanoz/hindi";

        const files = fs.readdirSync(dir).filter(function(file, index) {
            var path_to_file = path.join(dir, file);

            // remove entries that start with "."
            if (file.substr(0, 1) !== ".") {
                return fs.lstatSync(path_to_file).isFile();
            }
        });
        
        for (let i = 0, j = files.length; i < j; i++) {
            const filename = dir + '/' + files[i];
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

            this.hanoz.push(page);
        }
    },    

    posts: {
        byTag: {},
        byDate: []
    },

    dirWalker: function(start) {
        const files = fs.readdirSync(start);
        let i = 0;
        let j = files.length;
        for (; i < j; i++) {
            const f = files[i];
            const next = start + '/' + f;
            const stats = fs.statSync(next);
            if (stats.isDirectory()) {
                this.dirWalker(next);
            }
            else if (stats.isFile()) {
                if (path.extname(next) === '.md') {
    
                    const nextParts = next.split('/');
                    const file = nextParts[nextParts.length - 2];
                    const entry = utils.getEntry({
                        file: file, 
                        queryParam: null, 
                        singleEntry: false
                    });
    
                    const entryIdx = {
                        title: entry.title,
                        file: file,
                        tags: entry.tags,
                        body: entry.__content,
                        created: entry.created
                    };
    
                    if (entry.tags) {
                        for (i = 0, j = entry.tags.length; i < j; i++) {
                            if (this.posts.byTag[entry.tags[i]]) {
                                this.posts.byTag[entry.tags[i]].push(entryIdx);
                            }
                            else {
                                this.posts.byTag[entry.tags[i]] = [entryIdx]
                            }
                        }
                    }
                    else {
                        if (this.posts.byTag[untaggedLabel]) {
                            this.posts.byTag[untaggedLabel].push(entryIdx);
                        }
                        else {
                            this.posts.byTag[untaggedLabel] = [entryIdx]
                        }
                    }
                    
                    this.posts.byDate.push(entryIdx);
                }
            }
        }
    },

    init: function() {
        
        this.dirWalker(dir);
        
        this.posts.byDate.sort(function(a, b) {
            if (a.created < b.created) {
                return 1;
            }
            if (a.created > b.created) {
                return -1;
            }
    
            // names must be equal
            return 0;
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

        //fs.writeFileSync('public/js/lunridx.json', JSON.stringify(utils.idx), 'utf8');

        let postsByTitle = [];
        this.posts.byDate.forEach(function(el) {
            postsByTitle.push([el.title, el.file]);
        });

        fs.writeFileSync('public/js/posts.js', JSON.stringify(postsByTitle.sort()));

        return this.posts;
    }
};

module.exports = utils;