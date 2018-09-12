'use strict';

const utils = require('../utils.js');

const entry = {
    method: 'GET',

    /*
     *
     * /<Entry>
     * /<Entry>?show=presentation
     * /<Entry>/<Sub-Entry>
     * /<Entry>/<Sub-Entry>?show=presentation
     * 
     */

    path: '/{entry}/{subentry?}',

    config: {
        description: "dynamic serving of a specific entry or a subentry",
        tags: ['private']
    },

    handler: function (request, h) {

        let file = request.params['entry'];

        const redirects = {
            'Circle-whose-center-is_everywhere': 'Circle-whose-center-is-everywhere',
            'Hong-Kong-Bay-Red-Tide-Data': 'Hong-Kong-Bay-Water-Quality-Data'
        };

        const renames = {
            'cv': 'cv-latest'
        };

        if (file in redirects) {

            return h.redirect(`/${redirects[file]}`);
        }
        else if (file in renames) {

            file = renames[file];
        }

        let subfile = request.params['subentry'] || '';

        let queryParam = request.query['show'] || '';

        const entryData = utils.getEntry({
            file: file, 
            subfile: subfile,
            queryParam: queryParam, 
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

module.exports = entry;