ren dist.exe MrHeartBeat.exe

move MrHeartBeat.exe ..\..\exe
echo D | xcopy /e controllers ..\..\exe\controllers
echo D | xcopy /e views ..\..\exe\views
echo D | xcopy /e customViews ..\..\exe\customViews
echo D | xcopy /e licences ..\..\exe\licences

powershell compress-archive ..\..\exe\* ..\..\app.zip