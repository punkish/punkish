const entries = [
    { c: '2020-04-24 15:26:00'},
    { c: '2008-07-08 11:46:00'},
    { c: '2013-07-08 11:46:00'}
];

const sortFunc = function(field) {
    return function(a, b) {
        return new Date(b[field]) - new Date(a[field]);
    }
};

entries.sort(sortFunc('c'));
console.log(entries)