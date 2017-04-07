#!/usr/bin/env node

'use strict';

const program = require( 'commander' )
  , assert = require( 'assert' )
  , filebase = require( 'mucbuc-filebase' )
  , list = filebase.list
  , compose = filebase.compose
  , cstar = require( './api' );

assert( typeof program !== 'undefined' );
assert( typeof compose !== 'undefined' );
assert( typeof compose !== 'undefined' );

program
	.version( '0.0.2' )
	.option( '-b, --branches', 'list branches' )
	.option( '-g, --gyp [branch]', 'generate gyp file' )
	.option( '-c, --cmake [branch]', 'generate cmake file' )
	.option( '-q, --qmake [branch]', 'generate qmake file')
	.option( '-e, --export [branch]', 'cstar file' );

program.parse(process.argv);

const defPath = program.args[0];

if (program.branches) {
	list(defPath)
	.then(print)
	.catch(printError);
}
else if (program.gyp) {
	cstar
	.makeGYP(defPath, program.gyp)
	.then(print)
	.catch(printError);
}
else if (program.cmake) {
	cstar
	.makeCMake(defPath, program.cmake)
	.then(print)
	.catch(printError);
}
else if (program.qmake) {
	cstar
	.makePRI(defPath, program.qmake)
	.then(print)
	.catch(printError);
}
else {
	compose(defPath, program.export)
	.then(print)
	.catch(printError);
}

function print(result) {
	console.log( result );
}

function printError(err) {
	console.error(err);
}
