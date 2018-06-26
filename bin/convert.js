'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const source = '/Users/punkish/Projects/punkish/public/data';
const target = '/Users/punkish/Projects/pk2/entries';

let count = 0;

const dirWalker = function(start) {
    const files = fs.readdirSync(start);
    let i = 0;
    const j = files.length;
    for (; i < j; i++) {
        const f = files[i];
        const next = start + '/' + f;
        const stats = fs.statSync(next);
        if (stats.isDirectory()) {
            dirWalker(next);
        }
        else if (stats.isFile()) {
            fileProcessor(next);
        }
    }
};

const rewriteFile = function(file) {
    //console.log('reading ' + file);
    const data = fs.readFileSync(file, 'utf8');
    let newFile = '---\n';
    const lines = data.split(/\n/);
    let flag = false;
    let i = 0;
    const j = lines.length;
    for (; i < j; i++) {
        const line = lines[i];
        if (!flag) {
            if (line === '') {
                newFile += '---\n\n';
                flag = true;
            }
            else {
                if (line.substr(0, 4) === 'tags') {
                    newFile += 'tags        :\n    - ' + 
                        line.split(':')[1]
                            .split(',')
                            .map(el => { return el.trim() })
                            .join('\n    - ') + 
                            '\n';
                }
                else {
                    newFile += line + '\n';
                }
            }
        }
        else {
            newFile += line + '\n';
        }
        //console.log(newFile);        
    }
    const f = path.basename(file, '.md');
    const o = f.substr(0, 1).toUpperCase();
    const t = f.substr(0, 2).toUpperCase();
    const r = f.substr(0, 3).toUpperCase();

    const targetFile = `${target}/${o}/${t}/${r}/${f}`;
    const imgDir = `${targetFile}/img`;
    //console.log(`making ${imgDir}`);
    mkdirp.sync(imgDir);
    //console.log(`${target}/${o}/${t}/${r}/${f}`);
    fs.writeFileSync(`${targetFile}/index.md`, newFile);

    try {
        const srcDir = `${source}/${o}/${t}/${r}/${f}`;
        const imgFiles = fs.readdirSync(srcDir);
        let k = 0;
        const l = imgFiles.length;
        for (; k < l; k++) {
            fs.copyFileSync(`${srcDir}/${imgFiles[k]}`, `${imgDir}/${imgFiles[k]}`);
        }
    }
    catch (error) {
        //console.log(error);
    }
    
};

const fileProcessor = function(file) {
    if (path.extname(file) === '.md') {
        count++;
        // if (count > 5) {
        //     return;
        // }

        rewriteFile(file);
    }
};

dirWalker(source);
console.log('processed ' + count + ' files');