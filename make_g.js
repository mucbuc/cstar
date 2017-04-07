#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( 'cstar.js -g gyp lib.json > lib.gypi' );
run( 'gyp --depth=. --build=Test --format=make test.gyp' ); 
run( 'make' ); 



