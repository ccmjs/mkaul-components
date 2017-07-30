/**
 * @overview modifier for directories and files of a new component
 *           in order to turn relative paths into absolute paths
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

const absolute = 'absolute';
const relative = 'relative';
let abs_switch = absolute;

const fs = require('fs');
const path = require('path');

const component_name = 'fine_upload';

const relative_path = '[.]/resources/'; // dot is any char in RegExp
const absolute_path = `https://mkaul.github.io/ccm-components/${component_name}/resources/`;

walk(path.join('..' + path.sep + component_name), function(err, results) {
  if (err) throw err;
  results.map(function (someFile) {
    if ( abs_switch === absolute) {
      replace( someFile, relative_path, absolute_path );
    } else {
      replace( someFile, absolute_path, relative_path );
    }
  });
});


// https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
function replace( someFile, find, replacement ){
  fs.readFile(someFile, 'utf8', function (err1,data) {
    if (err1) throw err1;
    let regexp = new RegExp(find, 'g');
    let count = (data.split(regexp)).length - 1;
    if (count){
      console.log( count + ' replacements in ' + someFile );
      let result = data.replace(regexp, replacement);
      fs.writeFile(someFile, result, 'utf8', function (err2) {
        if (err2) throw err2;
      });
    }
  });
}

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}