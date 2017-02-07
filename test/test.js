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
		e.emit( JSON.parse(gypi) ).check();
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

test( 'make gyp project', t => { 
	let e = new Expector( t ); 

	e.expect( '' );

	cstar.makeGYP( './def_gyp.json' )
	.then( (gyp) => {
		fs.writeFile( './test.gypi', gyp, (err) => {
			if (err) throw err;
			cp.exec( 'gyp --depth=0 host.gyp', (err, stdout, stderr) => {
				if (err) throw err;
				e.emit(stdout).check();
			});
		});
	});
});

test( 'make PRO project', t => { 
	let e = new Expector( t ); 

	e.expect( '' );

	cstar.makePRI( './def_pri.json' )
	.then( (pro) => {
		fs.writeFile( './test.pro', pro, (err) => {
			if (err) throw err;
			cp.exec( '~/Qt/5.5/clang_64/bin/qmake -spec macx-xcode host.pro', (err, stdout, stderr) => {
				if (err) throw err;
				e.emit(stdout).check();
			});
		});
	});
});

test.only( 'make CMake project', t => { 
	let e = new Expector( t ); 

	e.expect( "-- Configuring done\n-- Generating done\n-- Build files have been written to: /Users/markymark/work/cstar/test\n" );

	cstar.makeCMake( './def_cmake.json' )
	.then( (cmake) => {
		console.log( cmake );
		//fs.writeFile( './test.txt', cmake, (err) => {
			//if (err) throw err;
			cp.exec( 'cmake . -G "Xcode"', (err, stdout, stderr) => {
				if (err) throw err;
				e.emit(stdout).check();
			});
		//});
	});
});




