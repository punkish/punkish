PK['dataintegrity'] = {
    init: function() {

        const edited = '#555';
        const deleted = 'lightsalmon';
        const added = 'gray';

        hljs.initHighlightLinesOnLoad([
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [
                {start: 3, end: 3, color: edited},     // edited
                {start: 5, end: 5, color: deleted},    // deleted
                {start: 10, end: 10, color: edited},   // edited
                {start: 11, end: 11, color: deleted},  // deleted
                {start: 14, end: 14, color: added},    // added
            ]
        ]);
    }
}