'use strict';

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

    //path: '/{entry}/{subentry?}',
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
                showHidden: request.query['showHidden'] || false
            });
    
            let template = entry.template || 'entry';
            let layout = entry.layout || 'main';
    
            if (request.query['presentation']) {
                template = 'presentation';
                layout = 'presentation';
            }
            
            return h.view(
                template,               // content template
                entry,                  // data
                { layout: layout }      // layout
            );
        }
        else {
            return h.redirect(request.server.app.posts.byDate[0].name);
        }
        
    }
};