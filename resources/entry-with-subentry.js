'use strict';

const utils = require('../utils.js');

const entry = {
    method: 'GET',
    path: '/{entry}/{subentry?}',
    config: {
        description: "dynamic serving of a specific entry",
        tags: ['private']
    },
    handler: function (request, h) {

        let file = request.server.app.posts.sortedByDates[0]['file'];
        let subfile;

        if (request.params['entry']) {
            file = request.params['entry'];

            if (request.params['subentry']) {
                subfile = request.params['subentry'];
            }
        }
        
        if (file === 'cv') {
            file = 'cv-latest';
        }

        const entryData = utils.getEntry(file, subfile, true);
        
        return h.view(
            entryData.type || 'entry', 
            entryData,
            // { layout: entryData.layout || 'main' }
            { layout: entryData.layout || 'combo' }
        );
    }
};

module.exports = entry;