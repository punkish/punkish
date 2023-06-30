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

const minisearchOpts = {
    fields: ['title', 'text'],
    storeFields: ['title', 'name'],
    searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2
    }
}

const untaggedLabel = 'untagged';

export {
    dir,
    dateOptions,
    baseUrl,
    minisearchOpts,
    untaggedLabel
}