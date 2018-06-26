'use strict';

const utils = require('../utils.js');

const entry = {
    method: 'GET',
    path: '/{entry?}',
    config: {
        description: "dynamic serving of a specific entry",
        tags: ['private']
    },
    handler: function (request, h) {

        let file;
        if (request.params['entry']) {
            file = request.params['entry'];
        }
        else {
            file = request.server.app.posts.sortedByDates[0]['file'];
        }
        
        if (file === 'cv') {
            file = 'cv-latest';
        }

        const entryData = utils.getEntry(file, true);
        
        return h.view(
            entryData.type || 'entry', 
            entryData,
            { layout: entryData.layout || 'main' }
        );
    }
};

module.exports = entry;