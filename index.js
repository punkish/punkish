'use strict';

const Hapi = require('hapi');

// blipp is a simple hapi plugin to display the routes table at startup
const Blipp = require('blipp');

// Static file and directory handlers for hapi.js
const Inert = require('inert');

// Templates rendering support for hapi.js
const Vision = require('vision');

const Handlebars = require('handlebars');

// hapi process monitoring
const Good = require('good');
const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./test/fixtures/awesome_log']
        }],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
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

    server.app.posts = utils.init();

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
        require('./resources/entries-files.js'),
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