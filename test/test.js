#!/usr/bin/env node

'use strict';

const cstar = require( '../cstar' )
  , Expector = require( 'expector' ).SeqExpector
  , test = require( 'tape' )
  , fs = require( 'fs' )
  , cp = require( 'child_process' );

test( 'compose gypi', t => {
	let e = new Expector( t );

	e.expect( { target_defaults:{ sources: ["src/main.cpp"]}, includes: ["targets.gypi"]} );

	cstar.makeGYP( './def_gyp.json' )
	.then( gypi => {
		e.emit( gypi ).check();
	});
});

test( 'compose pri', t => {
	let e = new Expector( t );

	e.expect( 'SOURCES = src/main.cpp\ninclude(other.pri)\n' );

	cstar.makePRI( './def_pri.json' )
	.then( pri => {
		e.emit( pri ).check();
	});
});

test( 'compose cmake', t => {
	let e = new Expector( t );

	e.expect( 'done ');

	cstar.makeCMake( './def_cmake.json' )
	.then( () => {
		e.emit( 'done ' ).check();
	});
});

test( 'make project', t => { 
	let e = new Expector( t ); 

	e.expect( '' );

	cstar.makeGYP( './def_gyp.json' )
	.then( (gyp) => {
		fs.writeFile( './test.gypi', JSON.stringify( gyp, null, 2 ), (err) => {
			if (err) throw err;
			cp.exec( 'gyp --depth=0 host.gyp', (err, stdout, stderr) => {
				if (err) throw err;
				e.emit(stdout).check();
			});
		});
	});
});