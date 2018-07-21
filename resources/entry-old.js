'use strict';

const utils = require('../utils.js');

const entry = {
    method: 'GET',
    path: '/{entry}',
    config: {
        description: "dynamic serving of a specific entry",
        tags: ['private']
    },
    handler: function (request, h) {

        let file = request.params['entry'];
        
        if (file === 'cv') {
            file = 'cv-latest';
        }

        let queryParam = '';
        if (request.query) {
            queryParam = Object.keys(request.query)[0];
        }

        const entryData = utils.getEntry({
            file: file, 
            queryParam: queryParam, 
            singleEntry: true
        });

        return h.view(

            // content template
            entryData.type || 'entry', 

            // data
            entryData,

            // layout
            { layout: entryData.layout || 'combo' }
        );
    }
};

module.exports = entry;