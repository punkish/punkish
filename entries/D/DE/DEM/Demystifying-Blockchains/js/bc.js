const BC = {
    initS1: function() {
        document.getElementById('createHash').addEventListener('click', function() {
            let hash = document.getElementById('textStringHash').innerHTML;
            //hash = hash + '<br>' + CryptoJS.SHA256(document.querySelector('input[name="textString"]').value);
            hash = hash + '<br>' + CryptoJS.SHA256(document.querySelector('textarea[name="textString"]').value);
            document.getElementById('textStringHash').innerHTML = hash;
        });
    },

    initS2: function() {
        const n = document.querySelector('input[name="name"]');
        const d = document.querySelector('input[name="diastolic"]');
        const s = document.querySelector('input[name="systolic"]');

        const b = document.querySelector('button[name="submit"]');

        const pow = document.getElementById('pow');
        const nd = document.querySelectorAll('.newdata');

        function clearInput() {
            n.value = '';
            d.value = '';
            s.value = '';
        }

        b.addEventListener('click', function() {
            const data = {"name": n.value, "bloodpressure": { "diastolic": d.value, "systolic": s.value}};
            bc.addBlock(data, pow, nd, clearInput);
        })
    },

    validate: function() {
        const v = document.getElementById('validate');
        const vr = document.getElementById('validationResult');

        v.addEventListener('click', function() {
            vr.innerHTML = 'chain is ' + (bc.chainIsValid() ? 'valid' : 'not valid');
        })
    },

    revalidate: function() {
        const v = document.getElementById('revalidate');
        const vr = document.getElementById('revalidationResult');
        const td = document.getElementById('tamperedData');

        v.addEventListener('click', function() {
            bc.chain = JSON.parse(td.innerText);
            vr.innerHTML = 'chain is ' + (bc.chainIsValid() ? 'valid' : 'not valid');
        })
    },

    oneDetailOneClick: function() {

        // Fetch all the details element.
        const details = Array.from(document.querySelectorAll("details"));

        // Add the onclick listeners.
        details.forEach((targetDetail) => {
            targetDetail.addEventListener("click", () => {

                // Close all the details that are not targetDetail.
                details.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute("open");
                    }
                });
            });
        });
    },

    latestBtcTxns: function(div) {
        const url = 'https://api.blockchain.info/charts/transactions-per-second?timespan=1hour&format=json&cors=true';

        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        // https://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table
        // JSON to HTML table
        var _table_ = document.createElement('table'),
            _tr_ = document.createElement('tr'),
            _th_ = document.createElement('th'),
            _td_ = document.createElement('td');

        // Builds the HTML Table out of myList json data from Ivy restful service.
        function buildHtmlTable(arr) {
            var table = _table_.cloneNode(false),
                columns = addAllColumnHeaders(arr, table);
            for (var i=0, maxi=arr.length; i < maxi; ++i) {
                var tr = _tr_.cloneNode(false);
                for (var j=0, maxj=columns.length; j < maxj ; ++j) {
                    var td = _td_.cloneNode(false);
                        cellValue = arr[i][columns[j]];
                    td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            return table;
        }

        // Adds a header row to the table and returns the set of columns.
        // Need to do union of keys from all records as some records may not contain
        // all records
        function addAllColumnHeaders(arr, table) {
            var columnSet = [],
                tr = _tr_.cloneNode(false);
            for (var i=0, l=arr.length; i < l; i++) {
                for (var key in arr[i]) {
                    if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
                        columnSet.push(key);
                        var th = _th_.cloneNode(false);
                        th.appendChild(document.createTextNode(key));
                        tr.appendChild(th);
                    }
                }
            }
            table.appendChild(tr);
            return columnSet;
        }

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                
                // Success!
                div.innerHTML = JSON.stringify(JSON.parse(request.responseText), null, 2);
            } 
            else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
        };

        request.send();
    }
};
