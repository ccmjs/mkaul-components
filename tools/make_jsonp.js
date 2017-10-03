
const json_path = '../../2017/se1/json';
const exceptions = ['se1_sc.json'];

const fs = require('fs');
const path = require('path');

let number_of_files = 0;

const dir = fs.readdir(json_path, function(err, files){
  if (err) throw err;
  files
    .filter(function (file) {
      for (let i=0; i<exceptions.length; i++) {
        if (exceptions[i] === file) return false;
      }
      if ( file.split('.').pop() !== 'json' ) return false;
      return true;
    })
    .map(function(file){
      fs.readFile(path.join(json_path, file), function (er, data) {
        if (er) throw er;
  
        let filenameparts = file.split('.');
        filenameparts.pop();
        filenameparts.push('js');
        
        let new_contents = 'ccm.files[ "'+ filenameparts.join('.') +'" ] = ';
        new_contents += "\n";
        new_contents += data;
        new_contents += "\n";
        new_contents += ';';
        // delete .json from filename
        
        fs.writeFile(path.join(json_path, filenameparts.join('.')), new_contents, function(e){
          console.log(file, '=>', filenameparts.join('.'));
          if (e) throw e;
          number_of_files += 1;
          if ( number_of_files === files.length ){
            console.log('make_jsonp: Transformed ' + number_of_files + ' json files to jsonp.');
          }
        });
      });
  });
  
});