#!/usr/bin/env node

'use strict';

const program = require( 'commander' )
  , assert = require( 'assert' )
  , list = require( './node_modules/filebase/list' )
  , compose = require( './node_modules/filebase/compose' )
  , cstar = require( './api' );

assert( typeof program !== 'undefined' );

program
	.version( '0.0.0' )
	.option( '-b, --branches', 'list branches' )
	.option( '-g, --gyp [branch]', 'generate gyp file' )
	.option( '-c, --cmake [branch]', 'generate cmake file' )
	.option( '-q, --qmake [branch]', 'generate qmake file'); 

program.parse(process.argv);

const defPath = program.args[0];

if (program.branches) {
	list(defPath).then(print);
}
else if (program.gyp) {
	cstar.makeGYP(defPath).then(print);
}
else if (program.cmake) {
	cstar.makeCMake(defPath).then(print);
}
else if (program.qmake) {
	cstar.makePRI(defPath).then(print);
}
else {
	compose(defPath).then(print);
}

function print(result) {
	console.log( result );
}
