const dir = {
    entries: './entries',
    t: './views',
    tl: `./views/layouts`,
    tp: `./views/partials`,
    docs: './docs',
    hanozDir: './docs/Hanoz'
};

const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};

const baseUrl = '';

const stopWords = new Set([
    'and', 'or', 'to', 'in', 'a', 'the', /* ...and more */ 
]);

const minisearchOpts = {

    // fields to index for full-text search
    fields: ['title', 'name', 'text'],

    processTerm: (term, _fieldName) => stopWords.has(term) 
        ? null 
        : term.toLowerCase(),

    searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2
    },

    // fields to return with search results
    storeFields: ['title', 'name']
}

const untaggedLabel = 'untagged';

export {
    dir,
    dateOptions,
    baseUrl,
    minisearchOpts,
    untaggedLabel
}