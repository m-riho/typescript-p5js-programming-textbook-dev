---
theme: default
title: "第1章 TypeScript + p5.jsを始める"
info: "神奈川工科大学 授業用スライド / Windows・PowerShell"
author: "HISASHI SATO"
lang: ja
favicon: /figures/first-sketch-canvas.png
class: cover
canvasWidth: 1280
aspectRatio: 16/9
colorSchema: light
transition: none
drawings:
  persist: false
fonts:
  sans: Noto Sans JP
  mono: Consolas
  provider: none
download: false
exportFilename: lecture01-typescript-p5js
---

<p class="university">情報メディア学科　情報メディアワーク基礎（火曜日3現）</p>

# TypeScript + p5.jsを<br>始める

<div class="cover-rule"></div>
<p class="lead">第1章 / Windowsで準備して、最初のプログラムを動かす</p>
<p>今日は「自分のパソコンで動いた」を目指します。</p>

<!--
到達目標は環境構築と実行。コードの暗記や仕組みの完全な理解を求めない。
Windows 11を想定。管理されたPCでは学内の手順を優先し、許可なく設定を変更しない。
青系の授業用配色。正式なスクールカラーの色番号を示すものではない。
参考: https://www.kait.jp/about/philosophy/
-->

---

# 今日できるようになること

まず、動いたときの画面を見ておきましょう。

<div class="photo-layout">
<div>
<img class="photo" src="/figures/browser-first-sketch.png" alt="ブラウザに薄い灰色のキャンバスと白い円が表示された最初のスケッチ" />
<p class="caption">第1章の first-sketch.ts の実行画面</p>
</div>
<div>
<ol>
<li>道具を準備する</li>
<li>教材を取得する</li>
<li>円を表示する</li>
<li>次回も起動できる</li>
</ol>
</div>
</div>

<!--
授業の冒頭で完成画面を見せる。ブラウザの白い余白ではなく、灰色の領域がキャンバスだと指す。
画像: 教科書 figures/chapter01/browser-first-sketch.png。
-->

---

# 今日の道順

「一度準備すること」と「毎回行うこと」を分けて進めます。

<div class="steps">
<div><b>01</b><p><strong>はじめに</strong>　使う道具と、その役割を知る</p></div>
<div><b>02</b><p><strong>準備・原則初回</strong>　インストール、教材取得、ライブラリ準備</p></div>
<div><b>03</b><p><strong>実行・毎回</strong>　開発サーバを起動して、ブラウザで確認</p></div>
</div>

<p class="check">途中で「ここまで確認」の時間を取ります。急がなくて大丈夫です。</p>

<!--
受講者の経験差が大きい。先に終わった人は補足の自由操作に進ませる前に、他の人の画面を無断で操作しないよう伝える。
-->

---
class: section
---

<p class="section-number">01</p>

# 使う道具を知る

<p class="lead">名前を覚える前に、「何をする道具か」を押さえましょう。</p>
<p>VS Code / Node.js / Git / GitHub / ブラウザ</p>

<!--
ここは説明中心。まだダウンロードを始めない。
-->

---

# VS Codeは、プログラムを書く道具

正式名称は Visual Studio Code。文字でプログラムを書くためのエディタです。

<div class="flow">
<div class="node"><b>VS Code</b><span>ファイルを開く<br>文字を書き換えて保存する</span></div>
<div class="arrow">→</div>
<div class="node"><b>プログラム<br>ファイル</b><span>この教材では .ts<br>TypeScriptのファイル</span></div>
<div class="arrow">→</div>
<div class="node green"><b>ブラウザ</b><span>実行した結果を見る<br>図形やゲームが動く</span></div>
</div>

<p class="check">書く場所と、結果を見る場所は別です。</p>

<!--
VS Codeはワープロではなくコード用のエディタ。開発サーバの説明は後で行うため、この図は役割の概略。
「Visual Studio」という別製品と取り違えない。
参考: https://code.visualstudio.com/docs
-->

---

# TypeScriptとp5.js

この授業では、TypeScriptで命令を書き、p5.jsの機能で図形を描きます。

<div class="columns">
<div>
<h2>TypeScript</h2>
<p>JavaScriptに「数値」「文字列」などの<strong>型を確認する仕組み</strong>を加えた言語です。</p>
</div>
<div>
<h2>p5.js</h2>
<p>図形、色、マウス操作などを扱うための<strong>ライブラリ</strong>です。</p>
</div>
</div>

<p class="check">p5.jsで作るプログラムを「スケッチ」と呼びます。</p>
<p class="small">ライブラリは、プログラムから利用できる機能をまとめたものです。</p>

<!--
Processingの経験は前提にしない。型やライブラリの詳細に脱線せず、今日の道具立てとして説明する。
本文第1章「JavaScriptとTypeScriptの関係」「p5.jsとは何か」に対応。
-->

---

# Node.jsは、開発用の道具を動かす環境

JavaScriptを、ブラウザの外でも実行できるようにするものです。

<div class="flow">
<div class="node"><b>Node.js</b><span>自分のパソコンで<br>開発用の処理を動かす</span></div>
<div class="arrow">→</div>
<div class="node"><b>開発サーバ</b><span>プログラムを<br>ブラウザに届ける</span></div>
<div class="arrow">→</div>
<div class="node green"><b>ブラウザ</b><span>p5.jsのスケッチを<br>実行する</span></div>
</div>

<p class="warning">今回、円やゲームを実行する場所はブラウザです。</p>

<!--
Node.jsでp5.jsの描画そのものを実行するという誤解を避ける。
Viteという名前や変換の仕組みは後で必要な分だけ説明。
参考: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
-->

---

# npmは、必要な部品を準備する道具

Node.jsと一緒にインストールします。ターミナルで命令を入力して使います。

| 命令 | この教材での役割 | いつ使う？ |
|---|---|---|
| <code>npm install</code> | p5.jsなど、必要な部品をそろえる | 準備するとき |
| <code>npm run dev</code> | 開発サーバを起動する | 作業を始めるとき |

<p class="check">今は、2つの命令の役割が違うことが分かれば十分です。</p>

<!--
ターミナルは後で実画面で説明する。npm run devの動作はプロジェクトの設定によって決まる。
この教材のpackage.jsonではviteを起動する。
参考: https://docs.npmjs.com/cli/commands/npm-install
参考: https://docs.npmjs.com/cli/commands/npm-run-script
-->

---

# Gitは、変更の履歴を記録する道具

作業の節目に「どのように変えたか」を記録できます。その記録がコミットです。

<div class="flow">
<div class="node"><b>最初の状態</b><span>円を1つ描いた</span></div>
<div class="arrow">→</div>
<div class="node"><b>次の記録</b><span>円を大きくした</span></div>
<div class="arrow">→</div>
<div class="node green"><b>さらに次の記録</b><span>色を変えた</span></div>
</div>

<p><strong>ファイルの保存</strong>と、<strong>Gitへの記録</strong>は別の操作です。</p>
<p class="small">Gitは、今回の教材をダウンロードするときにも使います。</p>

<!--
履歴は自動記録ではない。まず教材を取得する用途に絞り、commit実習は補足に置く。
参考: https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F
-->

---

# GitとGitHubは、別のもの

GitHubは、Gitで管理する教材をインターネット上で公開できるサービスです。

<div class="flow">
<div class="node"><b>GitHub</b><span>インターネット上<br>教員が公開した教材</span></div>
<div class="arrow">→</div>
<div class="node"><b>git clone</b><span>Gitを使って<br>教材と履歴を取得</span></div>
<div class="arrow">→</div>
<div class="node green"><b>自分のパソコン</b><span>教材のコピー<br>ここで実行・編集する</span></div>
</div>

<p class="check">この公開教材の取得だけなら、GitHubへのログインは不要です。</p>

<!--
cloneはブラウザ上で編集することではない。公開HTTPSリポジトリの取得にはアカウントを必要としない。
学生からGitHubへpushする共同作業は今回扱わない。
参考: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
-->

---

# ここまで確認：どの道具を使う？

目的に合う名前を選んでみましょう。

| したいこと | 選ぶ道具 |
|---|---|
| プログラムの文字を書き換える | VS Code / Git / ブラウザ |
| 変更した履歴を記録する | Node.js / Git / ブラウザ |
| 円が描かれた結果を見る | GitHub / VS Code / ブラウザ |

<p class="check">似た名前を覚えるより、役割を結び付けましょう。</p>

<!--
答えはVS Code、Git、ブラウザ。学生に口頭で答えてもらってから再確認する。
Node.jsは開発用の道具を動かす環境、GitHubは教材の公開場所。
-->

---
class: section
---

<p class="section-number">02</p>

# 準備する

<p class="lead">このパソコンでは、原則として最初の1回です。</p>
<p>VS Code → Node.js → Git → 教材の取得 → 部品の準備</p>

<!--
PCを変える場合には準備が必要。既にインストール済みなら、むやみに再インストールせず動作確認へ。
途中で授業を分ける場合、道具3つの確認が一つ目の区切り。
-->

---

# インストールの前に

ソフトウェアを使えるように、パソコンへ組み込む作業がインストールです。

<div class="flow">
<div class="node"><b>ダウンロード</b><span>インストーラーを<br>パソコンに保存する</span></div>
<div class="arrow">→</div>
<div class="node"><b>インストール</b><span>保存したファイルを開き<br>セットアップを進める</span></div>
<div class="arrow">→</div>
<div class="node green"><b>確認</b><span>アプリを起動する<br>命令が使えるか調べる</span></div>
</div>

<p class="warning">学校の管理PCで許可が必要な場合は、担当者に相談してください。</p>

<!--
ダウンロードが終わっただけでは未完了。Windows 11を想定し、画面やバージョンは時期により異なると説明。
UACや管理者パスワードを回避する方法は案内しない。
-->

---

# VS Code ① 公式サイトを開く

ブラウザのアドレス欄に、次のURLを入力します。

<p><a href="https://code.visualstudio.com/">https://code.visualstudio.com/</a></p>

<div class="photo-layout">
<img class="photo" src="/figures/vcode-oficial.png" alt="VS Code公式サイトのDownload for Windowsボタンを示す矢印" />
<div>
<p><strong>Download for Windows</strong>を選びます。</p>
<p>「Visual Studio」ではなく<br><strong>Visual Studio Code</strong>です。</p>
<p class="small">ボタンの位置や文字は、画面写真と異なることがあります。</p>
</div>
</div>

<!--
検索広告を経由せず公式URLを使う。画像は教科書のWindows写真。
参考: https://code.visualstudio.com/docs/setup/windows
-->

---

# VS Code ② 保存したファイルを開く

Windowsのエクスプローラーで「ダウンロード」を開きます。

<img class="photo" style="max-height:300px" src="/figures/vscode-installer.png" alt="ダウンロードフォルダ内で選択されたVSCodeUserSetupのexeファイル" />

<p><code>VSCodeUserSetup</code>で始まるファイルを<strong>ダブルクリック</strong>します。</p>
<p class="small">末尾の .exe は、Windowsで実行できるファイルです。番号は同じでなくて構いません。</p>

<!--
ダブルクリックに慣れていない学生を待つ。ダウンロード場所が違う場合はブラウザのダウンロード一覧で場所を確認する。
参考: https://code.visualstudio.com/docs/setup/windows
-->

---

# VS Code ③ セットアップを進める

画面の説明を読み、次の順で進めます。

<div class="steps">
<div><b>1</b><p>使用許諾を確認し、同意する場合は次へ進む</p></div>
<div><b>2</b><p>保存先などは、基本的に標準設定のまま進む</p></div>
<div><b>3</b><p>「PATHに追加」があれば有効のまま、インストールする</p></div>
</div>

<p class="small">PATHは、命令を探す場所の設定です。今は詳しく理解しなくても構いません。</p>

<!--
許諾を無条件に承諾させない。「Codeで開く」は便利だが必須ではない。
授業では次へを連打させず、この画面で止まってよいと伝える。
参考: https://code.visualstudio.com/docs/setup/windows
-->

---

# VS Code ④ 完了して起動する

完了画面まで進んだら、「完了」を選びます。

<div class="photo-layout">
<img class="photo" src="/figures/vscode-finish.png" alt="Visual Studio Codeセットアップウィザードの完了画面と完了ボタン" />
<div>
<p>「Visual Studio Codeを実行する」が選ばれていれば、続けて起動します。</p>
<p class="small">サインインやAI機能の設定は、今は不要です。</p>
<p class="check">確認：VS Codeのウィンドウが開いた。</p>
</div>
</div>

<!--
元画像: figures/Screenshot on windows/スクリーンショット 2026-09-15 141833.png。
セットアップが完了してからウィンドウを閉じる。
-->

---

# VS Code ⑤ 次からの起動方法

Windowsの検索欄に <code>vscode</code> と入力します。

<div class="photo-layout">
<img class="photo" src="/figures/start-vscode.png" alt="Windowsの検索でVisual Studio Codeアプリを選択した画面" />
<div>
<p><strong>Visual Studio Code</strong>というアプリを選びます。</p>
<p class="warning">次からはインストーラーを開きません。</p>
<p class="small">日本語と英語でメニューの表記が違う場合があります。</p>
</div>
</div>

<!--
学生に一度アプリを見つけてもらう。「Visual Studio Code」と「VSCodeUserSetup」の違いを確認。
-->

---

# Node.js ① 公式サイトを開く

ブラウザで [https://nodejs.org/](https://nodejs.org/) を開きます。

<div class="photo-layout">
<img class="photo" src="/figures/node-oficial.png" alt="Node.js公式サイトのNode.jsを入手ボタン" />
<div>
<p><strong>Node.jsを入手</strong>を選びます。</p>
<p>次のページで<br><strong>LTS版</strong>を選びます。</p>
<p class="small">LTSは、長期サポートのある版です。</p>
</div>
</div>

<!--
既にインストールしている場合も、後のnode -vで確認する。
参考: https://nodejs.org/en/download
-->

---

# Node.js ② Windows用を選ぶ

ダウンロードページでは、「Windows」と「LTS」を確認します。

<div class="photo-layout">
<Shot src="/figures/node-download.png" alt="WindowsのLTS版とWindows Installer msiボタンが表示されたダウンロードページ" size="814 718" region="0 0 814 718" />
<div>
<p><strong>Windows Installer<br>（.msi）</strong>を選びます。</p>
<p>Dockerの命令は<br>今回は使いません。</p>
<p class="small">一般的なIntel/AMDのPCはx64。ARMのPCは担当者と確認します。</p>
</div>
</div>

<!--
合成画像なので上下にページが分かれている。次のスライドでボタンを拡大する。
参考: https://nodejs.org/en/download
-->

---

# Node.js ③ .msiをダウンロードする

ページの下の方にある、Windows Installerを選びます。

<Shot src="/figures/node-download.png" alt="Windows Installer msiのダウンロードボタンを拡大" size="814 718" region="0 510 814 208" :max-height="250" />

<p>「ダウンロード」に保存された <code>node-</code> で始まる<br><code>.msi</code> ファイルをダブルクリックします。</p>
<p class="check">確認：Node.jsのセットアップ画面が開いた。</p>

<!--
同じ画像の全体→拡大は操作場所を示すための意図的な再利用。
画像の番号を指定せず、その時点のLTSを選ぶ。
-->

---

# Node.js ④ 標準設定でインストールする

使用許諾を確認し、インストール先や機能は基本的に変更しません。

<div class="steps">
<div><b>1</b><p>Nextで進み、使用許諾を確認する</p></div>
<div><b>2</b><p>標準設定のまま進む。npmも一緒に入れる</p></div>
<div><b>3</b><p>Installを選び、完了するまで待つ</p></div>
</div>

<p class="small">追加の開発ツールを自動で入れる選択肢が出ても、この教材では不要です。</p>

<!--
Windows Installerの標準設定を使用。ネイティブモジュール向けの追加ツールは今回不要。
管理者の許可が求められ、自分で判断できない場合は担当者へ。
参考: https://nodejs.org/en/download
-->

---

# Node.js ⑤ Finishまで進む

この画面が出たら、インストールは完了です。

<div class="photo-layout">
<img class="photo" src="/figures/node-finish.png" alt="Completed the Node.js Setup Wizardと表示された完了画面" />
<div>
<p><strong>Finish</strong>を選びます。</p>
<p>VS Codeが開いていれば、一度すべて閉じてから開き直します。</p>
<p class="small">新しい設定を、これから開くターミナルに反映させるためです。</p>
</div>
</div>

<!--
元画像: figures/Screenshot on windows/スクリーンショット 2026-09-15 142422.png。
この後、実際にコマンドが使えることまで確認する。
-->

---

# ターミナルを開く

ターミナルは、文字で命令を入力する場所です。

<div class="photo-layout">
<img class="photo" src="/figures/start-termnial-on-vscode.png" alt="VS CodeのViewメニューからTerminalを選ぶ画面" />
<div>
<p>VS Codeで<br><strong>ターミナル →<br>新しいターミナル</strong></p>
<p class="small">英語：Terminal → New Terminal</p>
<p class="small">写真の View → Terminal<br>（表示 → ターミナル）でも開けます。</p>
</div>
</div>

<!--
画面写真は英語UI。日本語UIの名称も口頭で対応づける。写真にはまだ教材フォルダがない。
参考: https://code.visualstudio.com/docs/terminal/basics
-->

---

# 入力するのは、下側のPowerShell

右側に <code>powershell</code> と表示されていることを確認します。

<Shot src="/figures/terninal-on-vsocde.png" alt="VS Code下部のPowerShellターミナルとPSで始まる入力行" size="1341 1022" region="35 620 1306 350" />

<p>違うものが開いたら、「＋」の横のメニューから<strong>PowerShell</strong>を選びます。</p>
<p class="warning">プログラムを書くエディタ欄に、命令を入力しないようにしましょう。</p>

<!--
元画像のターミナル領域を表示時に切り出す。原本は加工しない。
入力先をクリックしてから次へ進む。PowerShell自体のインストールは通常不要。
-->

---

# 命令と、現在地の表示を分ける

<code>PS C:\…&gt;</code> は、PowerShellが表示する案内です。

<div class="prompt">PS C:\Users\Student&gt; <span class="typed">node -v</span></div>

<div class="columns">
<div>
<h2>表示される部分</h2>
<p><code>PS C:\Users\Student&gt;</code><br>ここは入力しません。</p>
</div>
<div>
<h2>入力する部分</h2>
<p><code>node -v</code><br>最後に <strong>Enter</strong> を押します。</p>
</div>
</div>

<p class="small">Studentの部分は、自分のユーザー名になります。半角の文字で入力します。</p>

<!--
この画面は読み方の模式図でありスクリーンショットではない。
nodeと-vの間には半角スペース1つ。ハイフンは通常の半角ハイフン。
-->

---

# Node.jsとnpmの確認

次の2行を、1行ずつ入力して実行します。

~~~powershell
node -v
npm -v
~~~

<p class="small">表示例（番号は違っていて構いません）</p>
<pre class="output">v24.21.0
11.8.0</pre>

<p class="check">確認：どちらもバージョン番号が出た。</p>

<!--
表示例は形式を説明するための例。実機でこの組み合わせを測定したという意味ではない。
古いNode.jsはViteが動かない場合がある。新規導入は現行LTS。
npm.ps1のエラーは補足へ。安全設定を一括で緩めることはしない。
-->

---

# Git ① 公式サイトからWindows版へ

[https://git-scm.com/](https://git-scm.com/) を開きます。

<div class="photo-layout">
<Shot src="/figures/git-install.png" alt="Git公式サイトのInstall for Windowsボタン" size="960 1661" region="0 140 960 520" />
<div>
<p><strong>Install for Windows</strong>を選びます。</p>
<p>Gitをインストールすると、<code>git</code>という命令を使えるようになります。</p>
</div>
</div>

<!--
教科書の縦長合成画像を各操作に分けて表示。
参考: https://git-scm.com/install/windows
-->

---

# Git ② インストーラーを選ぶ

一般的なIntel/AMDのWindowsパソコンでは、x64 Setupを選びます。

<Shot src="/figures/git-install.png" alt="Git for Windows x64 Setupへのリンクを示した画面" size="960 1661" region="250 905 680 325" :max-height="300" />

<p><strong>Git for Windows/x64 Setup</strong>を選びます。</p>
<p class="small">ARMのパソコンはARM64版です。分からない場合は担当者に確認してください。</p>

<!--
Portable版ではなくSetup版。Windowsの設定→システム→バージョン情報でシステムの種類を確認できる。
参考: https://git-scm.com/install/windows
-->

---

# Git ③ 保存したファイルを開く

「ダウンロード」で、<code>Git-</code> で始まる <code>.exe</code> を探します。

<Shot src="/figures/git-install.png" alt="ダウンロードフォルダでGitのインストーラーを選択した画面" size="960 1661" region="165 1405 670 255" :max-height="300" />

<p>ダブルクリックし、使用許諾を確認してセットアップを進めます。</p>
<p class="small">多数の選択画面が出ますが、基本的には標準設定で進めます。</p>

<!--
原本の矢印とファイル名を拡大。個々の細かい設定の理論には立ち入らない。
参考: https://git-scm.com/install/windows
-->

---

# Git ④ PowerShellで使える設定にする

PATHの選択画面が出たら、次の選択肢になっているか確認します。

<pre class="output">Git from the command line and also
from 3rd-party software</pre>

<p>Gitを、PowerShellやVS Codeからも利用できるようにする設定です。</p>
<p>そのほかは、基本的に標準設定のまま進めます。</p>
<p class="warning">選択肢が違う・判断できない場合は、その画面で担当者に相談してください。</p>

<!--
画面写真ではなく確認する文字列。Git for WindowsのPATH設定の推奨の既定項目。
参考: https://github.com/git-for-windows/build-extra/blob/main/installer/install.iss
Git Bashのみを選ばせない。未検証のインストーラーUIの絵は作らない。
-->

---

# Git ⑤ 完了したら開き直す

Finishまで進んだら、VS Codeを閉じて、もう一度開きます。

<div class="photo-layout">
<img class="photo" src="/figures/git-finish.png" alt="Completing the Git Setup Wizardと表示されたGitインストールの完了画面" />
<div>
<p><strong>Launch Git Bash</strong>は選ばなくて構いません。</p>
<p>授業では引き続き<br><strong>PowerShell</strong>を使います。</p>
<p class="small">View Release Notesは、更新情報を表示する設定です。</p>
</div>
</div>

<!--
元画像: figures/Screenshot on windows/スクリーンショット 2026-09-15 142712.png。
Git Bashを別の作業場所として増やさない。VS Code全体の再起動でPATHを引き継ぐ。
-->

---

# Gitの確認

新しく開いたPowerShellで、次を実行します。

~~~powershell
git --version
~~~

<p class="small">表示例（番号は違っていて構いません）</p>
<pre class="output">git version 2.55.0.windows.1</pre>

<p class="check">確認：git versionに続いて番号が出た。</p>

<!--
「認識されません」が出た場合はインストール完了とVS Codeの再起動を確認する。
今はcloneだけなので、名前・メールの設定は補足のcommit直前に行う。
-->

---

# ここまで確認：3つの準備

先へ進む前に、自分の画面で確かめましょう。

| 確認するもの | 成功の目印 |
|---|---|
| VS Code | アプリが開く |
| <code>node -v</code> と <code>npm -v</code> | それぞれの番号が出る |
| <code>git --version</code> | Gitの番号が出る |

<p class="check">ここで一度止まります。できていない項目は、画面を残して相談しましょう。</p>

<!--
全員の到達確認ポイント1。インストール済みの学生も確認する。必要ならここで授業を分割できる。
-->

---

# 作業用フォルダを作る

教材の置き場所を決めると、次の授業でも見つけやすくなります。

<div class="steps">
<div><b>1</b><p>エクスプローラーで「ドキュメント」を開く</p></div>
<div><b>2</b><p>「新規作成」→「フォルダー」を選ぶ</p></div>
<div><b>3</b><p>名前を <code>work-textbook</code> にする</p></div>
</div>

<p class="small">ハイフンも半角です。既にあれば、そのフォルダを使います。</p>

<!--
DocumentsはOneDriveの下にある場合もある。C:からの固定パスを全員に入力させない。
本章の本文と同じくExplorerで作成し、次にVS Codeで開く。
-->

---

# VS Codeで作業用フォルダを開く

「ファイル」→「フォルダーを開く」で、作ったフォルダを選びます。

<pre class="path-tree">ドキュメント
└─ <mark>work-textbook　← 今回開く場所</mark></pre>

<p>英語表示では <strong>File → Open Folder</strong> です。</p>
<p>選ぶのはファイルではなく、<strong>work-textbookというフォルダ</strong>です。</p>
<p class="small">自分で作ったフォルダであることを確認してから、信頼の確認に答えます。</p>

<!--
未知のフォルダを無条件で信頼させない。VS Codeの信頼ダイアログが出た場合、選択したパスを確認する。
エクスプローラー欄とWindowsのエクスプローラーの名称が似ていることにも注意。
-->

---

# 現在地を確かめる：pwd

新しいPowerShellターミナルを開き、現在のフォルダを調べます。

~~~powershell
pwd
~~~

<p class="small">表示例</p>
<pre class="output">Path<br>C:\Users\Student\Documents\work-textbook</pre>

<p class="check">確認：最後が work-textbook になっている。</p>

<!--
途中のパスはPCごとに違う。末尾を見る。「Explorerでフォルダを選んだ」だけでは既存ターミナルの現在地は変わらない。
異なる場合は作業フォルダを開き直し、新しいターミナルを作る。
-->

---

# lsとcd：見ること、移動すること

ターミナルには「現在地」があります。命令は、今いる場所で実行されます。

| 命令 | 意味 | 例 |
|---|---|---|
| <code>pwd</code> | 今いる場所を調べる | <code>pwd</code> |
| <code>ls</code> | 中にあるものを表示する | <code>ls</code> |
| <code>cd 名前</code> | 指定したフォルダへ移動する | <code>cd practice</code> |
| <code>cd ..</code> | 1つ上のフォルダへ戻る | <code>cd ..</code> |

<p class="warning">フォルダを見るだけでは、現在地は移動しません。</p>

<!--
PowerShellのlsはGet-ChildItem、pwdはGet-Locationの別名。学生にその暗記は求めない。
作業フォルダが空ならlsの結果が空でも正常。
参考: https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem
-->

---

# 小さく練習：フォルダを作って戻る

今いる場所が <code>work-textbook</code> であることを確認してから試します。

<div class="columns">
<div>

~~~powershell
mkdir practice
cd practice
pwd
cd ..
pwd
~~~

</div>
<div>
<pre class="path-tree">work-textbook
└─ practice</pre>
<p><code>mkdir</code> は作成。<br><code>cd</code> は移動。</p>
<p class="small">practiceが既にあれば、最初の行は省略します。</p>
</div>
</div>

<p class="check">確認：最後のpwdで work-textbook に戻った。</p>

<!--
入力は一行ずつ。mkdirのエラーが既に存在するという内容なら作り直す必要はない。
この実習で教材取得前の現在地を確実にそろえる。
-->

---

# 教材をGitHubから取得する

教材をまとめた入れ物を、リポジトリと呼びます。

<div class="flow compact">
<div class="node"><b>教員の公開リポジトリ</b><span>GitHub上の学生向け教材</span></div>
<div class="arrow">→</div>
<div class="node"><b>git clone</b><span>ファイルと履歴を取得</span></div>
<div class="arrow">→</div>
<div class="node green"><b>work-textbookの中</b><span>教材フォルダが作られる</span></div>
</div>

<p>使用するのは <strong>typescript-p5js-programming-textbook</strong> です。</p>
<p class="small">末尾に -dev が付くリポジトリは、教員向けです。今回は使いません。</p>

<!--
現在の公開方針に合わせる。学生版にLaTeXソースはない。clone前にインターネットへの接続を確認。
教材URL: https://github.com/m-riho/typescript-p5js-programming-textbook
-->

---

# git cloneを実行する

長いので、次の命令はコピーして貼り付けても構いません。

<p class="place">PowerShellの現在地：work-textbook</p>

<div class="command-long">

~~~powershell
git clone https://github.com/m-riho/typescript-p5js-programming-textbook.git
~~~

</div>

<p><strong>Enter</strong>を押し、処理が終わるまで待ちます。</p>
<p class="small">この行は、途中で改行せず1行の命令として入力します。</p>
<p class="warning">既に教材フォルダがある人は、もう一度cloneしないでください。</p>

<!--
出典: 学生向け公開リポジトリのURL。本文と照合する。
画面上の折り返しとEnterによる改行を区別。引用符や行番号は不要。
-->

---

# 取得できたか確認する

<code>PS …&gt;</code> の入力待ちに戻ったら、中身を調べます。

~~~powershell
ls
~~~

<pre class="path-tree">work-textbook
├─ practice
└─ <mark>typescript-p5js-programming-textbook</mark></pre>

<p class="check">確認：教材と同じ名前のフォルダが作られた。</p>
<p class="warning">cloneしても、PowerShellの現在地はwork-textbookのままです。</p>

<!--
Gitの通信出力の一語一句は同じでなくてよい。lsの結果で確認する。
教材取得の既存写真はDocumentsでcloneしているため使用せず、本文どおりの図を使う。
-->

---

# 今度は、教材フォルダを開く

VS Codeの「ファイル」→「フォルダーを開く」をもう一度使います。

<pre class="path-tree">ドキュメント
└─ work-textbook
   └─ <mark>typescript-p5js-programming-textbook</mark>
      ├─ README.md
      └─ typescript-p5</pre>

<p>選ぶのは、<strong>今取得した教材フォルダ</strong>です。</p>
<p class="small">README.mdは、教材の案内が書かれたファイルです。</p>

<!--
開き直したら新しいターミナルを作成する。信頼確認では公式の授業用URLから取得したものか確かめる。
図は必要な部分だけを抜粋。LICENSEなどの他のファイルは省略している。
-->

---

# 教材の中で使う場所

サンプルも自分の作業用フォルダも、<code>typescript-p5</code> の中にあります。

<pre class="path-tree">typescript-p5js-programming-textbook
└─ typescript-p5
   ├─ <mark>index.html</mark>    実行するファイルを選ぶ入口
   ├─ package.json  必要な部品と命令の設定
   ├─ listings      教材のサンプル
   ├─ workspace     自分のプログラム
   └─ images        画像ファイル</pre>

<p class="small">図では、今回使うものだけを抜き出しています。</p>

<!--
listingsとworkspaceがリポジトリ直下にある旧配置を使わない。
src/main.tsを実行先として案内しない。
-->

---

# typescript-p5へ移動する

教材フォルダを開いたVS Codeで、新しいPowerShellを開きます。

~~~powershell
pwd
cd typescript-p5
pwd
~~~

<pre class="path-tree">typescript-p5js-programming-textbook
└─ <mark>typescript-p5　← npmを使う場所</mark></pre>

<p class="check">確認：最後のpwdの末尾が typescript-p5 になった。</p>

<!--
最初のpwdでリポジトリ名が末尾か確認し、違う場合は立ち止まる。
既にtypescript-p5ならcdを繰り返さない。次のスライドでpackage.jsonの存在も確認。
-->

---

# package.jsonがあるか確認する

必要な部品の一覧がある場所で、準備を行います。

<p class="place">PowerShellの現在地：typescript-p5</p>

~~~powershell
ls package.json
~~~

<p><code>package.json</code> というファイル名が表示されれば、場所は合っています。</p>
<p class="warning">「見つからない」と出たら、npm installの前に現在地を確認しましょう。</p>

<!--
package.jsonをここで編集する必要はない。lsでファイルの存在を確認するだけ。
-->

---

# npm installで部品をそろえる

p5.jsや開発用の道具を、この教材フォルダに準備します。

<p class="place">PowerShellの現在地：typescript-p5 / 原則初回</p>

~~~powershell
npm install
~~~

<div class="flow compact">
<div class="node"><b>package.json</b><span>必要な部品の一覧</span></div>
<div class="arrow">→</div>
<div class="node"><b>npm install</b><span>必要な部品を取得する</span></div>
<div class="arrow">→</div>
<div class="node green"><b>node_modules</b><span>部品が入るフォルダ</span></div>
</div>

<!--
package-lock.jsonが版の再現にも使われるが、初心者向けの図では省略。
インターネット接続が必要。途中でウィンドウを閉じない。
参考: https://docs.npmjs.com/cli/commands/npm-install
-->

---

# インストールの終了を確かめる

処理中は待ち、入力待ちの表示に戻ったら結果を確認します。

<p class="small">表示例（件数・時間は環境によって変わります）</p>
<pre class="output">added 25 packages, and audited 26 packages
PS C:\…\typescript-p5&gt;</pre>

<p>VS Codeの一覧に <code>node_modules</code> が作られます。</p>
<p class="warning"><code>npm error</code> が出たら、そのまま先へ進まず相談してください。</p>
<p class="small">警告だけの場合も内容を確認します。自己判断で強制修正する必要はありません。</p>

<!--
例示の件数は測定値ではない。auditの警告を一律に無視させない。
npm audit fix --forceなどで授業の依存関係を勝手に変えさせない。
-->

---

# ここまで確認：実行の準備

ここまでできていれば、次はブラウザに表示する段階です。

<div class="steps">
<div><b>1</b><p>教材フォルダをVS Codeで開いている</p></div>
<div><b>2</b><p>PowerShellの現在地が <code>typescript-p5</code> になっている</p></div>
<div><b>3</b><p><code>npm install</code> がエラーなく終了している</p></div>
</div>

<p class="check">準備が済んだら、次回はここまでを繰り返す必要はありません。</p>

<!--
到達確認ポイント2。依存関係が更新された場合など、再度installが必要になることはある。
「原則初回」という表現に統一する。
-->

---
class: section
---

<p class="section-number">03</p>

# プログラムを動かす

<p class="lead">ここからは、授業や制作のたびに行う操作です。</p>
<p>開発サーバを起動 → ブラウザで確認 → 実行先を変更</p>

<!--
ここから毎回。事前セットアップが終わっている学生は、ここから実習を始められる。
-->

---

# npm run devで起動する

この教材では、Viteという開発用Webサーバが起動します。

<p class="place">PowerShellの現在地：typescript-p5 / 作業開始時</p>

~~~powershell
npm run dev
~~~

<p class="small">表示例（番号・ポートは異なる場合があります）</p>
<pre class="output">VITE v8.x.x  ready
➜  Local:  http://localhost:5173/</pre>

<p class="check">確認：Local: に続くURLが表示された。</p>

<!--
実行例は主要な行の抜粋。授業用サーバとSlidevの3030番を混同させない。
参考: https://vite.dev/guide/
-->

---

# LocalのURLをブラウザで開く

表示されたURLを、ブラウザのアドレス欄に入力します。

<div class="flow">
<div class="node"><b>PowerShell</b><span>Local:<br>http://localhost:5173/</span></div>
<div class="arrow">→</div>
<div class="node green"><b>Edge / Chrome</b><span>アドレス欄へ入力<br>Enterで開く</span></div>
</div>

<p><code>localhost</code> は、<strong>今使っている自分のパソコン</strong>を表します。</p>
<p class="warning">5174など別の番号なら、実際に表示されたURLを使ってください。</p>

<!--
検索欄ではなくアドレス欄。VS CodeではCtrlを押しながらURLをクリックする方法もあるが、まず確実な入力手順に統一。
同じURLを別のPCで開いても、その学生のサーバには接続しない。
-->

---

# 円が表示されたら成功

薄い灰色のキャンバスに、白い円が表示されます。

<div class="columns">
<div>
<img class="photo" style="max-height:300px" src="/figures/first-sketch-canvas.png" alt="first-sketch.tsを実行した400×300のキャンバスと中央の円" />
<p class="caption">listings/chapter01/first-sketch.ts<br>400 × 300のキャンバス</p>
</div>
<div>
<p class="check">確認：円が見える。</p>
<p>ここまでで、教材を動かす準備ができました。</p>
<p><strong>今はプログラムの全行を理解しなくて大丈夫です。</strong></p>
</div>
</div>

<!--
冒頭の実画面に戻して比較するか、講師が実ブラウザを見せる。ここでは同じスクリーンショットを重複配置しない。
first-sketch.ts: createCanvas(400,300), background(240), circle(200,150,80)を照合。
-->

---

# 開発サーバは、動かしたままにする

このターミナルは、ブラウザへプログラムを届け続けています。

<div class="flow">
<div class="node"><b>PowerShell</b><span>npm run devが動作中<br>そのまま開いておく</span></div>
<div class="arrow">→</div>
<div class="node green"><b>ブラウザ</b><span>プログラムを受け取る<br>保存した変更を確認する</span></div>
</div>

<p class="warning">次の命令を入力したいときは、新しいターミナルを開きます。</p>
<p class="small">作業が終わったら、このターミナルで Ctrl + C を押して止めます。</p>

<!--
入力待ちに戻らないのは故障ではない。server実行中の行にcdやnpm installを続けて貼らない。
-->

---

# index.htmlが、プログラムの入口

ブラウザでURLを開くと、まず <code>typescript-p5/index.html</code> を読み込みます。

<div class="flow compact">
<div class="node"><b>index.html</b><span>実行先のファイルを指定</span></div>
<div class="arrow">→</div>
<div class="node"><b>first-sketch.ts</b><span>図形を描くプログラム</span></div>
<div class="arrow">→</div>
<div class="node green"><b>ブラウザ</b><span>p5.jsで円を描く</span></div>
</div>

<p class="small">開発サーバは、TypeScriptをブラウザで実行できるJavaScriptへ変換して届けます。</p>
<p class="warning">index.htmlをダブルクリックするのではなく、LocalのURLを開きます。</p>

<!--
ブラウザがTypeScriptの型注釈を直接解釈するという誤解を避ける。
Viteは表示のための変換を行うが、型チェックとは別。npm run checkは補足。
-->

---

# index.htmlで、実行先を確認する

VS Codeの左側から <code>typescript-p5 → index.html</code> を開きます。

~~~html
<script
  type="module"
  src="/listings/chapter01/first-sketch.ts">
</script>
~~~

<p><code>src="…"</code> の中が、読み込むプログラムの場所です。</p>
<p class="small">読みやすいように改行しています。手元のファイルでは1行の場合があります。</p>
<p class="check">確認：first-sketch.tsが指定されている。</p>

<!--
ブラウザやPowerShellではなくVS Codeのエディタを操作する。ファイルは教材内のindex.html。
授業でHTML全体の講義はせず、srcだけを変更する。
-->

---

# 別のサンプルに切り替える

既存の <code>src</code> の値を変更し、<strong>Ctrl + S</strong>で保存します。

~~~html
<script
  type="module"
  src="/listings/chapter01/first-ballon-game.ts">
</script>
~~~

<p>ブラウザへ戻り、風船が表示されることを確認しましょう。</p>
<p class="warning">scriptを追加せず、既にある実行先を1か所だけ書き換えます。</p>

<!--
ファイル名はリポジトリに合わせてballonのまま。balloonへ勝手に直さない。
画像images/ballon.pngは同梱。src/main.tsにコードをコピーしない。
-->

---

# 風船ゲームを試してみる

風船が現れるまで少し待ち、クリックしてみましょう。

<div class="photo-layout">
<img class="photo" src="/figures/ballon-game.png" alt="サンプルの風船ゲームの実行画面" />
<div>
<p>風船が動き、クリックすると消えます。</p>
<p><strong>プログラムの内容は、今は理解しなくて構いません。</strong></p>
<p class="small">画像、配列、関数、クラスなどは、この先の章で学びます。</p>
</div>
</div>

<!--
元プログラム: typescript-p5/listings/chapter01/first-ballon-game.ts。
実行画面は実際のサンプルから取得する。ゲームのルールを勝手に付け加えない。
-->

---

# 次の授業で、最初に行うこと

教材や道具を入れ直さず、次の順で再開します。

<div class="steps">
<div><b>1</b><p>VS Codeで、取得済みの教材フォルダを開く</p></div>
<div><b>2</b><p>新しいPowerShellで <code>cd typescript-p5</code></p></div>
<div><b>3</b><p><code>npm run dev</code> を実行し、LocalのURLを開く</p></div>
</div>

<p class="small">pwdの末尾が既にtypescript-p5なら、2の移動は不要です。</p>

<!--
毎回cloneやinstallを行わせない。index.htmlには前回の実行先が残るため、授業のサンプルへ必要に応じて切り替える。
-->

---

# 初回・毎回・作業の節目

操作するタイミングを、この表で整理しておきましょう。

| タイミング | 行うこと |
|---|---|
| PCごとに原則1回 | VS Code・Node.js・Gitのインストール |
| 教材の準備時に原則1回 | git clone、npm install |
| 作業を始めるたび | フォルダを開く、npm run dev、ブラウザを開く |
| 編集したとき | Ctrl + Sでファイルを保存 |
| 意味のある作業の節目 | Gitでコミットする（補足） |

<!--
依存関係の更新やPCの変更では再準備が必要になる例外がある。細かい例外は教員が判断。
学習目標はこの表を使って次回再開できること。
-->

---

# 今日の確認

自分でできたことを確認しましょう。

<div class="steps">
<div><b>1</b><p>VS Code・Node.js・Gitの役割を、短く説明できる</p></div>
<div><b>2</b><p>教材を取得し、円または風船を表示できた</p></div>
<div><b>3</b><p>次回、どのフォルダから何を実行するか分かる</p></div>
</div>

<p class="check">次の章では、図形を描く命令を少しずつ使っていきます。</p>

<!--
本編の終了。以降は時間に応じた編集・Git記録の実習と、必要なときに参照する補足。
Windowsのインストール実習には時間差が大きいため、無理に全補足を同日に行わない。
-->

---
class: section
---

<p class="section-number">補足</p>

# 少し変更する・困ったとき

<p class="lead">授業の進度や、自分の状況に合わせて使いましょう。</p>
<p>自分のプログラム / Gitへの記録 / よくあるエラー</p>

<!--
本編とは別枠。セットアップに時間がかかった学生には、次回以降に回してよい。
-->

---

# 自分のコピーを作る

サンプルの原本は残し、<code>workspace</code> にコピーして変更します。

<div class="flow compact">
<div class="node"><b>listings/chapter01</b><span>first-sketch.ts<br>教材の原本</span></div>
<div class="arrow">→</div>
<div class="node green"><b>workspace</b><span>first-sketch.ts<br>自分が変更するもの</span></div>
</div>

<p>VS Codeで原本を選び <strong>Ctrl + C</strong>。<br>同じ <code>typescript-p5</code> 内の <code>workspace</code> を選び <strong>Ctrl + V</strong>。</p>
<p class="small">同名の自分のファイルが既にある場合は、上書きせず担当者に相談してください。</p>

<!--
ドラッグで移動して原本が消える事故を避ける。コピーを使う。
学生用READMEと本文のworkspace方針に従う。
-->

---

# 自分のコピーを実行先にする

<code>typescript-p5/index.html</code> の <code>src</code> を変更して保存します。

~~~html
<script
  type="module"
  src="/workspace/first-sketch.ts">
</script>
~~~

<p class="check">以後は workspace/first-sketch.ts を編集します。</p>
<p class="warning">ファイルを作っただけでは、実行する対象は切り替わりません。</p>

<!--
「編集するもの」「実行するもの」の不一致がよくある。index.htmlのsrcと開いているタブのパスを照合。
-->

---

# 円の大きさを変えてみる

<code>workspace/first-sketch.ts</code> を開き、円を描く1行を探します。

<div class="columns">
<div>
<h2>変更前</h2>

~~~ts
p.circle(200, 150, 80);
~~~

</div>
<div>
<h2>変更後</h2>

~~~ts
p.circle(200, 150, 120);
~~~

</div>
</div>

<p>最後の数値を変更して <strong>Ctrl + S</strong>。ブラウザで結果を見ます。</p>
<p class="check">確認：円が大きくなった。他の行は、今は変更しなくて構いません。</p>

<!--
既存サンプルの一行の抜粋。完全なスケッチを省略したものとして示す。
引数の詳しい意味は第2章。型注釈など初登場構文をここで一度に説明しない。
-->

---

# Gitに記録する前の準備

Gitへの記録に使う名前とメールアドレスを、最初に設定します。

<div class="command-long">

~~~powershell
git config --global user.name "Taro Student"
git config --global user.email "taro@example.com"
~~~

</div>

<p><code>Taro Student</code> と <code>taro@example.com</code> を、<strong>自分の情報</strong>に置き換えます。</p>
<p class="small">メールは授業で利用してよいものを使います。引用符は残します。</p>
<p class="warning">共用PCでは個人設定を勝手に変更せず、担当者に確認してください。</p>

<!--
自分専用のPCを前提に--globalを示す。認証やGitHubアカウント作成ではない。
記録を公開した場合に名前・メールが含まれることは必要に応じ補足する。
参考: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup
-->

---

# 変更をGitに記録する

開発サーバとは別のターミナルを開き、教材のルートで実行します。

<p class="place">現在地：typescript-p5js-programming-textbook</p>

<div class="command-long">

~~~powershell
git status
git add typescript-p5/index.html
git add typescript-p5/workspace/first-sketch.ts
git commit -m "最初のスケッチを変更"
~~~

</div>

<p class="small">pwdで現在地を確認。末尾がtypescript-p5なら、先に <code>cd ..</code> で戻ります。</p>
<p class="check">コミットは手元への記録です。GitHubに自動送信されるわけではありません。</p>

<!--
git statusでこの2ファイルの変更があることを確認してからadd。行を一括貼り付けせず結果を見ながら進む。
ここではpushしない。GitHub共同作業は対象外。
-->

---

# 命令が「認識されない」とき

まず、インストール後にVS Codeを開き直したか確認します。

<div class="steps">
<div><b>1</b><p>インストーラーが完了したことを確かめる</p></div>
<div><b>2</b><p>VS Codeをすべて閉じて開き直し、新しいターミナルで試す</p></div>
<div><b>3</b><p>直らなければ、エラーメッセージを残して担当者に相談する</p></div>
</div>

<p class="small">必要に応じてWindowsを再起動します。自己判断でPATHを大量に書き換えません。</p>

<!--
例: node、npm、gitが見つからない。単なる入力の綴り間違いも確認する。
PCの管理ポリシーによる制約とインストール忘れを分ける。
-->

---

# npm.ps1が実行できないとき

「スクリプトの実行が無効」と出た場合は、実行ポリシーが関係することがあります。

<p>担当者に画面を見せ、許可された環境では次の方法を試します。</p>

~~~powershell
npm.cmd -v
npm.cmd install
npm.cmd run dev
~~~

<p class="small">最初は番号の確認だけ。installとrun devは、typescript-p5で行います。</p>
<p class="warning">Windowsの安全設定を、自己判断で無効にしないでください。</p>

<!--
npm.cmdはWindows向けのコマンドファイルを明示する方法。これで組織の禁止事項を回避してよいという意味ではない。
上の三行を無条件にまとめて実行させず、必要な命令だけを使う。
参考: https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence
-->

---

# package.jsonが見つからないとき

多くの場合、npmを実行している場所が違います。

<pre class="path-tree">typescript-p5js-programming-textbook
└─ <mark>typescript-p5　← ここで実行</mark>
   └─ package.json</pre>

~~~powershell
pwd
ls package.json
~~~

<p class="check">教材ルートにいるなら cd typescript-p5。移動後にもう一度確認します。</p>

<!--
このエラーに対してnpm initを実行したり、package.jsonを新しく作ったりしない。
既存のファイルを探すことが解決策。
-->

---

# ブラウザに表示されないとき

まず、URLと開発サーバを確認します。

| 状況 | 確認すること |
|---|---|
| サイトに接続できない | npm run devが動作中か。LocalのURLと同じか |
| 真っ白な画面になった | VS Codeやターミナルにエラーが出ていないか |
| 別のサンプルが表示される | index.htmlのsrcが、目的のファイルか |
| 変更が反映されない | 編集したファイルが実行先と同じか。保存したか |

<p class="warning">直らないときは、画面を閉じずに担当者に見せてください。</p>

<!--
DevToolsは今すぐ全員に教えなくてよい。担当者が必要時にConsoleのエラーを確認。
空白の画面をインストール失敗と決めつけない。
-->

---

# 型の間違いを調べるとき

表示できたことと、型の間違いがないことは、別に確認します。

<p class="place">別のPowerShell / 現在地：typescript-p5</p>

~~~powershell
npm run check
~~~

<p>エラーが出たら、<strong>ファイル名・行番号・メッセージ</strong>を確認します。</p>
<p class="small">別の未完成の課題が表示される場合もあります。ファイル名を先に読みましょう。</p>
<p class="check">コードの書き方は、次の章から少しずつ学びます。</p>

<!--
npm run devはViteの変換、npm run checkはTypeScript検査。workspaceも検査対象。
エラーメッセージをコピーして相談できるよう促す。
-->

---

# 終了と、次回へのメモ

自分の作業を残してから、開発サーバを止めましょう。

<div class="steps">
<div><b>1</b><p>編集したファイルを Ctrl + S で保存する</p></div>
<div><b>2</b><p>npm run devのターミナルで Ctrl + C を押す</p></div>
<div><b>3</b><p>次回開くフォルダと、実行したファイル名を控える</p></div>
</div>

<p class="small">変更を記録する実習まで進んだ場合は、Gitのコミットも確認してください。</p>

<!--
終了確認が出た場合は画面の案内に従う。サーバを閉じても保存済みファイルは消えない。
配布PDFでも、この一枚だけで終了手順を確認できる構成。
-->
