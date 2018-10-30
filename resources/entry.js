'use strict';

const utils = require('../utils.js');
const redirects = {
    'Circle-whose-center-is_everywhere': 'Circle-whose-center-is-everywhere',
    'Hong-Kong-Bay-Red-Tide-Data': 'Hong-Kong-Bay-Water-Quality-Data'
};
const renames = {
    'cv': 'cv-latest'
};

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
        if (file in redirects) {

            return h.redirect(`/${redirects[file]}`);
        }
        else if (file in renames) {

            file = renames[file];
        }

        const subfile = request.params['subentry'] || false;
        const presentation = request.query['presentation'] || false;
        const showHidden = request.query['showHidden'] || false;

        const entryData = utils.getSingleEntry({
            file: file, 
            subfile: subfile,
            presentation: presentation, 
            showHidden: showHidden
        });
        
        return h.view(

            // content template
            entryData.template || 'entry', 

            // data
            entryData,

            // layout
            { layout: entryData.layout || 'main' }
        );
    }
};

module.exports = entry;