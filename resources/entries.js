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
            template = `entries-by-${request.query['by']}`;
            data['posts'] = request.server.app.posts['by' + utils.toTitleCase(request.query['by'])];
        }
        else if (request.query['q']) {
            const q = request.query['q'];
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
