Given the following files:

test.json:
```
{
	"import": [
		"lib/mod/inc.json"
	],
	"sources": [ 
		"src/main.cpp"
	],
	"branches": {
		"win": {
			"config": [
				"directX.gypi"
			]
		},
		"mac": {
			"config": [
				"openGL.gypi"
			]
		}
	}
}
```

lib/mod/inc.json:
```
{
	"sources": [
		"src/header.h"
	]
}
```

following commands will produce: 

`cstar.js test.json` =>
```
{ sources: [ 'lib/mod/src/header.h', 'src/main.cpp' ],
  config: [ 'directX.gypi', 'openGL.gypi' ] }
```

`/cstar.js -e win test.json` => 
```
{ sources: [ 'lib/mod/src/header.h', 'src/main.cpp' ],
  config: [ 'directX.gypi' ] }
```




