'use strict';

const log = require('picolog');
const utils = require('../utils.js');
const redirects = {
    'Circle-whose-center-is_everywhere': 'Circle-whose-center-is-everywhere',
    'Hong-Kong-Bay-Red-Tide-Data': 'Hong-Kong-Bay-Water-Quality-Data'
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
            else if (name in renames) {
                name = renames[name];
            }
    
            const entry = utils.getEntry({
                name: name,
                showHidden: request.query['showHidden'] || false,
                displaymode: request.query['presentation'] || 'regular'
            });

            // log.info(`template is ${entry.template}`);
            // log.info(`layout is ${entry.layout}`);

            // let template = entry.template || 'entry';
            // let layout = entry.layout || 'main';
    
            // if (request.query['presentation']) {
            //     if (!entry.template) template = 'presentation';
            //     if (!entry.layout) layout = 'presentation';
            // }

            if (!request.query['presentation']) {
                if (entry.tags && entry.tags.indexOf('presentation') > -1) {
                    entry.layout = 'main';
                    entry.template = 'entry-presentation';
                }
            }
            
            
            return h.view(
                entry.template || 'entry',              // content template
                entry,                                  // data
                { 
                    layout: entry.layout || 'main'      // layout
                }      
            );
        }
        else {
            return h.redirect(request.server.app.entries.byDate[0].name);
        }
        
    }
};