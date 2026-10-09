---
theme: default
title: "第2章 図形を描く"
info: "神奈川工科大学 授業用スライド / 準備済みのWindows環境"
author: "HISASHI SATO"
lang: ja
favicon: /figures/simple-face.png
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
exportFilename: lecture02-drawing-shapes
---

<p class="university">情報メディア学科　情報メディアワーク基礎（火曜日3現）</p>

# 図形を描く

<div class="cover-rule"></div>
<p class="lead">第2章 / 数値で位置と大きさを指定する</p>
<p>円や線を組み合わせて、自分の絵を描いてみましょう。</p>

<!--
第1章の環境構築、教材取得、npm installまで完了している学生を対象とする。
本文: chapters/chapter02-drawing-shapes.tex。今日は新しいインストールを行わない。
-->

---

# 今日の完成例

この顔も、円・三角形・線を組み合わせて描けます。

<div class="lesson-grid">
<img class="result tall" src="/figures/simple-face.png" alt="大きな円に2つの目、三角形の鼻、線の口を描いたサンプルの実行結果" />
<div>
<p>大きな円 → 顔の輪郭</p>
<p>小さな円 → 左右の目</p>
<p>三角形 → 鼻</p>
<p>線 → 口</p>
<p class="file">chapter02/simple-face.ts</p>
</div>
</div>

<!--
まず完成結果を見せ、どんな図形が含まれているか学生に挙げてもらう。
関数名を暗記するより、絵を部品に分けることを今日の目標として伝える。
-->

---

# 今日の進め方

サンプルの数値を少しずつ変えて、結果を確かめます。

<div class="steps">
<div><b>01</b><p>スケッチを実行し、コードの読み方を復習</p></div>
<div><b>02</b><p>座標と引数を図で確認し、基本図形を描く</p></div>
<div><b>03</b><p>描画順を工夫して、自分の絵を作る</p></div>
</div>

<p class="check">予想してから実行すると、変化の理由が見つけやすくなります。</p>

<!--
一度に全部を理解しようとしなくてよい。分からない記号は復習ページに戻れる。
長い授業では、円・楕円・長方形の練習が終わった時点で休憩を入れられる。
-->

---

# 実習の再開

前回取得した教材を使います。取得やインストールのやり直しは不要です。

1. VS Codeで、前回の教材フォルダを開きます。
2. メニューの「ターミナル」→「新しいターミナル」を選びます。
3. PowerShellで、現在のフォルダを確認します。

```powershell
Get-Location
```

<p class="check">フォルダ名だけでなく、表示されたパスの末尾を確認しましょう。</p>

<!--
VS Codeの最近使った項目から開いてもよい。リポジトリの一番上を開いている場合とtypescript-p5を開いている場合があるので、次のページで分岐させる。
準備が終わっていない学生には第1章を案内する。この章でcloneやinstallを全員に繰り返させない。
-->

---

# 開発サーバを起動する場所

末尾が教材フォルダ名の場合だけ、次で移動します。

```powershell
cd typescript-p5
```

末尾がすでに `typescript-p5` なら、移動せずに起動します。

```powershell
npm run dev
```

<p class="small">ターミナルに表示された <code>Local:</code> のURLをブラウザで開きます。<br>前回と同じ番号とは限りません。サーバのターミナルは開いたままにします。</p>

<!--
同じプロジェクトの開発サーバがすでに動いている学生は、そのLocal URLを使えばよい。
PowerShellがnpm.ps1の実行を拒否する場合はnpm.cmd run devを使う。セキュリティ設定を変更させない。
-->

---

# 実行するファイルの選択

`typescript-p5/index.html` の既存の `script` 要素を変更します。

```html
<script
  type="module"
  src="/listings/chapter02/points-and-lines.ts"
></script>
```

<p class="check">新しく追加せず、既存の1つを書き換えます。<br><code>Ctrl + S</code> で保存し、ブラウザに切り替えます。</p>

<p class="small"><code>src</code> は「実行するファイルの場所」です。<br>先頭の <code>/</code> は、この開発サーバでは <code>typescript-p5</code> を基準にします。</p>

<!--
VS Codeのエクスプローラーからindex.htmlを開き、src属性を指す。
改行せず1行で書いても同じ。ブラウザにindex.htmlを直接ドラッグするのではなく、LocalのURLから開く。
-->

---

# ここまでの実行結果

3つの点と、左上から右下へ向かう線が表示されます。

<div class="lesson-grid">
<img class="result" src="/figures/points-and-lines.png" alt="3つの黒い点が斜めの細い線分上に並ぶ実行結果" />
<div>
<p>この画面が出れば、実習を始められます。</p>
<p>まだ数値の意味は分からなくても大丈夫です。</p>
<p class="file">chapter02/points-and-lines.ts</p>
</div>
</div>

<!--
ここで全員の画面を確認してから進む。点が線の上にあること、灰色の範囲がキャンバスであることを指す。
表示されない場合は補足のトラブル対応へ。周囲の白いブラウザ領域とは区別する。
-->

---

# 自分で編集するコピー

元のサンプルを残すため、VS Codeでコピーを作ります。

1. `listings/chapter02/points-and-lines.ts` を選択して `Ctrl + C`。
2. `workspace` フォルダを選択して `Ctrl + V`。
3. コピーの名前を `my-shapes.ts` に変更します。

<pre class="path-tree">typescript-p5/
  listings/chapter02/points-and-lines.ts  ← 元のサンプル
  workspace/<mark>my-shapes.ts</mark>                ← 自分で編集</pre>

<p class="small">同名のファイルがある場合は上書きせず、別の名前にします。</p>

<!--
タブ内のコードではなく、左側エクスプローラーのファイル名を選択してコピーする。
WindowsではF2または右クリックの名前変更を使う。拡張子.tsを消さない。
-->

---

# コピーを実行する設定

`index.html` の実行先も、コピーに合わせます。

```html
<script
  type="module"
  src="/workspace/my-shapes.ts"
></script>
```

<div class="flow compact">
<div class="node"><b>編集する</b><span>workspace/my-shapes.ts</span></div>
<div class="arrow">→</div>
<div class="node"><b>保存する</b><span>Ctrl + S</span></div>
<div class="arrow">→</div>
<div class="node green"><b>結果を見る</b><span>ブラウザ</span></div>
</div>

<!--
以後の小さな変更はmy-shapes.tsで行う。コード片をindex.htmlに書かないことを確認する。
同名ファイルを避け別名で保存した学生はsrcもその名前に合わせる。通常、保存時にブラウザが更新される。
-->

---

# コードの外枠と中身

外枠は今はそのまま使い、`setup` の中の描画命令を読みます。

<div class="template">

```ts {4-7}
import p5 from "p5";
const sketch = (p: p5): void => {
  p.setup = (): void => {
    p.createCanvas(400, 300);
    p.background(250);
    p.strokeWeight(8);
    p.point(80, 80);
  };
};
new p5(sketch);
```

</div>

<p class="small"><code>setup</code> は、開始時に一度だけ実行されます。この例は点1つに絞ったものです。</p>

<!--
importはp5.jsを取り込む、new p5(sketch)はスケッチを開始するための部分として扱う。
: p5や: voidはTypeScriptの型の指定。意味の詳細は後の章で扱い、現時点で完全理解を求めない。
この完全な短縮例は元サンプルそのものではなく説明用。以後の断片はsetup内部と明示する。
-->

---

# 括弧とインデント

波括弧 `{ }` は処理のまとまり、字下げはその内側を示します。

```ts
p.setup = (): void => {
  p.createCanvas(400, 300);
  p.background(250);
  p.circle(200, 150, 80);
};
```

<p class="small"><code>;</code>（セミコロン）は文の区切りです。本書では文の終わりに付けます。</p>

<div class="pair">
<div><h2><code>{ }</code> の対応</h2><p>始まりと終わりを組にします。</p></div>
<div><h2>同じ深さの行</h2><p>同じまとまりの中の命令です。</p></div>
</div>

<!--
外枠全体の説明を繰り返さずsetupだけ抜粋。字下げ自体が処理を決めるのではなく、括弧の対応を読みやすくすることを説明する。
セミコロンは文の区切り。本書のサンプルでは文の終わりに付ける。
-->

---

# 関数呼び出しと引数

丸括弧 `( )` の中の値を、順番に命令へ渡します。

<div class="reading"><span class="blue">p.circle</span>(<span class="red">200, 150, 80</span>);</div>

<div class="pair">
<div><h2>関数の名前</h2><p><code>p.circle</code><br>円を描く命令を選びます。</p></div>
<div><h2>引数（ひきすう）</h2><p><code>200, 150, 80</code><br>位置や大きさを伝えます。</p></div>
</div>

<p class="check">引数はコンマで区切ります。個数と順番に意味があります。</p>

<!--
pはこのサンプルでスケッチに付けた名前。instance modeではp.circleのように使う。
引数の意味はこの後の円の図で再説明する。p自体が言語の予約語だとは説明しない。
-->

---

# const・let・代入と比較

今は読み分けられれば十分です。詳しくは第4章・第6章で扱います。

| 書き方 | 読み方 |
| --- | --- |
| `const` | あとから別の値を代入しない名前を作る |
| `let` | あとから値を変えられる変数を作る |
| `circleX = 200;` | 右側の値を左側へ代入する |
| `circleX === 200` | 値が等しいかを比較する |

<p class="small"><code>=</code> は代入、<code>===</code> は比較です。<br>この章の描画では、まず座標の数値を直接指定して練習します。</p>

<!--
circleXは変数名の例。断片を単独実行する練習ではない。
constがオブジェクトの中身を不変にするという誤解は与えず、再代入しないと表現する。
-->

---

# コメントとエラーの手掛かり

`//` から右は人が読む説明です。処理としては実行されません。

```ts
// キャンバスの中央に円を描く
p.circle(200, 150, 80);
```

<div class="steps">
<div><b>1</b><p>赤い波線にマウスを重ね、メッセージを読む</p></div>
<div><b>2</b><p>ファイル名・行番号と、その前後を確認する</p></div>
<div><b>3</b><p>括弧・コンマ・名前を直し、保存して再確認する</p></div>
</div>

<!--
英語をすべて訳すことを求めない。最初のエラーから確認する。
エラー行そのものではなく、直前の行の閉じ括弧不足が原因のこともある。コメントに目的を書く習慣を促す。
-->

---

# キャンバスの幅と高さ

図を描く領域を「キャンバス」と呼びます。

```ts
p.createCanvas(400, 300);
```

<div class="lesson-grid">
<ShapeDiagram kind="coords" />
<div>
<p>最初の <strong>400</strong> → 幅</p>
<p>次の <strong>300</strong> → 高さ</p>
<p>単位はピクセル。<br>画面上の長さを表します。</p>
</div>
</div>

<!--
座標図は表示用に縮尺を変えている。ブラウザの画面全体ではなくcreateCanvasで作った領域が対象。
上端400と下端300は領域の寸法を示す。画面の実ピクセル密度はここでは扱わない。
-->

---

# 左上が原点、下向きがプラス

座標は `(x, y)` の順に読みます。

<div class="lesson-grid">
<ShapeDiagram kind="coords" />
<div>
<p><strong>x</strong>：右に進むほど大きい</p>
<p><strong>y</strong>：下に進むほど大きい</p>
<p class="warning">数学のグラフと違い、<br>yの増える向きは下です。</p>
</div>
</div>

<!--
原点から右に200、そこから下に150と、指を動かして説明する。
xとyを同時に理解させず、横方向だけ、次に縦方向と順に示す。
-->

---

# 確認：点を右へ動かすには？

次の点を、下には動かさず右へ100だけ動かしたいとします。

```ts
p.point(80, 80);
```

<div class="exercise">
<p>A　<code>p.point(180, 80);</code></p>
<p>B　<code>p.point(80, 180);</code></p>
<p>C　<code>p.point(180, 180);</code></p>
</div>

<p>どの値が横方向を表しているか、考えてみましょう。</p>

<!--
30秒ほど待つ。正解を急いで表示せず、隣の学生に理由を説明してもらってもよい。
-->

---

# 答え：最初の値だけを増やす

正解はAです。xだけを80から180に変えます。

<div class="lesson-grid">
<div>

```ts
// 変更前
p.point(80, 80);

// 右へ100移動
p.point(180, 80);
```

</div>
<div>
<img class="result short" src="/figures/point-right.png" alt="xを100増やした点が、同じ高さのまま右へ移動した比較用実行結果" />
<p class="caption">説明用の実行例。左が変更前、右が変更後。</p>
</div>
</div>

<p class="check">Bは下へ100、Cは右と下へ100ずつ動きます。</p>

<!--
比較画像は同じsetup内で変更前後の2点を描いたもの。実習で1行を書き換えれば点は1つだけ移動する。
元サンプルの最初のpointだけ変えると、線は元の位置に残る。点と線は別の命令である。
-->

---

# 点を見やすくする

`strokeWeight` は、その後に描く点や線の太さを指定します。

<div class="lesson-grid">
<div>

```ts
p.strokeWeight(8);
p.point(80, 80);
```

<p>点が小さくて見えないときは、<br>太さを確認します。</p>
<p class="small">以下のコード片は、<code>setup</code> の中へ書く部分です。</p>
</div>
<div>
<img class="result short" src="/figures/weight-points.png" alt="太さ2、8、16の順に大きくなる3つの点" />
<p class="caption">左から strokeWeight(2)、(8)、(16)</p>
</div>
</div>

<!--
strokeWeightを呼び出すだけでは点は描かれない。次のpointで使われる設定であると説明する。
色や塗りつぶしの指定は第3章。今回は黒い線と白い図形のままでよい。
-->

---

# 線分は2つの点をつなぐ

始点の `(x, y)` と終点の `(x, y)` を指定します。

<div class="reading">p.line(<span class="blue">80, 80</span>, <span class="red">320, 220</span>);</div>

<div class="lesson-grid">
<ShapeDiagram kind="line" />
<div>
<p><strong>最初の2つ</strong> → 始点</p>
<p><strong>次の2つ</strong> → 終点</p>
<p>4つの数値を、<br>2つずつの組で読みます。</p>
</div>
</div>

<!--
図の色は説明用。実際のサンプルの線は黒い。2点を結ぶ線分であり、画面端まで無限に伸びる直線ではない。
-->

---

# 点を太く、線を細く

設定は上から順に変わります。すでに描いた点は変わりません。

<div class="lesson-grid">
<div>

```ts
p.strokeWeight(8);
p.point(80, 80);
p.point(200, 150);
p.point(320, 220);

p.strokeWeight(2);
p.line(80, 80, 320, 220);
```

</div>
<div>
<img class="result" src="/figures/points-and-lines.png" alt="太い3つの点と細い線の組み合わせ" />
<p class="file">chapter02/points-and-lines.ts（抜粋）</p>
</div>
</div>

<!--
strokeWeightの8は点用、2は線用という区別を指す。あとから太さを変えても過去に描いたものにさかのぼって適用されない。
-->

---

# 練習：横線と縦線

`my-shapes.ts` の `setup` 内で、点や線の命令を次に置き換えます。

```ts
p.strokeWeight(4);
p.line(80, 80, 320, 80);
p.line(200, 40, 200, 240);
```

<div class="exercise">
<p>実行する前に、どちらが横線か予想してください。</p>
<p>その後、保存して結果を確認しましょう。</p>
</div>

<p class="small"><code>createCanvas(400, 300)</code> と <code>background(250)</code>、外枠は残します。</p>

<!--
置換範囲を講師が画面で示す。外枠ごと消さないように確認する。
分かった学生には、線の交点の座標を考えてもらう。
-->

---

# 横線はyが同じ、縦線はxが同じ

始点と終点で、変わらない座標を探します。

<div class="lesson-grid">
<img class="result" src="/figures/cross-lines.png" alt="yが80の水平線とxが200の垂直線が交わる実行結果" />
<div>
<p><code>(80, 80) → (320, 80)</code><br>yが80のまま → 横線</p>
<p><code>(200, 40) → (200, 240)</code><br>xが200のまま → 縦線</p>
<p class="check">交点は <code>(200, 80)</code> です。</p>
</div>
</div>

<!--
正誤だけでなく理由を確認する。交点をpointで追加するのもよい。
次から別サンプルに切り替えるので、今のファイルは保存して残す。
-->

---

# 円・楕円・長方形のサンプル

次のファイルを `workspace` にコピーし、同じ名前で保存します。

<p class="file">listings/chapter02/ellipses-and-rectangles.ts</p>

<div class="lesson-grid">
<img class="result" src="/figures/ellipses-and-rectangles.png" alt="横長の楕円、円、縦長の長方形の実行結果" />
<div>
<p><code>index.html</code> の <code>src</code> を変更します。</p>
<pre class="output small">/workspace/ellipses-and-rectangles.ts</pre>
<p class="small">保存して、この3つの図形が出ればOKです。</p>
</div>
</div>

<!--
srcの値は/workspace/ellipses-and-rectangles.ts。
元のファイルではなくworkspace側を開いているか確認。同名が存在する場合は別名にしsrcも合わせる。
-->

---

# 円の位置と直径

`circle` の引数は「中心のx、中心のy、直径」の順です。

<div class="reading">p.circle(<span class="red">300, 120</span>, <span class="blue">100</span>);</div>

<div class="lesson-grid">
<ShapeDiagram kind="circle" />
<div>
<p>中心：<code>(300, 120)</code></p>
<p>直径：<code>100</code> ピクセル</p>
<p class="warning">3つ目は半径ではありません。<br>半径は50になります。</p>
</div>
</div>

<!--
中心座標は左端や上端ではない。図は引数の役割の説明用で、画面上の座標をそのまま配置したものではない。
半径と直径は片側と端から端の違いとして、専門的な数式を増やさず説明する。
-->

---

# 確認：位置を変えずに大きくする

中心をそのままに、円の直径を100から160へ変えます。

```ts
p.circle(300, 120, 100);
```

<div class="exercise">
<p>どの数値を変更しますか？</p>
<p>円は右側だけに広がるでしょうか。左右に広がるでしょうか。</p>
</div>

<p>予想してから、コピーしたサンプルで試してみましょう。</p>

<!--
別の図形に重なる場合があるが失敗ではない。円の中心位置と大きさを切り分けて考えさせる。
-->

---

# 答え：中心は同じまま広がる

3つ目だけを変更します。中心から左右・上下へ広がります。

<div class="lesson-grid">
<div>

```ts
// 変更前
p.circle(300, 120, 100);
```

<img class="result short" src="/figures/ellipses-and-rectangles.png" alt="変更前の直径100の円を含む3図形" />
</div>
<div>

```ts
// 変更後
p.circle(300, 120, 160);
```

<img class="result short" src="/figures/circle-larger.png" alt="中心が同じまま直径160へ広がり、後から描く長方形と一部重なった円" />
</div>
</div>

<!--
実際の変更版サンプルの実行結果。右の長方形と重なる部分が出る。描画順については後で説明する。
-->

---

# 楕円の幅と高さ

`ellipse` は、横と縦の大きさを別々に指定します。

<div class="reading">p.ellipse(<span class="red">120, 120</span>, <span class="blue">160, 120</span>);</div>

<div class="lesson-grid">
<ShapeDiagram kind="ellipse" />
<div>
<p>最初の2つ → 中心の座標</p>
<p>3つ目 → 幅</p>
<p>4つ目 → 高さ</p>
<p class="small">幅が高さより大きいと、横長になります。</p>
</div>
</div>

<!--
前半の120,120は位置、後半160,120は大きさ。同じ120でも役割が異なることを確認する。
-->

---

# 練習：横長から縦長へ

楕円の幅と高さを入れ替えてみましょう。

<div class="lesson-grid">
<div>

```ts
// 横長
p.ellipse(120, 120, 160, 120);

// 縦長
p.ellipse(120, 120, 120, 160);
```

<p>上の行を下の行へ書き換えます。<br>2行を重ねて実行するのではありません。</p>
</div>
<div>
<img class="result" src="/figures/ellipse-tall.png" alt="幅120、高さ160に変えた縦長の楕円と円と長方形" />
<p class="caption">変更後の実行結果</p>
</div>
</div>

<!--
一度に変更しすぎない。円を先に大きくした学生は、その違いが残っていてもよい。
ここに掲載した画像では円は元の直径100に戻している。講師はどこを比較するか楕円を指す。
-->

---

# 長方形は左上を指定する

`rect` の最初の2つは、中心ではなく左上の座標です。

<div class="reading">p.rect(<span class="red">360, 70</span>, <span class="blue">80, 100</span>);</div>

<div class="lesson-grid">
<ShapeDiagram kind="rect" />
<div>
<p>左上：<code>(360, 70)</code></p>
<p>幅：80、高さ：100</p>
<p>右端：360 + 80 = 440</p>
<p>下端：70 + 100 = 170</p>
</div>
</div>

<!--
この章の初期設定CORNERでの説明。rectModeなどを導入せず、既定の描き方として扱う。
長方形の外側の幅と高さの補助線は図の説明であり、実行結果には現れない。
-->

---

# 円と長方形の基準位置

同じ `(200, 150)` を指定しても、置かれ方が違います。

<div class="lesson-grid">
<div>

```ts
p.circle(200, 150, 100);
```

<img class="result short" src="/figures/anchor-circle.png" alt="200,150を中心に描かれた直径100の円" />
<p class="caption">中心が (200, 150)</p>
</div>
<div>

```ts
p.rect(200, 150, 100, 100);
```

<img class="result short" src="/figures/anchor-rect.png" alt="200,150を左上に描かれた幅100高さ100の正方形" />
<p class="caption">左上が (200, 150)</p>
</div>
</div>

<!--
比較画像はどちらも400x300のキャンバス。図形の画面上の位置を比べる。
この比較は初期設定であり、描画モードを変更すれば基準位置も変わることは必要に応じて口頭補足にとどめる。
-->

---

# ここまでの整理

「位置」と「大きさ」を分けて読むと、数値の役割が見えてきます。

| 命令 | 位置 | 大きさ |
| --- | --- | --- |
| `p.circle(x, y, d)` | 中心のx、y | 直径d |
| `p.ellipse(x, y, w, h)` | 中心のx、y | 幅w、高さh |
| `p.rect(x, y, w, h)` | 左上のx、y | 幅w、高さh |

<p class="check">ここでの <code>x, y, d, w, h</code> は引数の役割を示す記号です。<br>実際の練習では、その場所に数値を書きます。</p>

<!--
未定義変数xなどをそのまま入力させないための注意。コード表を丸暗記させず前の図に戻って確認できることを伝える。
-->

---

# 練習：3つの図形を変更する

コピーした `ellipses-and-rectangles.ts` で、1つずつ試します。

<div class="steps">
<div><b>1</b><p>円を、上へ20ピクセル動かす</p></div>
<div><b>2</b><p>楕円を、幅120・高さ120にする</p></div>
<div><b>3</b><p>長方形を、左上の位置を変えずに幅60にする</p></div>
</div>

<p class="check">1つ変更したら保存し、どこが変わったかを確認しましょう。</p>

<!--
この練習では元サンプルの値を基準にする。前の変更を残している学生は、元ファイルの該当行を見て戻してから行う。
-->

---

# 変更例と確認する場所

元サンプルから変更した場合、次のようになります。

<div class="lesson-grid">
<div>

```ts
p.ellipse(120, 120, 120, 120);
p.circle(300, 100, 100);
p.rect(360, 70, 60, 100);
```

<p>円：yを120 → 100</p>
<p>楕円：幅と高さを同じに</p>
<p>長方形：幅80 → 60</p>
</div>
<div>
<img class="result" src="/figures/shapes-exercise.png" alt="円が上へ移動し、楕円が円になり、長方形が細くなった実行結果" />
</div>
</div>

<!--
楕円の幅と高さが等しくなると円になる。元の円と新しい円が並んでいるが命令はellipseとcircleで異なる。
-->

---

# 三角形・四角形のサンプル

次のファイルを `workspace` にコピーして実行先を切り替えます。

<p class="file">listings/chapter02/triangles-and-quads.ts</p>

<div class="lesson-grid">
<img class="result" src="/figures/triangles-and-quads.png" alt="1つの三角形と、2つの傾いた四角形の実行結果" />
<div>
<p><code>index.html</code> の <code>src</code>：</p>
<pre class="output small">/workspace/triangles-and-quads.ts</pre>
<p class="small">図形の角を「頂点」と呼びます。</p>
</div>
</div>

<!--
前のファイルを残すので後から比較できる。実行先の変更を忘れると編集した結果が反映されない。
-->

---

# 三角形は3つの頂点

6つの数値を、3組の `(x, y)` として読みます。

<div class="reading">p.triangle(<span class="blue">30, 120</span>, <span class="red">80, 30</span>, <span class="green">130, 120</span>);</div>

<div class="lesson-grid">
<ShapeDiagram kind="triangle" />
<div>
<p>① 左下の頂点</p>
<p>② 上の頂点</p>
<p>③ 右下の頂点</p>
<p class="small">最後の頂点と最初の頂点も、自動でつながります。</p>
</div>
</div>

<!--
番号は引数の順番を表す。実際の画面に番号は描かれない。
表記のx1,y1などを暗記する前に、座標2つで点1つを表すことを再確認する。
-->

---

# 練習：上の頂点を下へ動かす

2番目の頂点のyを、30から70に変更します。

<div class="lesson-grid">
<div>

```ts
p.triangle(
  30, 120,
  80, 70,
  130, 120
);
```

<p>図形は高くなるでしょうか。<br>低くなるでしょうか。</p>
</div>
<div>
<img class="result" src="/figures/triangle-lower.png" alt="上の頂点が下がって背の低くなった三角形と2つの四角形" />
<p class="caption">変更後。頂点が下がり、背の低い三角形になります。</p>
</div>
</div>

<!--
改行しても引数の順番は同じ。長い行は頂点ごとに区切ると読みやすい。
予想の時間を取るときは右側を口頭でまだ見ないよう案内し、必要なら講師がコードだけ先に示す。
-->

---

# 四角形は4つの頂点

`quad` は、4組の座標を周囲に沿って指定します。

<div class="lesson-grid">
<div>

```ts
p.quad(
  250, 80,
  360, 110,
  330, 240,
  220, 210
);
```

<p class="small">最後は自動で最初につながります。</p>
</div>
<ShapeDiagram kind="quad" />
</div>

<!--
rectは左上と大きさ、quadは4つの頂点で指定する点が異なる。
頂点の順番を飛ばすと交差する形になる場合がある。まず周囲を順になぞる基本形で練習する。
-->

---

# rectとquadの使い分け

作りたい形に合わせて、指定しやすい命令を選びます。

<div class="pair">
<div><h2>rect</h2><p>左上と幅・高さを指定。</p><p>辺が横・縦に並ぶ<br>長方形を描くのに便利です。</p></div>
<div><h2>quad</h2><p>4つの頂点を指定。</p><p>台形や傾いた四角形など、<br>角の位置を個別に決められます。</p></div>
</div>

<p class="exercise">確認：屋根のような三角形には、どの命令を使いますか？</p>

<!--
ここまでに回転などを導入していない状態での使い分け。答えはtriangle。
自由制作の際に適した命令を選べればよく、quadで長方形を書いても間違いではない。
-->

---

# 描く順番のサンプル

次のファイルを `workspace` にコピーして実行先を切り替えます。

<p class="file">listings/chapter02/drawing-order.ts</p>

<div class="lesson-grid">
<img class="result" src="/figures/drawing-order.png" alt="長方形の手前に円が重なっている実行結果" />
<div>
<p><code>index.html</code> の <code>src</code>：</p>
<pre class="output small">/workspace/drawing-order.ts</pre>
<p>重なった部分では、<br>円が手前に見えます。</p>
</div>
</div>

<!--
この節では座標や大きさを変更せず、命令の順番だけを変える。
-->

---

# 後から描いた図形が手前になる

上から順に実行し、先に描いた図形へ重ねて描きます。

<div class="lesson-grid">
<div>

```ts
p.rect(80, 70, 180, 80);
p.circle(220, 130, 130);
```

<img class="result short" src="/figures/drawing-order.png" alt="長方形、円の順に描いた結果" />
<p class="caption">円が手前</p>
</div>
<div>

```ts
p.circle(220, 130, 130);
p.rect(80, 70, 180, 80);
```

<img class="result short" src="/figures/order-reversed.png" alt="円、長方形の順に描いた結果" />
<p class="caption">長方形が手前</p>
</div>
</div>

<!--
円や長方形が常に優先されるのではなく順番で決まる。線だけでなく白い塗りつぶしも上書きする。
ここで実際に2行を入れ替え、保存して比較してもらう。
-->

---

# backgroundを書く位置

`background(250)` は、キャンバス全体を明るい灰色で塗ります。

<div class="lesson-grid">
<div>

```ts
p.background(250);
p.circle(200, 120, 100);
```

<img class="result short" src="/figures/background-first.png" alt="背景の後に円を描くと円が見える" />
</div>
<div>

```ts
p.circle(200, 120, 100);
p.background(250);
```

<img class="result short" src="/figures/background-last.png" alt="円の後で背景を塗ると灰色一色になり円が見えない" />
</div>
</div>

<p class="small">背景を最後に塗ると、その前に描いた図形を覆ってしまいます。</p>

<!--
どちらも400x240のキャンバス。右の空白は画像欠落ではなく正しい実行結果。
0が黒、255が白であることは必要なら補足し、色の本格的な説明は第3章へつなげる。
-->

---

# 顔を描くサンプル

最後は `simple-face.ts` をコピーして、部品を組み合わせます。

<div class="lesson-grid">
<img class="result tall" src="/figures/simple-face.png" alt="基本図形を組み合わせた顔の完成画面" />
<div>
<p class="file">listings/chapter02/simple-face.ts</p>
<p><code>workspace</code> にコピーし、<br><code>index.html</code> の <code>src</code> を変更。</p>
<pre class="output small">/workspace/simple-face.ts</pre>
<p class="small">キャンバスは400 × 400です。<br>まずは元の顔を表示しましょう。</p>
</div>
</div>

<!--
コピーと実行先切り替えの反復。ここまでの編集結果は別ファイルで残っている。
-->

---

# 部品1：顔の輪郭

最初に大きな円を描き、その上に目や鼻を重ねます。

<div class="lesson-grid">
<div>

```ts
p.circle(200, 190, 220);
```

<p>中心：<code>(200, 190)</code></p>
<p>直径：220</p>
<p class="small">ここからの3ページは、<br>完成までを順に示しています。</p>
</div>
<img class="result tall" src="/figures/face-outline.png" alt="最初の大きな円だけを描いた顔の輪郭" />
</div>

<!--
説明用に段階表示した実行結果。学生は完成コードを削らず、対応する1行を探してよい。
-->

---

# 部品2：左右の目

yと直径をそろえ、xだけを左右に分けます。

<div class="lesson-grid">
<div>

```ts
p.circle(155, 160, 35);
p.circle(245, 160, 35);
```

<p>左右とも y = 160</p>
<p>左右とも 直径 = 35</p>
<p>中心のx = 200から<br>左右に45ずつ離れています。</p>
</div>
<img class="result tall" src="/figures/face-eyes.png" alt="輪郭に左右同じ高さの2つの円の目を加えた顔" />
</div>

<!--
左右対称を式で抽象化するのはまだ先でよい。数値を見比べ、同じものと異なるものを探させる。
-->

---

# 部品3：鼻と口

三角形と線を加えると、顔として見えるようになります。

<div class="lesson-grid">
<div>

```ts
p.triangle(
  200, 185,
  180, 225,
  220, 225
);
p.line(155, 270, 245, 270);
```

<p class="small">口の両端はyが同じなので、水平な線になります。</p>
</div>
<img class="result tall" src="/figures/simple-face.png" alt="鼻と口を加えた顔の完成形" />
</div>

<!--
三角形は上、左下、右下の順。輪郭を最後に描くと、白い塗りつぶしで目や鼻を覆うことを次の問いにつなぐ。
-->

---

# 確認：輪郭を最後に描くと？

顔の大きな円を、目・鼻・口の後に描いたとします。

<div class="exercise">
<p>A　顔の部品はすべて同じように見える</p>
<p>B　目・鼻・口が大きな円に隠れる</p>
</div>

<p>「後から描いた図形が手前になる」を使って考えてください。</p>

<!--
答えは次ページ。円は枠線だけでなく内部も白く塗られる初期設定である。
-->

---

# 答え：細かい部品が隠れる

正解はBです。輪郭の円が、内側の目・鼻・口を覆います。

<div class="lesson-grid">
<div>
<img class="result" src="/figures/simple-face.png" alt="輪郭を最初に描いた完成形" />
<p class="caption">輪郭 → 目 → 鼻 → 口</p>
</div>
<div>
<img class="result" src="/figures/face-outline-last.png" alt="大きな円を最後に描いたため顔の部品が隠れた結果" />
<p class="caption">目 → 鼻 → 口 → 輪郭</p>
</div>
</div>

<!--
この配置では口も輪郭の内側にあるため隠れる。線を消したのではなく上から塗って見えなくなっている。
-->

---

# 練習：自分の顔に変えてみよう

`workspace/simple-face.ts` の数値を変更してみましょう。

<div class="steps">
<div><b>1</b><p>左右の目を、同じ大きさのまま少し大きくする</p></div>
<div><b>2</b><p>口を、今より短くする</p></div>
<div><b>3</b><p>目や鼻の位置を変えて、違う表情にする</p></div>
</div>

<p class="check">1回に変える場所を絞り、予想と結果を比べましょう。</p>

<!--
基礎層は1だけでも達成。早い学生にはlineの両端のyを変えて斜めの口にするなどを促す。
色を変える課題や変数を使う課題はまだ必須にしない。
-->

---

# 制作：図形で小さな絵を描く

家・乗り物・ロボットなど、描きたいものを基本図形に分けます。

<div class="lesson-grid">
<img class="result" src="/figures/house-example.png" alt="長方形の壁、三角形の屋根、長方形の扉と窓で作った家の制作例" />
<div>
<p>まず紙に簡単な下書き。</p>
<p>大きな部品から順に描き、<br>最後に小さな部品を加えます。</p>
<p class="small">左は制作例です。<br>同じものを作る必要はありません。</p>
</div>
</div>

<!--
描き始める前に使う図形と座標を紙で考える。制作例の家はchapter02の既存サンプルではなく、既習命令のみの追加例。
自由制作の保存先はworkspace内の別名.ts。既存コピーを複製して外枠を使い、index.htmlのsrcを新しい名前に合わせる。
-->

---

# 制作の確認ポイント

完成したら、隣の人に「どこを工夫したか」を説明してみましょう。

- 円・線・長方形など、複数の図形を使っている。
- 図形がキャンバスの中に収まっている。
- 重なり方が意図したものになっている。
- 少なくとも1か所に、意図が分かるコメントを書いている。
- ファイルを保存し、ブラウザで結果を確認している。

<p class="small">挑戦：窓を増やす、左右対称にする、背景の部品を加えるなど。<br>難しい命令を増やすより、今ある図形の組み合わせを工夫しましょう。</p>

<!--
制作の最低条件を共有し、絵の上手さで評価しない。座標の意図、変更と確認ができたかを見る。
提出方法は授業のLMSの指示に従う。架空の提出先は指定しない。
-->

---

# 今日のまとめ

数値の役割が分かると、図形を自分の意図で配置できます。

<div class="steps">
<div><b>1</b><p>座標は <code>(x, y)</code>。右・下へ進むほど値が大きい</p></div>
<div><b>2</b><p>引数は順番が大切。位置と大きさを分けて読む</p></div>
<div><b>3</b><p>後から描いた図形が手前。大きな部品から組み立てる</p></div>
</div>

<p class="check">次の第3章では、色・枠線・塗りつぶしを変えていきます。</p>

<!--
本編はここまで。残りは必要なときに参照する補足。最後に編集したファイル名を学生に答えてもらうと、実行先の理解を確認できる。
-->

---

# 補足：変更しても画面が変わらない

まず、編集したファイルと実行しているファイルが同じか確認します。

<div class="flow compact">
<div class="node"><b>VS Codeのタブ</b><span>編集したファイル名</span></div>
<div class="arrow">↔</div>
<div class="node"><b>index.html</b><span>srcに書いたファイル名</span></div>
</div>

1. `listings` と `workspace` のどちらを開いているか確認。
2. 編集したファイルと `index.html` を保存。
3. 開発サーバの `Local:` と、ブラウザのURLを比較。

<!--
同名ファイルのタブにマウスを重ねるとフルパスを確認できる。必要ならブラウザを再読み込みする。
サーバを何個も起動することを解決策にしない。
-->

---

# 補足：図形が見えない

エラーがなくても、位置や描く順番で見えなくなる場合があります。

<div class="lesson-grid">
<ShapeDiagram kind="offscreen" />
<div>
<p>座標がキャンバスの外では？</p>
<p>直径や幅・高さが0では？</p>
<p>後の図形に隠れていない？</p>
<p><code>background</code> が最後では？</p>
</div>
</div>

<!--
図の点線の円は、本来のキャンバス外に置かれた位置を説明するもの。実際の表示では外側は描かれない。
中央に大きめの図形を1つ描く形へ戻して確かめると切り分けやすい。
-->

---

# 補足：記号や名前の間違い

全角の記号や、大文字・小文字の違いにも注意します。

| 確認するところ | この章の書き方 |
| --- | --- |
| 命令の前 | `p.circle(...)` のように `p.` を付ける |
| 引数の区切り | 半角のコンマ `,` |
| 括弧 | 半角の `( )` と `{ }` の対応 |
| 大文字・小文字 | `circle`、`strokeWeight` |

<p class="check">分からなければ、エラーの画面を先生に見せましょう。</p>

<!--
括弧の閉じ忘れが後ろの行のエラーにつながることも説明する。
スクリーンショットを撮る場合はエラーメッセージと該当行が分かるようにする。
-->

---

# 補足：作業を終えるとき

保存してから、開発サーバを停止します。

1. 編集したファイルを `Ctrl + S` で保存。
2. サーバが動いているターミナルで `Ctrl + C`。
3. 次回使うファイル名を確認。

<p class="check">ファイルの保存と、Gitのコミットは別の操作です。</p>
<p class="small">Gitで記録するときは、第1章・Git付録を参照し、<code>git status</code> で変更を確認します。<br>授業で指定されたファイルだけを記録しましょう。</p>

<!--
Windowsで終了確認が出たら内容を確認して応答する。保存だけでGitHubに送信されるわけではない。
コミットや提出は授業の運用に合わせる。ここでgit add .を一律に指示しない。
-->
