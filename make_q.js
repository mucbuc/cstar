#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( './node_modules/cstar/cstar.js -q qmake lib.json > lib.pri' );
run( 'qmake test.pro' ); 
run( 'make' ); 

