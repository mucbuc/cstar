#!/usr/bin/env node

'use strict';

const assert = require( 'assert' )
  , filebase = require( 'mucbuc-filebase' )
  , list = filebase.list
  , compose = filebase.compose
  , cstar = require( './api' );

assert( typeof compose !== 'undefined' );

if (module.parent) {
	module.exports = cstar;
	return; 
}

const argv = require( 'yargs' ).argv;
if (argv._.indexOf('list') != -1)
{
	const defPath = argv._[argv._.length - 1];

	list(defPath)
	.then(print)
	.catch(printError);
}
else if (argv._.indexOf( 'export' ) != -1)
{
	const defPath = argv._[argv._.length - 1]
	  , branch = argv._[1];
	
	compose(defPath, branch)
	.then(print)
	.catch(printError);	
}
else if (argv._.indexOf( 'generate' ) != -1)
{
	const defPath = argv._[argv._.length - 1]
	  , branch = argv._[1];

	if (argv._.indexOf('gyp') != -1)
	{
		cstar
		.makeGYP(defPath, branch)
		.then(print)
		.catch(printError);
	}
	else if (argv._.indexOf('cmake') != -1)
	{
		cstar
		.makeCMake(defPath, branch)
		.then(print)
		.catch(printError);
	}
	else if (argv._.indexOf('qmake') != -1)
	{
		cstar
		.makePRI(defPath, branch)
		.then(print)
		.catch(printError);
	}
}

function print(result) {
	console.log( result );
}

function printError(err) {
	console.error(err);
}
