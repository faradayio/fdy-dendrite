#!/usr/bin/env node

"use strict"
let fs = require('fs');
let csv = require('fast-csv');
let through2 = require('through2').obj;
let commandLineArgs = require('command-line-args')

let optionDefinitions = [
  { name: 'input', alias: 'i', type: String },
  { name: 'output', alias: 'o', type: String },
  { name: 'field', alias: 'f', type: String }
]

let options = commandLineArgs(optionDefinitions)

// params
let inputFile = options.input
let outputFile = options.output || 'out_' + inputFile
let fieldName = options.field
let splitPattern = options.pattern

if (options.input) {
  console.log('Processing ' + options.input)
} else {
  console.log('Please specify an input file')
  exit()
}

csv
  .fromPath(inputFile, {objectMode: true, headers: true})
  .pipe(through2(function(row,enc,callback){
    let splits = row[fieldName].split(/ and | & |,/)
    for (let i = 0;i < splits.length; i++) {
      let replicate = row
      row[fieldName] = splits[i]
      this.push(replicate)
    }
    callback();
  }))
  .pipe(csv.createWriteStream({headers: true}))
  .pipe(fs.createWriteStream(outputFile))
  .on('finish', function(){
    console.log('Finished splitting file "' + outputFile + '"')
  });