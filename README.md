# cstar
c++ source integration tool

cstar generates project include files for common formats ([gyp](https://gyp.gsrc.io/index.md), [qmake](http://doc.qt.io/qt-4.8/qmake-manual.html), [cmake](https://cmake.org/)) from JSON project
definition files

##project definition

#### 1 import

cstar will recursively process imported definition files: 
```
{
	"import": [ "lib/def.json" ]
}
```

#### 2 references
These properties will get flattened and relativized: 

##### 2.1 reference source files
Specify source files like this:

```
{
	"sources": [ "src/main.cpp" ]
}
```

##### 2.2 reference configuration files
Specify configuration files like this: 
```
{
	"config": [ "targets.gypi" ]
}

```

#### 3 branches
You can specialize for arbitrariy targets: 
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


