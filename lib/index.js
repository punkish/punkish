import fs from 'fs';
import Handlebars from 'handlebars';

const compileTemplates = function(dir) {
    const templates = { 
        layouts: {}, 
        views: {} 
    };

    ['layouts', 'partials', 'views'].forEach(templateComp => {
        console.log(`compiling ${templateComp}`);
        const files = fs.readdirSync(`${dir}/${templateComp}`);

        files.forEach(file => {
            const comp = file.split('.')[0];
            file = `${dir}/${templateComp}/${file}`;
            const fileContent = fs.readFileSync(file, 'utf-8');

            if (templateComp === 'partials') {
                Handlebars.registerPartial(comp, fileContent);
            }
            else {
                templates[templateComp][comp] = Handlebars.compile(fileContent);
            }
            
        });
    });

    return templates;
}

const makeImgVid = function(text, url) {
    const re = /<img\s+src="(?<path>[^"]+?)\/(?<basename>[^\/".]+)\.(?<ext>[^".]+)"(?<after>[^>]*)>/g;

    const match = (input, path, basename, ext, after) => {
        let img = `<img src="${url}/${path}/${basename}.${ext}" ${after}>`;

        if (ext === 'mp4') {
            img = `<video width="100%" controls poster="img/$1.jpg">
    <source src="${url}/${src}.${ext}" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
</video>`
        }

        return img;
    }

    return text.replace(re, match)
}

const makeAlbum = function(entry, url) {
    url = url ? `${url}/img` : 'img';
    
    entry.images = fs.readdirSync(`${entry.dir}/img`)
        .filter(img => {
            const imgExt = img.slice(-4)
            return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif'
        })
        .map(img => `${url}/${img}`);
}

export { compileTemplates, makeImgVid, makeAlbum }

// const text = `<figure>
//     <img src="img/oo_41617.png" data-frz-src="https://zenodo.org/record/909894/files/oo_41617.png" onload=lzld(this) onerror=lzld(this) width="250px">
//     <figcaption></figcaption>
// </figure>

// <figure>
//     <img src="img/figure.png" data-frz-src="https://zenodo.org/record/1212324/files/figure.png"  onload=lzld(this) onerror=lzld(this) width="250px">
//     <figcaption></figcaption>
// </figure>

// <figure>
//     <img src="img/figure2.png" data-frz-src="https://zenodo.org/record/1212252/files/figure.png" onload=lzld(this) onerror=lzld(this) width="250px">
//     <figcaption></figcaption>
// </figure>

// <figure>
//     <img src="img/figure3.png" data-frz-src="https://zenodo.org/record/1212089/files/figure.png" onload=lzld(this) onerror=lzld(this) width="250px">
//     <figcaption></figcaption>
// </figure>`;
// const url = 'Lazyload';
// console.log(makeImgVid(text, url));