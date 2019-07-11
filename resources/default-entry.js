'use strict';

module.exports =  {
    method: 'GET',
    path: '/',
    config: {
        description: "serve the latest entry if no specific entry is requested",
        tags: ['private']
    },
    handler: function (request, h) {

        return h.redirect(request.server.app.posts.byDate[0].name);
    }
};