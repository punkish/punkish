module.exports = {
    method: 'GET',

    path: '/public/{param*}',

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