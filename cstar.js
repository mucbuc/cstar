#!/usr/bin/env node

const compose = require( './node_modules/filebase/compose' );

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

	console.log( JSON.stringify( gypi, null, 2 ) );
});
