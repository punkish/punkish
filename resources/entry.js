'use strict';

const log = require('picolog');
const utils = require('../utils.js');
const redirects = {
    'Circle-whose-center-is_everywhere': 'Circle-whose-center-is-everywhere',
    'Hong-Kong-Bay-Red-Tide-Data': 'Hong-Kong-Bay-Water-Quality-Data',
    'Importance-of-Data-Dictionary': 'Configuration-Over-Code'
};

const renames = {
    'cv': 'cv-latest'
};

module.exports = {
    method: 'GET',

    path: '/{entry*}',

    config: {
        description: "dynamic serving of a specific entry or a subentry",
        tags: ['private']
    },

    handler: function (request, h) {

        let name = request.params['entry'];

        if (name) {
            if (name in redirects) {

                return h.redirect(`/${redirects[name]}`);
            }
            else {

                if (name in renames) name = renames[name];
                const presentation = request.query['presentation'];

                const entry = utils.getEntry({
                    name: name,
                    showHidden: request.query['showHidden'] || false,
                    displaymode: presentation ? 'presentation' : 'regular'
                });

                if (entry.tags && entry.tags.indexOf('presentation') > -1) {
                    if (presentation) {
                        return h.view(
                            'presentation',
                            entry,
                            { layout: 'presentation' }      
                        );
                    }
                    else {
                        return h.view(
                            'entry-presentation',
                            entry,
                            { layout: 'main' }      
                        );
                    }
                }

            }
            
        }

        // redirect to the latest entry
        else {

            return h.redirect(utils.entries.public.byDate[0].name);
        }
        
    }
};