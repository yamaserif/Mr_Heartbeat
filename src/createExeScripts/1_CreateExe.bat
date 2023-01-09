del ..\..\exe\MrHeartBeat.exe
del ..\..\app.zip

rd /s /q ..\..\exe\controllers
rd /s /q ..\..\exe\views
rd /s /q ..\..\exe\customViews
rd /s /q ..\..\exe\licences
rd /s /q ..\..\exe\node_modules

nexe index.js