# !!!WIP!!! dont use !!! cstar
c++ source integration tool

## What problem cstar solves?
When writing source to be distributed I can
1) specify files to include and hope that users get the right ones, for every update
2) ship a gyp file which could generate something that could maybe be integrated

Or *provide integration with popular build systems* via cstar 

## objective
cstar generates project include files for common build systems ([gyp](https://gyp.gsrc.io/index.md), [qmake](http://doc.qt.io/qt-4.8/qmake-manual.html), [cmake](https://cmake.org/)) from JSON project
definition files

## Usage 
1) library consumer
2) library developer
3) cstar contributer


## examples  
* [general](doc/examples.md)  
* [cmake](https://github.com/mucbuc/cstar-template-cmake/blob/master/README.md)  
* [gyp](https://github.com/mucbuc/cstar-template-gyp/blob/master/README.md)   
* [qmake](https://github.com/mucbuc/cstar-template-qmake/blob/master/README.md)  

[Project Definition Guide](doc/guide.md)   

[Developer Guide](doc/dev.md)

