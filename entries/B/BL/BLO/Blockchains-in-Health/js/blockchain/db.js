const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('bc.json');
const db = low(adapter);

//db.read();
const foo = db.get('bc.chain').value();
console.log(foo.length)
//db.get('bc.chain[0].name').last()

// const state = db.getState()
// const str = JSON.stringify(state, null, 2)
// console.log(str)

// db.has('bc')
//   .value();

// Set some defaults (required if your JSON file is empty)
// db.defaults(bc).write();

// Add a post
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()

// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()
  
// // Increment count
// db.update('count', n => n + 1)
//   .write()

//module.exports = db;

// db.get( 'chain' )
//     .write();