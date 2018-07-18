'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
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
    hanoz: [],

    getEntry: function(options) {
        const file = options['file'] || '';
        const subfile = options['subfile'] || '';
        const queryParam = options['queryParam'] || '';
        const singleEntry = options['singleEntry'] || '';

        const o = file.substr(0, 1).toUpperCase();
        const t = file.substr(0, 2).toUpperCase();
        const r = file.substr(0, 3).toUpperCase();

        let entryDir = `./entries/${o}/${t}/${r}/${file}`;
        let entryUrl = `${o}/${t}/${r}/${file}`;

        if (subfile) {
            entryDir = `./entries/${o}/${t}/${r}/${file}/${subfile}`;
            entryUrl = `${o}/${t}/${r}/${file}/${subfile}`;
        }

        const entryIndex = `${entryDir}/index.md`;
        
        try {
            if ((file.toLowerCase() === 'hanoz') && (queryParam === 'book')) {

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
                fs.accessSync(entryIndex, fs.constants.R_OK);

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
                            const j = this.posts.sortedByDates.length;
                            for (; i < j; i++) {
                                if (file === this.posts.sortedByDates[i]['file']) {
                                    if (i == 0) {
                                        entry.prev = this.posts.sortedByDates[i];
                                    }
                                    else if (i > 1) {
                                        entry.prev = this.posts.sortedByDates[i - 1];
                                    }
                                    
                                    if (i < j) {
                                        entry.next = this.posts.sortedByDates[i + 1];
                                    }
                                    else if (i == j) {
                                        entry.next = this.posts.sortedByDates[i];
                                    }
                                    
                                    break;
                                }
                            }
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
        sortedByTags: {},
        sortedByDates: []
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
                    const entry = utils.getEntry(file, false);
    
                    const entryIdx = {
                        title: entry.title,
                        file: file,
                        created: entry.created
                    };
    
                    if (entry.tags) {
                        for (i = 0, j = entry.tags.length; i < j; i++) {
                            if (this.posts.sortedByTags[entry.tags[i]]) {
                                this.posts.sortedByTags[entry.tags[i]].push(entryIdx);
                            }
                            else {
                                this.posts.sortedByTags[entry.tags[i]] = [entryIdx]
                            }
                        }
                    }
                    else {
                        if (this.posts.sortedByTags[untaggedLabel]) {
                            this.posts.sortedByTags[untaggedLabel].push(entryIdx);
                        }
                        else {
                            this.posts.sortedByTags[untaggedLabel] = [entryIdx]
                        }
                    }
                    
                    this.posts.sortedByDates.push(entryIdx);
                }
            }
        }
    },

    init: function() {
        
        this.dirWalker(dir);
        
        this.posts.sortedByDates.sort(function(a, b) {
            if (a.created < b.created) {
                return 1;
            }
            if (a.created > b.created) {
                return -1;
            }
    
            // names must be equal
            return 0;
        });
        
        return this.posts;
    }
};

module.exports = utils;