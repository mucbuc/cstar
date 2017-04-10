#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( 'cstar -q qmake cstar-example-opengl.json > cstar-example-opengl.pri' );
run( 'qmake test.pro' ); 
run( 'make' ); 
