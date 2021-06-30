let PK = {

    //A poor person's jQuery-type $ selector
    $: function(el) {
        if (el.substr(0, 1) === "#") {
            return document.getElementById(el.substr(1));
        }
        else if (el.substr(0, 1) === ".") {
            return document.getElementsByClassName(el.substr(1));
        }
        else if (el.substr(0, 2) === "n:") {
            return document.getElementsByName(el.split(":")[1]);
        }
        else {
            return document.getElementsByTagName(el);
        }
    },

    currentYPosition: function() {

        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
    
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
    
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    },

    smoothScroll: function (stopY) {
        var startY = this.currentYPosition();
        var distance = stopY > startY ? stopY - startY : startY - stopY;
    
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
    
        var speed = Math.round(distance / 100);
        if (speed >= 10) speed = 10;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i=startY; i<stopY; i+=step) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            }
            return;
        }
    
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY; timer++;
        }
    },

    translateThis: function(e) {
        if (this.dataset.key === '') {
            this.dataset.key = this.innerHTML;
            this.innerHTML = this.dataset.val;
        }
        else {
            var tmp = this.dataset.key;
            this.dataset.key = this.innerHTML;
            this.innerHTML = tmp;
        }
        e.preventDefault();
        e.stopPropagation();
    },

    initializeDictionary: function() {
        var pairs = document.getElementsByClassName('punkish-pair');
        for (var i=0, j=pairs.length; i<j; i++) {
            pairs[i].onclick = PK.translateThis;
        }
    },

    xhr: function(url, callback) {
        const x = new XMLHttpRequest();
        x.overrideMimeType("application/json");
        x.open("GET", url, true);
        x.onreadystatechange = function() {
            if (x.readyState === 4 && x.status == "200") {
                callback(x.responseText);
            }
        };
        x.send(null);
    },

    autocomplete: function() {
        new autoComplete({
            selector: document.querySelector('input[name=q]'),
            minChars: 3,
            source: function(term, response){
                PK.xhr(`/entries/${term}`, function(data) {
                    response(JSON.parse(data)); 
                });
            },
            renderItem: function (item, search){
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return `<div class="autocomplete-suggestion" data-val="${item[1]}">${item[0].replace(re, "<b>$1</b>")}</div>`;
            },
            onSelect: function(e, term, item) {
                location.href = `/${term}`;
            }
        });
    },

    searchInPage: function() {
        
        const tags = document.getElementsByClassName("tag");

        function s(str) {
            for (let i=0, j=tags.length; i<j; i++) {
                const ix = tags[i].innerText.indexOf(str);
                tags[i].parentElement.style.display = ix == -1 ? 'none' : 'block';
            }
        }

        const inp = document.getElementsByName('tag');
        s(inp[0].value);
    }
};