const entriesFiles = {
    method: 'GET',

    path: '/entry-files/{param*}',

    config: {
        description: "static files specific to an entry",
        tags: ['private']
    },

    handler: {
        directory: {
            path: './entries',
            redirectToSlash: true,
            index: true
        }
    }
};


module.exports = entriesFiles;