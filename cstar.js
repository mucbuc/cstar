#!/usr/bin/env node

'use strict';

const program = require( 'commander' )
  , assert = require( 'assert' )
  , list = require( './node_modules/filebase/list' )
  , compose = require( './node_modules/filebase/compose' );

assert( typeof program !== 'undefined' );

program
	.version( '0.0.0' )
	.option( '-s, --sources [branch]', 'list sources for branch [null]' )
	.option( '-c, --config [branch]', 'list config for branch [null]' )
	.option( '-b, --branches', 'list branches' )
	.option( '-o, --only [type]', 'only generate [gyp|cmake|qmake]' );

program.parse(process.argv);

if (program.branches) {
	list(process.argv[3])
	.then( result => {
		console.log( result );
	});
}
else if (program.sources) {
	compose(process.argv[3])
	.then( result => {
		console.log( result.sources );
	});
}
else if (program.config) {
	console.log( 'config' );
}
else if (program.only) {
	console.log( 'only' );
}
else {
	console.log( 'else' );
}