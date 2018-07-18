'use strict';

const utils = require('../utils.js');

const defaultEntry = {
    method: 'GET',
    path: '/',
    config: {
        description: "dynamic serving of a specific entry",
        tags: ['private']
    },
    handler: function (request, h) {

        const file = request.server.app.posts.sortedByDates[0]['file'];
        const entryData = utils.getEntry({
            file: file, 
            queryParam: null, 
            singleEntry: true
        });
        
        return h.view(
            entryData.type || 'entry', 
            entryData,
            { layout: entryData.layout || 'main' }
        );
    }
};

module.exports = defaultEntry;