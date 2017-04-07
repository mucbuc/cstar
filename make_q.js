#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( 'cstar -q qmake lib.json > lib.pri' );
run( 'qmake test.pro' ); 
run( 'make' ); 

