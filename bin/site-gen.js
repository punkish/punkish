'use strict'

const Walker = require('walker')
const fs = require('fs')
const path = require('path')
const root = 'entries'

Walker(root)
    // .filterDir(function(dir, stat) {
    //     if (dir === '/etc/pam.d') {
    //         console.warn('Skipping /etc/pam.d and children')
    //         return false
    //     }
    //     return true
    // })
    // .on('entry', function(entry, stat) {
    //     console.log('Got entry: ' + entry)
    // })
    .on('dir', function(dir, stat) {
        //console.log('Got directory: ' + dir)
        const check = fs.existsSync(`${dir}/index.md`)
 
        if (check) {
            console.log(dir)
        }
    })
    // .on('file', function(file, stat) {
    //     if (path.extname(file) === '.md') {
    //         console.log(path.basename(file))
    //     }
    // })
    // .on('symlink', function(symlink, stat) {
    //     console.log('Got symlink: ' + symlink)
    // })
    // .on('blockDevice', function(blockDevice, stat) {
    //     console.log('Got blockDevice: ' + blockDevice)
    // })
    // .on('fifo', function(fifo, stat) {
    //     console.log('Got fifo: ' + fifo)
    // })
    // .on('socket', function(socket, stat) {
    //     console.log('Got socket: ' + socket)
    // })
    // .on('characterDevice', function(characterDevice, stat) {
    //     console.log('Got characterDevice: ' + characterDevice)
    // })
    // .on('error', function(er, entry, stat) {
    //     console.log('Got error ' + er + ' on entry ' + entry)
    // })
    .on('end', function() {
        console.log('All files traversed.')
    })