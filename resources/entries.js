'use strict';

const moment = require('moment');
const utils = require('../utils.js');
const toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const entries = {
    method: 'GET',

    path: '/entries',

    config: {
        description: "dynamic serving of list of entries by either tags or dates",
        tags: ['private']
    },

    handler: function (request, h) {

        
        if (request.query.sortedBy) {
            return h.view(
                `index-by-${request.query.sortedBy}`, 
                {
                    posts: request.server.app.posts['sortedBy' + toTitleCase(request.query.sortedBy)],
                    created: moment().format('MMM DD, YYYY')
                },
                { layout: 'main' }
            );
        }
        else {
            return h.view(
                `index-of-entries`, 
                {
                    created: moment().format('MMM DD, YYYY')
                },
                { layout: 'main' }
            );
        }
        
    }
};

module.exports = entries;
