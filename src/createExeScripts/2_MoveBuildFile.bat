ren dist.exe MrHeartBeat.exe

move MrHeartBeat.exe ..\..\exe
echo D | xcopy /e controllers ..\..\exe\controllers
echo D | xcopy /e views ..\..\exe\views
echo D | xcopy /e customViews ..\..\exe\customViews
echo D | xcopy /e licences ..\..\exe\licences
echo D | xcopy /e ..\package_node_modules\node_modules ..\..\exe\node_modules

powershell compress-archive ..\..\exe\* ..\..\app.zip