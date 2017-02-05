#!/usr/bin/env node
'use strict';
const compose = require( './node_modules/filebase/compose' )

function makeGYP( defPath ) {
  return new Promise( (resolve, reject) => {
    compose( defPath )
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

module.exports = makeGYP;