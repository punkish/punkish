'use strict'

const path = require('path')
const f = 'entries/Y/YI/YI-/Yi-Fu-Tuan/index.md'

const {root, dir, base, ext, name} = path.parse(f)

console.log(root, dir, base, ext, name)

const entry = {}

if (path.basename(f) === 'index.md') {
    entry.name = path.dirname(f).split('/')[4]
    entry.dir = 
}

