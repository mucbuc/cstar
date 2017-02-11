
'use strict';
const assert = require( 'assert' )
  , compose = require( './node_modules/filebase/compose' )

assert( typeof compose !== 'undefined' );

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
      resolve( JSON.stringify(gypi, null, 2) );
    })
    .catch( reject );
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
    compose( defPath, target )
    .then( result => {
      let cmake = 'add_executable(host ' + result.sources.join( ' ' ) + ')';


      // result.config.forEach( ... )
      cmake += '\ninclude(other.txt)';
      cmake += '\n';
      resolve( cmake );
    });
  });
  // config => include(file)      //https://cmake.org/cmake/help/v3.0/command/include.html
  
  // source => add_executable( TARGET, source)
}



module.exports = { 
  makeGYP: makeGYP,
  makePRI: makePRI, 
  makeCMake: makeCMake
};