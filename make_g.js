#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( 'cstar -g gyp lib.json > lib.gypi' );
run( 'gyp --depth=. --build=Test --format=make test.gyp' ); 
run( 'make' ); 



