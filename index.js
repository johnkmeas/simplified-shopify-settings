"use strict";
const yaml = require('js-yaml');
const stringify = require("json-stringify-pretty-compact");
const fs  = require('fs');
const fse = require('fs-extra');
const schema = require('./dist-schema-settings/settings_schema.json')
let src = './src-settings-schema/';
let listFiles = new Array();

let string = '';
var initSchema = () =>{
  console.log('es6')
}
initSchema()
fs.readdir(src, (err, files) => {
  files.forEach(file => {
    listFiles.push(file)
  });
  
  for(const [i, item] of listFiles.entries()){
      // console.log('item', item)
      try {
        const file = yaml.load(fs.readFileSync(`${src}${item}`, 'utf8'));
        console.log(stringify(file, {maxLength: 0, indent: 2}));
        let jsondoc = stringify(file, {maxLength: 0, indent: 2})
        
        if(i > 0) {
          string += `,\n`
        }

        string += jsondoc
        
      } catch (e) {
        console.log(e);
      }
  }
  // let json = JSON.parse(string);
  string = `[\n${string}\n]`;

  fse.outputFile('./dist-schema-settings/settings_schema.json', string, function (err) {
    if (err) return console.log(err);
    console.log('complete');
  });
});

// TODO: Create function to invert the operations above so that downloaded schema can be converted and imported into build folder
// console.log(yaml.dump(schema))
