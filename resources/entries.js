'use strict';

const moment = require('moment');
const utils = require('../utils.js');

const entries = {
    method: 'GET',

    /*
     *
     * /entries<?by=dates>
     * /entries?q=<searchterm>
     * /entries?by=tags
     * 
     */

    path: '/entries',

    config: {
        description: "dynamic serving of list of entries by either tags or dates",
        tags: ['private']
    },

    handler: function (request, h) {

        let template;
        let data = {
            'created': moment().format('MMM DD, YYYY')
        };
        let layout = 'main';

        if (request.query['by']) {

            let by = request.query['by'];
            if (by.indexOf('tags') > -1) {
                by = by.replace('tags', 'tag');

            }
            else if (by.indexOf('dates') > -1) {
                by = by.replace('dates', 'date');
            }

            template = `entries-by-${by}`;
            data['years'] = request.server.app.posts['byYears'];

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

            
        }
        else if (request.query['q']) {

            let q = request.query['q'];
            if (q.indexOf('tag:') > -1) {
                q = q.replace('tag:', 'tags:');
            }

            template = 'search';
            data['searchTitle'] = 'Search Results';
            data['searchResults'] = utils.idx.search(q).map(function(result) {
                return {
                    ref : result.ref,
                    disp : result.ref.replace(/-/g, ' ')
                }
            });
        }
        else {
            template = 'entries-by-date';
            data['posts'] = request.server.app.posts['byDate'];
        }

        return h.view(

            // content template
            template, 

            // data
            data,

            // layout
            { layout: layout }
        );
        
    }
};

module.exports = entries;