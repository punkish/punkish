const foo = function() {
    document.getElementById('createHash').addEventListener('click', function() {
        document.getElementById('textStringHash').innerHTML = CryptoJS.SHA256(
            document.querySelector('input[name="textString"]').value
        );
    });
};
