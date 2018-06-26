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

const dir = '/Users/punkish/Projects/pk3/entries';
const untaggedLabel = 'untagged';

const utils = {
    getEntry: function(file, singleEntry) {

        const o = file.substr(0, 1).toUpperCase();
        const t = file.substr(0, 2).toUpperCase();
        const r = file.substr(0, 3).toUpperCase();
        const entryDir = `${o}/${t}/${r}/${file}`;

        const entryIndex = `./entries/${entryDir}/index.md`;
        // const entryImgDir = `entries-files/${entryDir}/img/`;
        // const entryCssDir = `entries-files/${entryDir}/css/`;
        // const entryJsDir = `entries-files/${entryDir}/js/`;
        
        try {
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

                if (singleEntry) {
                    if (entry.type !== 'presentation') {
                        entry.__content = sh.makeHtml(entry.__content);
                        entry.__content = entry.__content.replace(
                            /(img src=")(.*?)\.(png|gif|jpg)(.*)/g, 
                            `$1entry-files/${entryDir}/img/$2.$3$4`
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
        catch (e) {
            return {
                title: "Error",
                __content: "Not found"
            }
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