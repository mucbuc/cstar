#!/usr/bin/env node

'use strict';

const compose = require( '../node_modules/filebase/compose' )
  , Expector = require( 'expector' ).SeqExpector
  , test = require( 'tape' )

test( 'compose', t => {

	let e = new Expector( t );

	e.expect( { target_defaults:{ sources: ["src/main.cpp"]}, includes: ["targets.gypi"]} );

	compose( './def.json' )
	.then( result => {
		var gypi = {
			target_defaults: {}
		};

		if (result.hasOwnProperty('config')) {
			gypi.includes = Array.isArray(result.config) ? result.config : [result.config];
		}

		if (result.hasOwnProperty('sources')) {
			gypi.target_defaults.sources = Array.isArray(result.sources) ? result.sources : [result.sources];
		}

		e.emit( gypi ).check();
	});
});
