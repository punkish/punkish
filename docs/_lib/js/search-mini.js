//let searchVisible = true; 

// allow us to delay loading json data unless search activated
let firstRun = true;

// targets the <ul>
const list = document.getElementById('searchResults'); 

// first child of search list
let first = list.firstChild; 

// last child of search list
let last = list.lastChild; 

// Did we get any search results?
let resultsAvailable = false; 

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
    storeFields: ['title', 'name', 'text']
}

let miniSearch;

// ==========================================
// execute search as each character is typed
//
// input box for search
const maininput = document.getElementById('q'); 

maininput.onkeyup = function(e) {
    if(firstRun) {

        // loads our json data and builds the search index
        loadSearch(); 
    
        // let's never do this again
        firstRun = false; 
    }

    executeSearch(this.value);
}

async function loadSearch() {
    try {
        const response = await fetch('/_search/searchIdx.json');

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const text = await response.text();
        miniSearch = MiniSearch.loadJSON(text, minisearchOpts);
    } 
    catch (error) {
        console.error(error.message);
    }
}

function executeSearch(term) {
  
    // the actual query being run using miniSearch.js
    let results = miniSearch.search(term); 
    
    // our results bucket
    let searchitems = ''; 

    // no results based on what was typed into the input box
    if (results.length === 0) { 
        resultsAvailable = false;
    } 

    // build our html
    else {

        // https://stackoverflow.com/a/36744732/183692
        // dedupe the results based on permalink
        results = results.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.title === value.title
            ))
        );

        //console.log(`results" ${results.length}`)

        const snippetLength = 400;
        const side = snippetLength / 2;

        results.forEach(item => {
            //console.log(item)
            // item
            // {
            //     "id": 3,
            //     "score": 6.515940421862562,
            //     "terms": ["ge"],
            //     "queryTerms": ["ge"],
            //     "match": {"ge": ["text"]},
            //     "title": "3D Printing",
            //     "name": "3D-Printing",
            //     "text": "\n\n<figure>\n    <img src=\"img/3axis-…"
            //   }

        const terms = item.terms;
        const name = item.name;
        const title = item.title;
        // let text = item.text;

        // terms.forEach(term => {
        //     const re = new RegExp(`(${term})`, 'i');

        //     if (text) {
        //         const matchInfo = text.match(re);
        //         const left = matchInfo.index - side;
        //         const right = matchInfo.index + term.length + side;
        //         text = text.substring(left, right);
        //         text = text.replace(re, '<mark>$1</mark>');
        //     }
            
        // })
        
  
        // searchitems = searchitems + 
        //     `<li>
        //     <a href="/${name}/" tabindex="0">
        //         <h2 class="title">${title}</h2>
        //         <p>${text}…</p>
        //     </a>
        //     </li>`
        // });
        searchitems = searchitems + 
            `<li><a href="/${name}/" tabindex="0">${title}</a></li>`
        });
  
        resultsAvailable = true;
    }
  
    document.getElementById("searchResults").innerHTML = searchitems;
    if (results.length > 0) {

        // first result container — used for checking against keyboard up/down 
        // location
        first = list.firstChild.firstElementChild; 

        // last result container — used for checking against keyboard up/down 
        // location
        last = list.lastChild.firstElementChild; 
    }
}