'use strict';

/*

Compile templates
    ~/Projects/punkish$ node_modules/hogan.js/bin/hulk -o public/js/templates/ views/partials/*.hjs

Start this program from the command line with `pm2`

    ~/Nodes/punkish$ NODE_ENV=production pm2 start index.js --name punkish
    ~/Nodes/punkish$ NODE_ENV=production pm2 restart index.js

To sync images and other binary files, run `rsync` from within 'punkish'

    ~Projects/punkish$ rsync -azPv --exclude-from exclude.txt ../punkish lko:/home/punkish/Nodes/

*/

const Hapi = require('@hapi/hapi');

// blipp is a simple hapi plugin to display the routes table at startup
const Blipp = require('blipp');

// Static file and directory handlers for hapi.js
const Inert = require('@hapi/inert');

// Templates rendering support for hapi.js
const Vision = require('@hapi/vision');

const Handlebars = require('handlebars');

// hapi process monitoring
const Good = require('@hapi/good');
const goodOptions = {
    ops: { interval: 1000 },
    reporters: {
        myConsoleReporter: [
            {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            }, 
            {
                module: 'good-console'
            }, 
            'stdout'
        ]
    }
};

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const utils = require('./utils.js');

const init = async () => {

    await server.register([
        Inert,
        Blipp,
        Vision,
        { plugin: Good, goodOptions }
    ]);

    server.app.entries = utils.init();
    //console.log(server.app.posts.byDate);

    server.views({
        engines: { html: Handlebars },
        relativeTo: __dirname,
        path: './views',
        layoutPath: './views/layouts',
        partialsPath: './views/partials',
        //layout: 'main',
        //helpersPath: './templates/helpers'
        isCached: false
    });
    
    server.route([
        require('./resources/public.js'),
        require('./resources/entry-files.js'),
        require('./resources/node-files.js'),
        require('./resources/entries.js'),
        require('./resources/entry.js')
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();