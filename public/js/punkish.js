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
    }
};