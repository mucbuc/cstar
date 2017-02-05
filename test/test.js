#!/usr/bin/env node

'use strict';

const cstar = require( '../cstar' )
  , Expector = require( 'expector' ).SeqExpector
  , test = require( 'tape' )

test( 'compose gypi', t => {
	let e = new Expector( t );

	e.expect( { target_defaults:{ sources: ["src/main.cpp"]}, includes: ["targets.gypi"]} );

	cstar.makeGYP( './def.json', 'gyp' )
	.then( gypi => {
		e.emit( gypi ).check();
	});
});

test( 'compose pri', t => {
	let e = new Expector( t );

	e.expect( 'SOURCES = src/main.cpp\ninclude(targets.gypi)\n' );

	cstar.makePRI( './def.json' )
	.then( pri => {
		e.emit( pri ).check();
	});
});

test( 'compose cmake', t => {
	let e = new Expector( t );

	e.expect( 'done ');

	cstar.makeCMake( './def.json' )
	.then( () => {
		e.emit( 'done ' ).check();
	});
});