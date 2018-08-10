import path from 'path'
import * as globals from './globals'

let localStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;

  localStorage = new LocalStorage(path.resolve(globals.InstallationDir()+'/dsm/.storage'));
}

export default localStorage

// length
// setItem(key, value)
// getItem(key)
// removeItem(key)
// key(n)
// clear()


// let MyLocalStorage = {}
// export const setItem = MyLocalStorage.setItem = (key, value) => {
//   localStorage.setItem(key, value);
// }
