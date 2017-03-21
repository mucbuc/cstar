#!/usr/bin/env node

'use strict';

const cstar = require( '../api' )
  , Expector = require( 'expector' ).SeqExpector
  , test = require( 'tape' )
  , fs = require( 'fs' )
  , cp = require( 'child_process' )
  , path = require( 'path' );

process.chdir( __dirname );

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

	e.expect( 'SOURCES += src/main.cpp\ninclude(other.pri)\n' );

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

test( 'make gyp include', t => { 

	process.chdir( path.join( __dirname, 'cstar-template-gyp/' ) );

	cstar.makeGYP( './def.json' )
	.then( (gyp) => {
		fs.writeFile( './test.gypi', gyp, (err) => {
			if (err) throw err;
			cp.exec( 'gyp --depth=. ./host.gyp --format=make', (err, stdout, stderr) => {
				if (err) throw err;
				t.equal( stderr.length, 0 );
				cp.exec( 'make test', (err, stdout, stderr) => {
					
					console.log( stderr );
					console.log( stdout );

					if (err) throw err;
					t.equal( stderr.length, 0 );
					t.end();
				});
			});
		});
	})
	.catch( t.fail.bind( t ) );
});

test( 'make qmake include', t => { 
	
	process.chdir( path.join( __dirname, 'cstar-template-qmake/' ) );
	
	cstar.makePRI( './def.json' )
	.then( (pro) => {
		fs.writeFile( './test.pri', pro, (err) => {
			if (err) throw err;
			cp.exec( 'qmake -spec macx-xcode ./host.pro', (err, stdout, stderr) => {
				if (err) throw err;
				t.equal( stderr.length, 0 );
				t.end();
			});
		});
	})
	.catch( t.fail.bind( t ) );
});

test( 'make CMake include', t => { 

	process.chdir( path.join( __dirname, 'cstar-template-cmake/' ) );

	cstar.makeCMake( './def.json' )
	.then( (cmake) => {
		fs.writeFile( './test.txt', cmake, (err) => {
			if (err) throw err;
			cp.exec( 'cmake .', (err, stdout, stderr) => {
				if (err) throw err;
				t.equal( stderr.length, 0 );
				cp.exec( 'make', (err, stdout, stderr) => {
					if (err) throw err;
					t.equal( stderr.length, 0 );
					t.end();
				});
			});
		});
	})
	.catch( t.fail.bind( t ) );
});




