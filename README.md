# cstar
c++ source integration tool

cstar generates project include files for common formats ([gyp](https://gyp.gsrc.io/index.md), [qmake](http://doc.qt.io/qt-4.8/qmake-manual.html), [cmake](https://cmake.org/)) from JSON project
definition files

##project definition

#### 1 import  
cstar will recursively process imported files. 

#### 1.1 import project definitions
```
{
	"import": [ "lib/def.json" ]
}
```

#### 2 reference files
These properties will get flattened and relativized. Accepted types are arrays and strings.

##### 2.1 reference source files
```
{
	"sources": [ "src/main.cpp" ]
}
```

##### 2.2 reference configuration files
```
{
	"config": [ "targets.gypi" ]
}

```

#### 3 branches
Branches will get trimmed according to an optional regular expression passed as argument to cstar

##### 3.1 specify arbitrary targets
```
{
	"branches": {
		"win": {
			"config": "lib/directX.gypi"
		},
		"mac": {
			"config": "lib/openGL.gypi"
		}
	}
}
```


