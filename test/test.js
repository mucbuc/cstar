#!/usr/bin/env node

'use strict';

const cstar = require( '../api' )
  , Expector = require( 'expector' ).SeqExpector
  , test = require( 'tape' )
  , fs = require( 'fs' )
  , cp = require( 'child_process' );

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

	process.chdir( './template/cstar-template-gyp/' );

	cstar.makeGYP( './def.json' )
	.then( (gyp) => {
		fs.writeFile( './test.gypi', gyp, (err) => {
			if (err) throw err;
			cp.exec( 'gyp --depth=. --build=Test ./host.gyp', (err, stdout, stderr) => {
				if (err) throw err;
				t.notEqual( stdout.indexOf( '** BUILD SUCCEEDED **' ), -1 );
				t.end();
			});
		});
	})
	.catch( t.fail.bind( t ) );
});

// need to get qmake on build server
test.only( 'make PRI include', t => { 
	
	process.chdir( './template/cstar-template-pri/' );
	
	cstar.makePRI( './def.json' )
	.then( (pro) => {
		fs.writeFile( './test.pri', pro, (err) => {
			if (err) throw err;
			cp.exec( '~/Qt/5.5/clang_64/bin/qmake -spec macx-xcode ./host.pro', (err, stdout, stderr) => {
				if (err) throw err;
				t.equal( stderr.length, 0 );
				t.end();
			});
		});
	})
	.catch( t.fail.bind( t ) );
});

// install cmake on build server
test.skip( 'make CMake include', t => { 
	let e = new Expector( t ); 

	e.expect( "" );

	cstar.makeCMake( './template/cstar-template-cmake/def.json' )
	.then( (cmake) => {
		fs.writeFile( './template/cstar-template-cmake/test.txt', cmake, (err) => {
			if (err) throw err;
			cp.exec( 'cmake . -G "Xcode"', {cwd: './template/cstar-template-cmake' }, (err, stdout, stderr) => {
				if (err) throw err;
				e.emit( "" ).check();
			});
		});
	});
});




