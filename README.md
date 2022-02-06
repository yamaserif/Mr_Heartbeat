# Mr_Heartbeat
「ANT+」で受信したデータを画面に表示させます。  
![image](https://user-images.githubusercontent.com/62947068/152672982-67580407-299a-4ad4-81f4-caa3048f4790.png)


## 準備
1. ANT+をPCで受け取るためのドングルを準備する。
2. ドングルのDriver(WinUSB)を[Zadig](https://zadig.akeo.ie/)を使用してインストールする。  
![image](https://user-images.githubusercontent.com/62947068/152672294-59e5a9a6-35b0-4052-9658-06fc56d71cd0.png)
3. 本リポジトリの「[app.zip](https://github.com/yamaserif/Mr_Heartbeat/blob/develop/app.zip)」をダウンロードし、展開する。

## 利用方法
1. 「MrHeartBeat.exe」を実行し、アプリを起動する。
2. 「 http://127.0.0.1:3000/ 」にアクセスする。  
（アプリ設定は「 http://127.0.0.1:3000/setting 」にて行えます）

## OBSでの利用
1. OBSのソースに「ブラウザ」を追加する。  
![image](https://user-images.githubusercontent.com/62947068/152673576-dc83e582-dd93-4713-8fc7-521d56e35d60.png)
2. 「URL」に「 http://127.0.0.1:3000/heart-view 」を指定する。  
（設定は必須では無いが、デフォルト状態であれば「高さ」を380あたりに設定すると良い）
![image](https://user-images.githubusercontent.com/62947068/152673667-48ade49f-33af-4318-a07a-e87782ba872d.png)

## カスタムしたUIで心拍数を表示する。
1. 「customViews」ディレクトリ内にUI用のファイルを格納する。
2. 設定ページにて「心拍数表示ページのレイアウトファイル」を設定する。
3. 心拍数表示ページを更新する。

### 心拍数表示ページのレイアウトファイルについて
基本的にHTMLで記入が可能です。  
デフォルトで置かれているファイルを参考にファイルを作成してください。  
（もともと置かれているファイルを改変して使用することも可能です。）
#### HeartViewTemplate.ejs
 テンプレート用のファイルです。  
 単純に心拍数を表示するのみの機能が実装されています。  
 こちらのファイルを参考に編集すると作りやすいと思います。
#### HeartViewDefaultSample.ejs
 デフォルトで設定されているファイル（コピー）になります。  
 主にデフォルトのページの一部を改変したいという場合に利用してください。  
 （心拍数での色切り替えを行う閾値などを変更したりなど）
 
## ローカルでの心拍数取得用APIとしての使用
内部的には現在の心拍数を「 http://127.0.0.1:3000/heartbeat-point 」にて取得しています。  
レスポンスとして、以下の形で渡されます。  
`{"heartbeatPoint":number}`
