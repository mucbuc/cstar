# cstar
c++ source integration tool

cstar generates project include files for common formats ([gyp](https://gyp.gsrc.io/index.md), [qmake](http://doc.qt.io/qt-4.8/qmake-manual.html), [cmake](https://cmake.org/)) from JSON project
definition files

##project definition file examples:

####1.1 project with one source file
```
{
	"sources": "src/main.cpp"
}
```

####1.2 project with branch
```
{
	"branches": {
		"win": {
			"sources": "src/win.cpp"
		},
		"mac": {
			"sources": "src/mac.cpp"
		}
	}
}
```

####1.3 project with dependecy
```
{
	"config": "targets.gypi"
}
```

### definition file
-sources  
-includes  
-branches  
-config  

