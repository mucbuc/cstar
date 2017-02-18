#!/usr/bin/env node

'use strict';

const program = require( 'commander' )
  , assert = require( 'assert' );

assert( typeof program !== 'undefined' );

program
	.version( '0.0.0' )
	.option( '-s, --sources [branch]', 'list sources for branch [null]', null )
	.option( '-c, --config [branch]', 'list config for branch [null]', null )
	.option( '-o, --only [type]', 'only generate [gyp|cmake|qmake]' );

program.parse(process.argv);

if (program.sources) {
	console.log( 'sources' );
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