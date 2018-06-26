// This is for serving the static files in the public directory

const inert = {
    method: 'GET',

    path: '/{param*}',

    config: {
        description: "static files for the website",
        tags: ['private']
    },

    handler: {
        directory: {
            path: './public',
            redirectToSlash: true,
            index: true
        }
    }
};

module.exports = inert;