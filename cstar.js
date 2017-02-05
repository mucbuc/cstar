#!/usr/bin/env node
'use strict';
const compose = require( './node_modules/filebase/compose' )

function makeGYP( defPath, target ) {
  return new Promise( (resolve, reject) => {
    compose( defPath, target )
    .then( result => {
      let gypi = { target_defaults: {} };

      if (result.hasOwnProperty('config')) {
        gypi.includes = Array.isArray(result.config) ? result.config : [result.config];
      }

      if (result.hasOwnProperty('sources')) {
        gypi.target_defaults.sources = Array.isArray(result.sources) ? result.sources : [result.sources];
      }
      resolve( gypi );
    });
  });
}

function makePRI( defPath, target ) { 
  return new Promise( (resolve, reject) => {
    compose( defPath, target )
    .then( result => {
      let pri = 'SOURCES =';
      for (let file in result.sources) {
        pri += ' ' + result.sources[file];
      }

      if (result.hasOwnProperty('config')) {
        pri += '\n';
        for (let conf in result.config) {
          pri += 'include(' + result.config[conf] + ')\n';
        }
      }

      resolve(pri);
    });
  });
}

function makeCMake( defPath, target ) {
  return new Promise( (resolve, reject) => {
    resolve( {} );
  });
  // config => include(file)      //https://cmake.org/cmake/help/v3.0/command/include.html
  
  // source => add_executable( TARGET, source)
}



module.exports = { 
  makeGYP: makeGYP,
  makePRI: makePRI, 
  makeCMake: makeCMake
};