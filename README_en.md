[日本語](https://github.com/yamaserif/Mr_Heartbeat/blob/main/README.md)

# Mr_Heartbeat
The data received by "ANT+" is displayed on the screen.  
![heartbeat](https://user-images.githubusercontent.com/62947068/153741682-9ea15472-2753-4703-a2e0-f2e3bdd218a4.gif)


## Arrangement
1. Prepare a dongle for the PC to receive ANT+.
2. Install the dongle Driver (WinUSB) using [Zadig](https://zadig.akeo.ie/).  
![image](https://user-images.githubusercontent.com/62947068/152672294-59e5a9a6-35b0-4052-9658-06fc56d71cd0.png)
3. Download and extract "[app.zip](https://github.com/yamaserif/Mr_Heartbeat/blob/main/app.zip)" from this repository. (Get it from the main branch.)

## How to use
1. Run "MrHeartBeat.exe" to launch the application.
2. Access "http://127.0.0.1:3000/".  
(Application settings can be made at "http://127.0.0.1:3000/setting".)

## Use with OBS
1. Add "Browser" to the OBS source.  
![image](https://user-images.githubusercontent.com/62947068/152673576-dc83e582-dd93-4713-8fc7-521d56e35d60.png)
2. Specify "http://127.0.0.1:3000/heart-view" in "URL".  
(Although not required, it is a good idea to set the "height" to around 380 in the default state.)
![image](https://user-images.githubusercontent.com/62947068/152673667-48ade49f-33af-4318-a07a-e87782ba872d.png)

## Display heart rate in a custom UI.
1. Store files for the UI in the "customViews" directory.
2. Set the "Layout file" on the Settings page.
3. Update the heart rate display page.

### About the layout file for the heart rate display page
Basically, HTML can be used to fill out the form.  
Please create a file referring to the file placed by default.  
(It is also possible to use modified versions of originally placed files.)
#### HeartViewTemplate.ejs
 File for template.  
 The function is implemented to simply display the heart rate only.  
 It will be easier to create it if you edit the file here.
#### HeartViewDefaultSample.ejs
 It will be a copy of the file set by default.  
 Use it mainly when you want to modify a part of the default page.  
 For example, by default, the color changes with heart rate, but you can use it to change the threshold (standard is green below 85, yellow below 100, and red at higher values), etc.
 
## Use as API for heart rate acquisition in local environment
Internally, the current heart rate is obtained at "http://127.0.0.1:3000/heartbeat-point".  
The response is passed in the following form.  
`{"heartbeatPoint":number,"datetime":dateString}`
 
## Streaming use, etc.
There is no need to inform us when you use it.
Please feel free to use it.  
(However, the Developer shall not be liable for any damage or other loss caused by the Software at the time of use.)

Any other modification or use of the source code must be in accordance with the MIT License.
