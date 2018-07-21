'use strict';

const utils = require('../utils.js');

const defaultEntry = {
    method: 'GET',
    path: '/',
    config: {
        description: "serve the latest entry if no specific entry is requested",
        tags: ['private']
    },
    handler: function (request, h) {

        const entryData = utils.getEntry({
            file: request.server.app.posts.byDate[0]['file'], 
            subfile: '',
            queryParam: '', 
            singleEntry: true
        });
        
        return h.view(

            // content template
            entryData.type || 'entry', 

            // data
            entryData,

            // layout
            { layout: entryData.layout || 'main' }
        );
    }
};

module.exports = defaultEntry;