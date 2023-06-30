import fs from 'fs';
import Handlebars from 'handlebars';
import { dir } from './settings.js';

const compileTemplates = function() {
    console.log('compiling templates');

    const templates = { 
        layouts: {}, 
        views: {} 
    };

    const layouts = fs.readdirSync(dir.tl);

    layouts.forEach(l => {
        const layout = l.split('.')[0];
        const fileContent = fs.readFileSync(`${dir.tl}/${l}`, 'utf-8');
        templates.layouts[layout] = Handlebars.compile(fileContent);
    })
    
    const partials = fs.readdirSync(dir.tp);

    partials.forEach(p => {
        const partial = p.split('.')[0];
        const fileContent = fs.readFileSync(`${dir.tp}/${p}`, 'utf-8');
        Handlebars.registerPartial(partial, fileContent);
    })
    
    const views = fs.readdirSync(dir.t);

    views.forEach(v => {
        if (fs.statSync(`${dir.t}/${v}`).isFile()) {
            const view = v.split('.')[0];
            const fileContent = fs.readFileSync(`${dir.t}/${v}`, 'utf-8');
            templates.views[view] = Handlebars.compile(fileContent);
        }
    });

    return templates;
}

const templates = compileTemplates();

const makeVid = function(text, url) {
    url = url ? `${url}/img` : 'img'

    return text.replace(
        /<img src="(.*?)\.(mp4)(.*)/g, 
`<video width="100%" controls poster="img/$1.jpg">
    <source src="${url}/$1.$2" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
</video>`
    )
}

const makeImg = function(text, url) {
    url = url ? `${url}/img` : 'img'
    
    return text.replace(
        /<img src=(.*?)\.(png|gif|jpg)(.*?)title="(.*?)" \/>/g, 
        `<figure>\n\t<img src=${url}/$1.$2$3>\n\t<figcaption>$4</figcaption>\n</figure>`
    )
}

const makeAlbum = function(entry, url) {
    url = url ? `${url}/img` : 'img'
    entry.images = fs.readdirSync(`${entry.dir}/img`)
        .filter(img => {
            const imgExt = img.slice(-4)
            return imgExt == '.png' || imgExt == '.jpg' || imgExt == '.gif'
        })
        .map(img => `${url}/${img}`);
}

export {
    templates,
    makeVid,
    makeImg,
    makeAlbum
}