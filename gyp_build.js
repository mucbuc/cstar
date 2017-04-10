#!/usr/bin/env node

'use strict';

const run = require( 'runjs' ).run;

run( 'cstar -g gyp cstar-example-opengl.json > cstar-example-opengl.gypi' );
run( 'gyp --depth=. --build=Test --format=make test.gyp' ); 
