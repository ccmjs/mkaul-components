/**
 * @overview modifier for directories and files of a new component
 *           in order to turn relative paths into absolute paths
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

const fs = require('fs');
const path = require('path');

const component_name = 'form';
const author = 'Manfred Kaul <manfred.kaul@h-brs.de> 2017';

const replacements = {
  "'resources/": "'//kaul.inf.h-brs.de/data/ccm/form/resources/",
  "'./resources/": "'//kaul.inf.h-brs.de/data/ccm/form/resources/",
  "'../": "'//kaul.inf.h-brs.de/data/ccm/"
};

walk(path.join('..' + path.sep + component_name), function(err, results) {
  if (err) throw err;
  results.map(function ( someFile ) {
    replace( someFile );
  });
});



/*
 * RE( someString ) returns the regular expression escaping special chars
 * e.g. dot is any char in RegExp, therefore dot has to be escaped for turning it into a regexp
 */
function RE( someString ) {
  // dot matches any char in RegExp
  return someString.replace(/([.|$*+?[\]()]|\\|\^|]|-)/g, "[$1]")
}


// https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
function replace( someFile ){
  let count = 0;
  fs.readFile(someFile, 'utf8', function (err1,data) {
    if (err1) throw err1;
  
    Object.keys( replacements ).map(function ( find ) {
      let regexp = new RegExp( RE( find ), 'g');
      let splitted_array = data.split(regexp);
      count += splitted_array.length - 1;
      data = splitted_array.join( replacements[ find ] );
    });
  
    if ( count ){
      fs.writeFile(someFile, data, 'utf8', function (err2) {
        if (err2) throw err2;
        console.log(count + ' replacements in ' + someFile);
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