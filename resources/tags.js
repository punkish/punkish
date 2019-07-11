'use strict';

// const moment = require('moment');
// const utils = require('../utils.js');
// const toTitleCase = function(str) {
//     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// };

module.exports = {
    method: 'GET',

    path: '/tags',

    config: {
        description: "list all tags",
        tags: ['private']
    },

    handler: function (request, h) {

        return h.view(
            'index-of-tags',                        // content template
            entryData,                              // data
            { layout: entryData.layout || 'combo' } // layout
        ); 
    }
};