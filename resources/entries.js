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
            data['posts'] = request.server.app.posts['by' + utils.toTitleCase(by)];
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