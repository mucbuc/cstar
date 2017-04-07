#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( 'cstar.js -q qmake lib.json > lib.pri' );
run( 'qmake test.pro' ); 
run( 'make' ); 

