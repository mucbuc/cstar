# !!!WIP!!! dont use !!! cstar
c++ source distibution tool

## What problem cstar solves

Integration of C++ source code with build systems is an obstacle to portability and distribution. cstar generates integration files for popular build systems. it also allows for specification of compile and link options for distributing libraries with dependencies.   

## Objective
cstar generates project include files for common build systems ([gyp](https://gyp.gsrc.io/index.md), [qmake](http://doc.qt.io/qt-4.8/qmake-manual.html), [cmake](https://cmake.org/)) from simple project
definition files written in JSON. 

<!-- When writing source to be distributed I can
1) specify files to include and hope that users get the right ones, for every update
2) ship a gyp file which could generate something that could maybe be integrated

Or *provide integration with popular build systems* via cstar 

 -->


## Usage 
1) library consumer
2) library developer
3) cstar contributer


## Examples  
* [general](doc/examples.md)  
* [cmake](https://github.com/mucbuc/cstar-example-cmake/blob/master/README.md)  
* [gyp](https://github.com/mucbuc/cstar-example-gyp/blob/master/README.md)   
* [qmake](https://github.com/mucbuc/cstar-example-qmake/blob/master/README.md)  
* [opengl](https://github.com/mucbuc/cstar-example-opengl/blob/master/README.md)

## More Info
[Project Definition Guide](doc/guide.md)   

[Developer Guide](doc/dev.md)

test
test
test
