const BC = {
    initS1: function() {
        document.getElementById('createHash').addEventListener('click', function() {
            let hash = document.getElementById('textStringHash').innerHTML;
            hash = hash + '<br>' + CryptoJS.SHA256(document.querySelector('input[name="textString"]').value);
            document.getElementById('textStringHash').innerHTML = hash;
        });
    },

    initS2: function(pow) {
        const n = document.querySelector('input[name="name"]').value;
        const d = document.querySelector('input[name="diastolic"]').value;
        const s = document.querySelector('input[name="systolic"]').value;
        const data = {"name": n, "bloodpressure": { "diastolic": d, "systolic": s}};
        const b = document.querySelector('button[name="submit"]');

        b.addEventListener('click', function() {
            bc.addBlock(data, pow);
        })
    },
};