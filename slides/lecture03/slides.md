---
theme: default
title: "第3章 色と見た目を変える"
info: "神奈川工科大学 授業用スライド / Windows・PowerShell"
author: "HISASHI SATO"
lang: ja
favicon: /figures/colored-face.png
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
exportFilename: lecture03-color-and-style
---

<p class="university">情報メディア学科　情報メディアワーク基礎（火曜日3現）</p>

# 色と見た目を変える

<div class="cover-rule"></div>
<p class="lead">第3章 / 色・枠線・透明度を指定する</p>
<p>同じ図形でも、見た目を変えると違う印象になります。</p>

<!--
本文: chapters/chapter03-color-and-style.tex。第2章の図形と座標を前提とする。
準備済みの学生は本編から。教材未取得の学生には巻末補足を案内する。
-->

---

# 今日の完成例

第2章の顔に色や太い線を加え、見た目を変えます。

<div class="lesson-grid">
<div><img class="result" src="/figures/face-monochrome.png" alt="第2章の白い輪郭と目、三角形の鼻、線の口" /><p class="caption">第2章：simple-face.ts</p>
</div>
<div><img class="result" src="/figures/colored-face.png" alt="第3章の薄い黄色の顔、暗い目、薄い赤い鼻、水色の背景" /><p class="caption">第3章：colored-face.ts（口の位置も少し異なります）</p>
</div>
</div>

<!--
左右の違いを学生に探してもらう。色、枠線の太さ、目の塗り、背景。口は第2章がy270、第3章がy260であるため同じ座標だとは言わない。
-->

---

# 今日の進め方

図形の形はそのままにして、色や線の指定を少しずつ変えます。

<div class="steps">
<div><b>1</b><p>RGBで色を指定し、塗りと枠線を区別する</p>
</div>
<div><b>2</b><p>設定が残ることを、命令の順番に沿って確かめる</p>
</div>
<div><b>3</b><p>透明度と配色を試し、小さな作品を作る</p>
</div>
</div>

<p class="check">予想 → 数値を1つ変える → 保存 → 結果を見る、の順で進めます。</p>

<!--
色の数値を暗記することは目標にしない。自分の予想と実行結果を比較できるようにする。
-->

---

# 前回の実習を再開する

VS Codeで教材を開き、「ターミナル」→「新しいターミナル」を選びます。

```powershell
Get-Location
```

現在の場所が教材の一番上なら、`cd typescript-p5` で移動します。<br>
すでに `typescript-p5` にいる場合は、移動せずに起動します。

```powershell
npm run dev
```

<p class="small">表示された <code>Local:</code> のURLを開きます。すでに起動中なら、そのURLを使います。<br>まだ教材を取得していない場合は、巻末の補足へ進んでください。</p>

<!--
cloneやnpm installは毎回の操作ではない。PowerShellでnpm.ps1が拒否される場合はnpm.cmd run devを使い、セキュリティ設定を変えさせない。
-->

---

# 編集するファイルをコピーする

元のサンプルを残し、`workspace` の中に自分用のコピーを作ります。

1. VS Codeで `listings/chapter03/rgb-colors.ts` を選び、`Ctrl + C`。
2. `workspace` を選んで `Ctrl + V`。
3. コピーを `my-colors.ts` という名前に変更。

<pre class="path-tree">typescript-p5/
  listings/chapter03/rgb-colors.ts  ← 元のサンプル
  workspace/<mark>my-colors.ts</mark>           ← 自分で編集</pre>

<p class="small">同名のファイルがある場合は上書きせず、別の名前にします。</p>

<!--
エクスプローラーのファイル名を選んでコピーする。コード本文だけをコピーしている学生がいないか確認。
この章でも編集対象はsrc/main.tsではない。
-->

---

# コピーを実行する設定

`typescript-p5/index.html` の既存の `script` 要素を変更します。

```html
<script
  type="module"
  src="/workspace/my-colors.ts"
></script>
```

<p class="check">要素を追加せず、実行先を書き換えます。<code>Ctrl + S</code> で保存。</p>
<p>これから編集するのは <code>workspace/my-colors.ts</code> です。</p>

<!--
srcはサーバのルートtypescript-p5を基準にしたパス。別名を使った学生はその名前に合わせる。
コード片をindex.htmlに書かず、TypeScriptファイルを編集することを確認する。
-->

---

# 最初の実行結果

赤・緑・青系の円が3つ表示されれば、実習を始められます。

<div class="lesson-grid">
<img class="result" src="/figures/rgb-colors.png" alt="左から赤、緑、青系の円が並ぶrgb-colors.tsの実行結果" />
<div><p>円の形と位置は第2章の内容。</p><p>今回は、円を描く前の<br><code>p.fill(...)</code> に注目します。</p><p class="file">chapter03/rgb-colors.ts</p>
</div>
</div>

<!--
全員の表示を確認する時間。サンプルの緑は0,180,0、青は0,80,255であり、純粋な原色値とは異なる。
-->

---

# 外枠はそのまま使う

`setup` の中で、色を指定してから図形を描きます。

<div class="template">

```ts {6-7}
import p5 from "p5";
const sketch = (p: p5): void => {
  p.setup = (): void => {
    p.createCanvas(420, 180);
    p.background(245);
    p.fill(255, 0, 0);
    p.circle(100, 90, 90);
  };
};
new p5(sketch);
```

</div>

<p class="small">円1つに絞った説明用の例です。以降のコード片は、主に <code>setup</code> 内の抜粋です。</p>

<!--
importや: p5、: voidを削らない。TypeScriptの型の仕組みをここで掘り下げず、前章の定型部分を使う。
fillは設定、circleは描画という役割の違いを強調。
-->

---

# RGBは赤・緑・青の強さ

画面の色を、3つの成分の組み合わせで指定します。

<div class="lesson-grid">
<ColorDiagram kind="rgb" />
<div><p><strong>R</strong>：Red（赤）</p><p><strong>G</strong>：Green（緑）</p><p><strong>B</strong>：Blue（青）</p><p class="small">この章の標準設定では、<br>各成分を0〜255で指定します。</p>
</div>
</div>

<!--
バーは255,80,0の例。数値が大きいほどその光の成分が強い。絵の具を混ぜる操作とは異なる。
colorModeで範囲を変える話や小数0〜1による指定はこの章のスライドでは導入しない。
-->

---

# 引数の順番はR・G・B

赤を強くし、緑と青を0にすると赤になります。

<div class="reading">p.fill(<span class="red">255</span>, <span class="green">0</span>, <span class="blue">0</span>);</div>

<div class="pair">
<div><h2>色の指定</h2><p><code>p.fill(255, 0, 0);</code><br>次に描く図形の内側を赤に設定。</p>
</div>
<div><h2>図形の描画</h2><p><code>p.circle(100, 90, 90);</code><br>設定された赤で円を描く。</p>
</div>
</div>

<p class="check"><code>fill</code> だけでは図形は出ません。描画命令も必要です。</p>

<!--
fillは英語で塗りつぶすという意味だが、p5.jsでは現在の塗り設定を変える命令。既存図形をまとめて塗り替える命令ではない。
-->

---

# RGBの色見本

数値を手掛かりに、どの成分を組み合わせたか確かめましょう。

<div class="swatches">
<div><div class="swatch" style="background:rgb(255,0,0)"></div><p>赤<br><code>(255, 0, 0)</code></p>
</div>
<div><div class="swatch" style="background:rgb(0,255,0)"></div><p>緑<br><code>(0, 255, 0)</code></p>
</div>
<div><div class="swatch" style="background:rgb(0,0,255)"></div><p>青<br><code>(0, 0, 255)</code></p>
</div>
<div><div class="swatch" style="background:rgb(255,255,0)"></div><p>黄<br><code>(255, 255, 0)</code></p>
</div>
<div><div class="swatch" style="background:rgb(0,255,255)"></div><p>シアン<br><code>(0, 255, 255)</code></p>
</div>
<div><div class="swatch" style="background:rgb(255,0,255)"></div><p>マゼンタ<br><code>(255, 0, 255)</code></p>
</div>
</div>

<!--
色覚の違いやプロジェクタの色再現に配慮し、色名と数値を必ず一緒に読む。
ここは光の成分を指定した結果。後で扱う半透明の図形の重ね合わせとは同一の計算ではない。
-->

---

# RGBを動かして色を作る

R・G・Bの強さを変えると、円の色と`fill`の数値が対応して変わります。

<ColorDemo mode="rgb" />

<!--
まずRだけ、次にGだけを変え、どの引数に対応するか確認する。
黄を選んでBを少しずつ増やし、白へ近づく様子も示す。絵の具の混色ではなくRGBの成分値の指定。
PDFは初期値(255, 80, 0)の静止表示。デモの操作用コード自体を学生が理解する必要はない。
-->

---

# 確認：最初の円を黄色にするには？

`my-colors.ts` の最初の `fill` だけを変更します。

```ts
p.fill(255, 0, 0);
p.circle(100, 90, 90);
```

<div class="exercise"><p>A　<code>p.fill(255, 255, 0);</code></p><p>B　<code>p.fill(0, 255, 255);</code></p><p>C　<code>p.fill(255, 0, 255);</code></p>
</div>

<!--
色見本へ戻って調べてもよい。30秒程度予想の時間を取り、その後保存して確認。
座標まで一度に変えると比較しづらいため、今回はfillだけ。
-->

---

# 答え：赤と緑を強くする

正解はAです。3つの引数のうち、緑の値だけを変えます。

<div class="lesson-grid">
<div>

```ts
p.fill(255, 255, 0);
p.circle(100, 90, 90);
```

<p>位置も大きさも変わらず、<br>左の円が黄色になります。</p>
<p class="small">Bはシアン、Cはマゼンタです。</p>
</div>
<img class="result" src="/figures/rgb-yellow.png" alt="左の円だけが赤から黄色に変わり、残りの緑と青は変わらない実行結果" />
</div>

<!--
後ろにそれぞれfillがあるため、他の円は変わらない。設定が残る詳しい説明は後半へ。
-->

---

# 灰色は引数1つで指定できる

RGBが同じ値になる色は、1つの数値で指定できます。

<p><code>p.fill(130);</code> と <code>p.fill(130, 130, 130);</code> は、同じ灰色になります。</p>

<div class="swatches">
<div><div class="swatch" style="background:rgb(0,0,0)"></div><p>0：黒</p>
</div>
<div><div class="swatch" style="background:rgb(130,130,130)"></div><p>130：灰色</p>
</div>
<div><div class="swatch" style="background:rgb(255,255,255)"></div><p>255：白</p>
</div>
</div>

<p class="check">数値が小さいほど暗く、大きいほど明るくなります。</p>

<!--
どちらか一方の命令を使う。両方を入力する必要はない。
1引数の255は白。3引数の255,0,0は赤であり、引数の個数にも意味がある。
-->

---

# 灰色のサンプルを試す

`grayscale-colors.ts` を `workspace` にコピーして実行します。

<p class="file">index.htmlのsrc：/workspace/grayscale-colors.ts</p>

<div class="lesson-grid">
<div>

```ts
p.fill(30);
p.rect(50, 50, 80, 80);
p.fill(130);
p.rect(170, 50, 80, 80);
p.fill(220);
p.rect(290, 50, 80, 80);
```

</div>
<div><img class="result short" src="/figures/grayscale-colors.png" alt="左から暗い灰色、中くらいの灰色、明るい灰色の3つの正方形" /><p class="caption">chapter03/grayscale-colors.ts</p>
</div>
</div>

<!--
元ファイルの場所はlistings/chapter03/。同名コピーがある場合は上書きせず別名としsrcも合わせる。
全ての背景は白。枠線があるので明るい灰色でも輪郭を確認できる。
-->

---

# 背景色と図形の色は別

`background` はキャンバス全体を塗ります。

<div class="lesson-grid">
<div>

```ts
// 背景を暗い灰色へ変更
p.background(80);
```

<p><code>fill</code> は図形の内側。<br><code>background</code> は背景全体。</p>
<p class="small">練習：255 → 80 → 0と変更し、同じ図形の見え方を比べましょう。</p>
</div>
<img class="result" src="/figures/gray-background.png" alt="暗い背景に同じ3つの灰色の正方形が並び、見え方が変わる実行結果" />
</div>

<!--
背景は図形より前に描く。最後にbackgroundを書くと図形を覆うことは第2章で説明済み。
数値が同じ図形でも背景との対比で見え方が変わることを確認する。
-->

---

# 図形の内側と輪郭

内側の色と、輪郭の色・太さを別々に指定できます。

<ColorDiagram kind="parts" />

<p class="check">塗りつぶし：<code>fill</code>　枠線：<code>stroke</code>　太さ：<code>strokeWeight</code></p>

<!--
図の黄色い内側と青い枠線を別々に指す。図の矢印は説明用で、実行結果には含まれない。
-->

---

# 塗りと枠線を組み合わせる

`fill-and-stroke.ts` をコピーし、実行先を切り替えます。

<p class="file">index.htmlのsrc：/workspace/fill-and-stroke.ts</p>

<div class="lesson-grid">
<div>

```ts
p.stroke(30, 90, 180);
p.strokeWeight(6);
p.fill(255, 210, 80);
p.circle(130, 110, 120);
```

<p class="small">円の前に、枠線・太さ・塗りを設定します。</p>
</div>
<img class="result" src="/figures/fill-and-stroke.png" alt="青い枠線と黄色の円、赤い枠線と緑の正方形" />
</div>

<!--
コードは左の円の部分のみ。右の正方形の設定はサンプルの後半にある。
-->

---

# 線の色にはstrokeを使う

`line` で描く線には、塗りつぶしの内側がありません。

<div class="lesson-grid">
<div>

```ts
p.stroke(180, 40, 70);
p.strokeWeight(6);
p.line(60, 120, 360, 120);
```

<p><code>line</code> と <code>point</code> の色には、<code>stroke</code> が使われます。</p>
<p class="small"><code>fill</code> を変えても、線の色は変わりません。</p>
</div>
<div><img class="result" src="/figures/line-color.png" alt="strokeで赤紫の色を指定し、太さ6で描いた水平線" /><p class="caption">線の色はstroke、太さはstrokeWeight</p>
</div>
</div>

<!--
後で顔の口の色を変える場面につながる。コード片はsetupの中で試す例。
-->

---

# 枠線の太さを比べる

円の前の `strokeWeight(6)` を `strokeWeight(18)` に変更します。

<div class="lesson-grid">
<div><img class="result" src="/figures/fill-and-stroke.png" alt="変更前、円の青い枠線の太さは6" /><p class="caption">変更前：円の枠線は6</p>
</div>
<div><img class="result" src="/figures/stroke-thick.png" alt="変更後、円の青い枠線が18に太くなり、正方形は変わらない" /><p class="caption">変更後：円の枠線は18</p>
</div>
</div>

<p class="small">正方形の前には別の太さの設定があるため、正方形は変わりません。</p>

<!--
右の正方形にはstrokeWeight(12)がある。すべての線が18になるのではない。
-->

---

# 練習：内側と枠線を別々に変える

コピーした `fill-and-stroke.ts` の円を変更します。

<div class="steps">
<div><b>1</b><p>内側を赤へ：<code>fill(255, 0, 0)</code></p>
</div>
<div><b>2</b><p>枠線を黒へ：<code>stroke(0)</code></p>
</div>
<div><b>3</b><p>枠線を細く：<code>strokeWeight(2)</code></p>
</div>
</div>

<p class="check">コードでは前に <code>p.</code> を付けます。1か所ずつ変更して保存しましょう。</p>

<!--
指示は関数名、実際のコードはp.fill等と区別する。正方形の命令まで一緒に変えない。
課題に成功した学生には正方形も別の配色にしてよいと伝える。
-->

---

# 塗らない指定はnoFill

`noFill()` は、これから描く図形の内側を塗らない設定です。

<div class="lesson-grid">
<div>

```ts
p.background(120, 180, 220);
p.noFill();
p.stroke(0);
p.strokeWeight(4);
p.circle(210, 120, 150);
```

<p class="small">引数がなくても <code>()</code> を書きます。</p>
</div>
<img class="result" src="/figures/no-fill.png" alt="水色の背景が内側からも見える黒い輪郭だけの円" />
</div>

<!--
noFillは背景を消す命令ではない。既に描かれたものを変更せず、今後の描画に適用する。
-->

---

# 白く塗ることと、塗らないこと

背景に色があると、違いがはっきり分かります。

<div class="lesson-grid">
<div>

```ts
p.fill(255);
```

<img class="result short" src="/figures/white-fill.png" alt="水色の背景の上に内側を白く塗った円" />

<p class="caption">白が背景を覆う</p>
</div>
<div>

```ts
p.noFill();
```

<img class="result short" src="/figures/no-fill.png" alt="塗らないため水色の背景が円の内側にも見える" />

<p class="caption">内側を塗らず、背景が見える</p>
</div>
</div>

<!--
白背景だけで比較すると違いが分かりにくいので、水色背景を使う。
透明と白は別であることを、後半のアルファ値にもつなぐ。
-->

---

# 枠線を描かない指定はnoStroke

`noStroke()` は、これから描く図形の枠線を描かない設定です。

<div class="lesson-grid">
<div>

```ts
p.fill(255, 210, 80);
p.noStroke();
p.circle(210, 120, 150);
```

<p>塗りつぶしだけの円です。</p>
<p class="small">枠線は消えても、塗りは残ります。</p>
</div>
<img class="result" src="/figures/fill-only.png" alt="黒い枠線のない黄色い円" />
</div>

<!--
noStrokeの後にlineを呼ぶと線が見えなくなることは必要なら口頭で補足。
設定の戻し方は次のページ群で説明する。
-->

---

# 線だけ・塗りだけのサンプル

`no-fill-and-no-stroke.ts` をコピーして実行します。

<p class="file">index.htmlのsrc：/workspace/no-fill-and-no-stroke.ts</p>

<div class="lesson-grid">
<img class="result" src="/figures/no-fill-and-no-stroke.png" alt="左は黒い枠線だけ、右は水色の塗りだけの円" />
<div><p>左：<code>noFill()</code><br>線だけの円</p><p>右：<code>fill(...)</code> で塗りを戻し、<code>noStroke()</code><br>塗りだけの円</p>
</div>
</div>

<!--
右の円ではfillを呼び直しているため、noFillのままではない。元ファイルを開いて順番を追わせる。
-->

---

# 塗りや枠線を戻すには

再び色を指定すると、その部分の描画も再開されます。

<div class="pair">
<div><h2>塗りを戻す</h2>

```ts
p.noFill();
// この後は再び塗る
p.fill(100, 180, 240);
```

</div>
<div><h2>枠線を戻す</h2>

```ts
p.noStroke();
// この後は再び線を描く
p.stroke(30, 90, 180);
```

</div>
</div>

<p class="check"><code>strokeWeight</code> で太さを変えるだけでは、<code>noStroke</code> を解除できません。</p>

<!--
塗りと線は独立した設定。noFillの後にstrokeだけ変えても塗りは戻らない。
-->

---

# 確認：両方を描かない設定にすると？

白い背景の上で、この順に実行した場合を考えます。

```ts
p.noFill();
p.noStroke();
p.circle(210, 120, 150);
```

<div class="exercise"><p>A　白い円が見える</p><p>B　黒い枠線だけが見える</p><p>C　円は見えない</p>
</div>

<!--
円の命令がなくなったのではない。描画時に塗りも枠線も無効である。
-->

---

# 答え：円は見えない

正解はCです。枠線を戻せば、次に描く円が見えます。

<div class="lesson-grid">
<div><img class="result short" src="/figures/both-off.png" alt="塗りも線も無効のため円が見えない白いキャンバス" /><p class="caption">塗りも線も描かない設定</p>
</div>
<div><img class="result short" src="/figures/restore-stroke.png" alt="strokeで線を戻した後に円を描くと青い枠線が見える" /><p class="caption">strokeで枠線を戻してから円を描画</p>
</div>
</div>

```ts
p.stroke(30, 90, 180);
p.strokeWeight(6);
p.circle(210, 120, 150);
```

<!--
左の白い画像は読み込み失敗ではなく実行結果。既に描いた円に後から線が付くのではなく、circleをもう一度呼ぶ。
-->

---

# 色の設定は次の図形にも残る

`color-state.ts` をコピーし、設定と描画を順番に追います。

<p class="file">index.htmlのsrc：/workspace/color-state.ts</p>

<div class="lesson-grid">
<div>

```ts
p.fill(255, 120, 80);
p.circle(120, 110, 100);
```

<p>① オレンジ系に設定<br>② その色で円を描く</p>
</div>
<img class="result" src="/figures/state-one.png" alt="最初の設定でオレンジ色の円を1つ描いた段階" />
</div>

<!--
次の2枚と合わせた段階図。学生は元コードを消さず、上から対応する行を指してよい。
-->

---

# 設定を変えずに長方形を描く

間に `fill` がなくても、現在の塗りの設定が使われます。

<div class="lesson-grid">
<div>

```ts
p.fill(255, 120, 80);
p.circle(120, 110, 100);
p.rect(200, 60, 100, 100);
```

<p>③ 長方形もオレンジ系</p>
<p class="check">図形ごとに毎回 <code>fill</code> が必要、というわけではありません。</p>
</div>
<img class="result" src="/figures/state-two.png" alt="円に続いて同じオレンジ色の長方形を描いた段階" />
</div>

<!--
必要なときに設定し直す。初学者が毎回fillを書くこと自体は間違いではないが、残る性質を理解させる。
-->

---

# 青に変更してから次の円を描く

設定を変えても、すでに描いた図形の色は変わりません。

<div class="lesson-grid">
<div>

```ts
p.fill(80, 150, 255);
p.circle(340, 110, 100);
```

<p>④ 青系に設定を変更<br>⑤ 次の円だけが青系になる</p>
<p class="small">先ほどの円と長方形は、<br>オレンジ系のままです。</p>
</div>
<img class="result" src="/figures/color-state.png" alt="最初の円と長方形はオレンジのまま、最後の円だけ青になる完成結果" />
</div>

<!--
fillは図形の属性を後から編集するAPIではない。描く時点の設定が使われ、描画済みのピクセルには遡らない。
-->

---

# 設定と描画を表で追う

「今の塗りの色」を、実行順に確認しましょう。

<div class="trace">
<div class="number">1</div><div><code>fill(255, 120, 80)</code></div><div><span class="dot" style="background:rgb(255,120,80)"></span>オレンジ系に設定</div>
<div class="number">2</div><div><code>circle(...)</code></div><div>その設定で円を描く</div>
<div class="number">3</div><div><code>rect(...)</code></div><div>同じ設定で長方形を描く</div>
<div class="number">4</div><div><code>fill(80, 150, 255)</code></div><div><span class="dot" style="background:rgb(80,150,255)"></span>青系に変更</div>
<div class="number">5</div><div><code>circle(...)</code></div><div>新しい設定で円を描く</div>
</div>

<p class="small">表では引数を一部省略しています。実際のコードはサンプルで確認します。</p>

<!--
表の関数名は説明用にp.を省略。コードとして入力するときはp.が必要。
各行で現在の色を口頭で答えてもらうと理解を確認しやすい。
-->

---

# 確認：最初の設定も青に変えると？

最初の `fill` を青系の値に書き換えた場合です。

```ts
p.fill(80, 150, 255);
p.circle(120, 110, 100);
p.rect(200, 60, 100, 100);
p.fill(80, 150, 255);
p.circle(340, 110, 100);
```

<p class="exercise">3つの図形は、それぞれ何色になりますか？<br>予想してから保存し、実行結果を確認してください。</p>

<!--
答えは全て青系。最初の円だけ変わると答えた学生には、長方形の直前に別の設定があるかを問い直す。
-->

---

# 答え：3つとも青系になる

長方形の前に別の設定がないため、同じ青系で描かれます。

<div class="lesson-grid">
<div><img class="result" src="/figures/color-state.png" alt="元のコードでは円と長方形がオレンジ、最後の円だけ青" /><p class="caption">変更前</p>
</div>
<div><img class="result" src="/figures/state-all-blue.png" alt="変更後は3つとも青い図形" /><p class="caption">最初のfillも青系に変更</p>
</div>
</div>

<!--
最後のfillは同じ色を再指定しているので、なくても結果は同じ。削除の練習は必須にせず、気付いた学生への補足にする。
-->

---

# 色は描く前に指定する

同じ命令でも、順番が違うと結果が変わります。

<div class="lesson-grid">
<div>

```ts
p.fill(255, 0, 0);
p.circle(210, 120, 120);
```

<img class="result short" src="/figures/fill-before.png" alt="fillの後にcircleを呼ぶと赤い円になる" />

<p class="caption">色を設定 → 描く</p>
</div>
<div>

```ts
p.circle(210, 120, 120);
p.fill(255, 0, 0);
```

<img class="result short" src="/figures/fill-after.png" alt="初期設定で描いた白い円は後からfillを呼んでも赤くならない" />

<p class="caption">描く → 設定しても、その円は変わらない</p>
</div>
</div>

<!--
どちらも初期状態から開始した説明用スケッチ。右は初期の塗りが白なので白い円になる。
変更版を既存の設定の後ろへ追記すると初期状態ではなくなる点を補足。
-->

---

# 4つ目の値はアルファ値

RGBの後ろに値を追加すると、不透明度を指定できます。

<div class="reading">p.fill(255, 0, 0, <span class="blue">150</span>);</div>

<ColorDiagram kind="alpha" />

<!--
数値が小さいほど透明。透明度という節名だが、値自体は不透明度を表すことを押さえる。
この章の標準範囲0〜255で説明。省略時は255相当。
-->

---

# 不透明度を動かして比べる

赤い円のアルファ値が大きいほど、下の青い長方形を覆います。

<ColorDemo mode="alpha" />

<!--
まず255で青が隠れることを確認し、128、0と比較する。変えるのは赤い円のfillの4つ目だけ。
青い長方形と白い背景は不透明。0では円の塗りが見えず、noStrokeなので輪郭も残らない。
PDFは128の静止表示。RGBの値自体は変化しないことも説明する。
-->

---

# 半透明の円を重ねる

`transparent-colors.ts` をコピーして実行します。

<p class="file">index.htmlのsrc：/workspace/transparent-colors.ts</p>

<div class="lesson-grid">
<div>

```ts
p.noStroke();
p.fill(255, 0, 0, 150);
p.circle(170, 120, 150);
p.fill(0, 100, 255, 150);
p.circle(250, 120, 150);
```

</div>
<div><img class="result" src="/figures/transparent-colors.png" alt="半透明の赤と青の円が重なり、重なった部分が別の色に見える" /><p class="caption">重なったところでは下の色も見える</p>
</div>
</div>

<!--
最後の150はfillではアルファ値、circleでは直径。同じ数値でも役割が違うので必要に応じて関数名を指す。
-->

---

# アルファ値の大小を比べる

両方の `fill` の4つ目を、同じ値に変えて比べます。

<div class="lesson-grid">
<div><img class="result" src="/figures/alpha-80.png" alt="アルファ値80では淡く透ける赤と青の円" /><p class="caption">80：下の色がよく透ける</p>
</div>
<div><img class="result" src="/figures/alpha-220.png" alt="アルファ値220では濃く不透明に近い赤と青の円" /><p class="caption">220：指定した色が強く見える</p>
</div>
</div>

<p class="check">練習：80 → 150 → 220と変更して、重なった部分を見てみましょう。</p>

<!--
値を変更する場所はfillの最後。circleの直径150と取り違えない。
白背景なので淡く見えるが、どの背景でも必ず白くなるという意味ではない。
-->

---

# 0と255の場合

両方の円を透明にした場合と、不透明にした場合を比較します。

<div class="lesson-grid">
<div><img class="result" src="/figures/alpha-0.png" alt="アルファ値0で塗りが透明、線もないため白い背景だけが見える" /><p class="caption">0：透明。noStrokeなので円は見えない。</p>
</div>
<div><img class="result" src="/figures/alpha-255.png" alt="アルファ値255で赤い円の上を青い円が不透明に覆う" /><p class="caption">255：不透明。後の青が下の赤を覆う。</p>
</div>
</div>

<!--
fillのアルファを0にしてもstrokeまで透明になるわけではない。元サンプルがnoStrokeだから全体が見えないと明示。
-->

---

# 半透明でも描画順が大切

青を後に描く場合と、赤を後に描く場合では、重なる色が変わります。

<div class="lesson-grid">
<div><img class="result" src="/figures/transparent-colors.png" alt="赤の後に青を描いた重なり" /><p class="caption">赤 → 青（両方ともアルファ150）</p>
</div>
<div><img class="result" src="/figures/alpha-reversed.png" alt="青の後に赤を描くと重なった部分が赤寄りになる" /><p class="caption">青 → 赤（両方ともアルファ150）</p>
</div>
</div>

<p class="small">後から描く色と、その場所にある色を混ぜて表示します。RGBの単純な足し算ではありません。</p>

<!--
練習で入れ替えるときはfillとcircleを1組として入れ替える。circleだけ交換すると色と位置の対応が変わる。
計算式の完全理解は要求しない。詳しく知りたい学生には本文の式を案内。
-->

---

# 塗りと枠線の両方を半透明にする

`transparent-color-wrapped.ts` では、4つの大きな円を重ねます。

<p class="file">index.htmlのsrc：/workspace/transparent-color-wrapped.ts</p>

<div class="lesson-grid">
<div>

```ts
p.fill(255, 10, 10, 50);
p.stroke(10, 100, 255, 80);
p.strokeWeight(100);
```

<p class="small">コピーして実行先を切り替えます。<br>円がキャンバスからはみ出すのは、<br>このサンプルの意図した描画です。</p>
</div>
<img class="result" src="/figures/transparent-color-wrapped.png" alt="半透明の赤い塗りと太い青い枠線を持つ4つの大きな円が重なった模様" />
</div>

<!--
難しい計算より、同じ図形の重なりから模様が生まれることを楽しむ例。
fillの50とstrokeの80は別々のアルファ設定。ここでは枠線の太さも100と大きい。
-->

---

# 練習：透明な模様を変える

コピーしたサンプルの設定を、1つずつ変えてみましょう。

<div class="steps">
<div><b>1</b><p>塗りのアルファ値を50から150へ変える</p>
</div>
<div><b>2</b><p>元に戻して、枠線のアルファ値を80から200へ変える</p>
</div>
<div><b>3</b><p>線の太さを100から30へ変える</p>
</div>
</div>

<p class="check">塗り・枠線・重なった部分の、どこが変わったかを説明してみましょう。</p>

<!--
1と2を同時に変えると違いの原因が分かりにくい。最初の値をコメントに残すかCtrl+Zで戻せることを案内。
-->

---

# 顔の部品に色を付ける

`colored-face.ts` をコピーして、部品ごとの設定を読みます。

<p class="file">index.htmlのsrc：/workspace/colored-face.ts</p>

<div class="lesson-grid">
<img class="result tall" src="/figures/colored-face.png" alt="背景、顔、目、鼻、口に異なる色を指定した完成した顔" />
<div><p>背景：薄い水色</p><p>顔：薄い黄色</p><p>目：暗い灰色</p><p>鼻：薄い赤</p><p>口：赤紫の線</p>
</div>
</div>

<!--
単なる色名の暗記ではなく、どの命令がどの部品を担当しているかを探す。
-->

---

# 背景と顔の輪郭

まず背景を塗り、その上へ大きな円を描きます。

<div class="lesson-grid">
<div>

```ts
p.background(230, 240, 255);
p.stroke(60);
p.strokeWeight(4);
p.fill(255, 220, 140);
p.circle(200, 190, 220);
```

<p class="small">枠線は暗い灰色、太さは4。<br>内側は薄い黄色です。</p>
</div>
<img class="result tall" src="/figures/face-outline.png" alt="水色の背景に灰色の太い輪郭と薄い黄色の円を描いた段階" />
</div>

<!--
段階図は完成コードを途中まで実行したもの。学生は完成コードから対応する行を探してよい。
-->

---

# 目は同じ色で2つ描く

目の色を1回設定すれば、左右の円を同じ色で描けます。

```ts
p.fill(40);
p.circle(155, 160, 35);
p.circle(245, 160, 35);
```

<div class="pair">
<div><h2>塗りの色</h2><p>暗い灰色へ変更。<br>2つ目の目にも設定が残ります。</p>
</div>
<div><h2>枠線</h2><p>前の <code>stroke(60)</code> と<br><code>strokeWeight(4)</code> が残ります。</p>
</div>
</div>

<!--
目の色を変えるとき左右のcircleの間にfillがなくてもよい。枠線も持続することを復習する。
-->

---

# 鼻は塗り、口は線の色を変える

使う図形に応じて、変更する設定を選びます。

<div class="lesson-grid">
<div>

```ts
p.fill(255, 160, 120);
p.triangle(
  200, 185,
  180, 225,
  220, 225
);
```

<p class="caption">鼻：三角形の内側の色</p>
</div>
<div>

```ts
p.stroke(120, 60, 80);
p.strokeWeight(6);
p.line(155, 260, 245, 260);
```

<p class="caption">口：線の色と太さ</p>
<p class="small">口を変えるときは、<br><code>fill</code> ではなく <code>stroke</code>。</p>
</div>
</div>

<!--
関数名と見える場所の対応を指す。長いtriangleは頂点ごとに改行しているが引数の順序は元コードと同じ。
-->

---

# 配色を変えた実行例

座標と大きさを変えず、背景・顔・鼻の色だけを変えた例です。

<div class="lesson-grid">
<div><img class="result" src="/figures/colored-face.png" alt="薄い水色の背景と黄色い顔の元サンプル" /><p class="caption">元の配色</p>
</div>
<div><img class="result" src="/figures/face-cool.png" alt="暗い背景と水色の顔、薄紫の鼻に変更した顔" /><p class="caption">別の配色。目や口の見やすさも確認。</p>
</div>
</div>

<!--
変更値は撮影定義に記載。暗い背景35,45,70、顔150,210,240、鼻200,170,240。
印象は人によって異なるので唯一の正解はない。見やすさも試行する。
-->

---

# 制作：同じ絵で2つの配色

第2章で作った絵、または顔のサンプルを使います。

1. `workspace` にコピーを2つ作り、違う名前で保存。
2. 座標を変えず、背景や部品の色を変える。
3. `index.html` の `src` を切り替え、両方を実行して比較。

<div class="exercise"><p>基本：背景・塗り・枠線のうち、2か所以上を変更する。</p><p>挑戦：半透明の図形を加え、重なり方を工夫する。</p>
</div>

<!--
元サンプルや自分の前の作品を上書きしない。画像の上手さではなく、設定の意図と結果の対応を評価する。
ループや変数など未習の構文は要求しない。
-->

---

# 制作の確認ポイント

変更した場所と、そうした理由を説明できるか確認します。

- どの命令が背景・塗り・枠線を担当しているか分かる。
- 色の設定を、対象の図形より前に書いている。
- 設定が次の図形に残ることを考えている。
- 透明度や背景との組み合わせで、図形が見えにくくなっていない。
- 意図が分かる短いコメントを1か所以上に書いた。

<p class="small">提出方法は授業の指示に従ってください。</p>

<!--
色名だけでなく数値と対象箇所を説明してもらう。色覚差で違って見えることを誤答扱いしない。
-->

---

# 今日のまとめ

描く前に設定し、設定がどこまで残るかを考えます。

| 変えたいもの | 使う命令 |
| --- | --- |
| 背景 | `background(...)` |
| 内側の色・塗らない設定 | `fill(...)` / `noFill()` |
| 線の色・描かない設定 | `stroke(...)` / `noStroke()` |
| 線の太さ | `strokeWeight(...)` |

<p class="check">RGBの4つ目はアルファ値。小さいほど透明になります。</p>

<!--
実コードではp.を付ける。次の第4章では数値に名前を付ける変数と型注釈へ進む。
ここで本編終了。以降は教材取得とトラブル対応の補足。
-->

---

# 補足：教材をまだ取得していない場合

Git・Node.js・VS Codeのインストールは、第1章の手順で済ませます。

<div class="pair">
<div><h2>取得済み</h2><p>前回の教材フォルダを開く。<br>もう一度cloneする必要はありません。</p>
</div>
<div><h2>未取得</h2><p>次のページから取得します。<br>学生向けリポジトリを使います。</p>
</div>
</div>

<p class="small">GitHub：教材の配付元。<code>git clone</code>：教材一式を自分のPCへ取得する操作。</p>
<p class="warning">取得済みフォルダを削除したり、作品を上書きしたりしないでください。</p>

<!--
環境構築そのものは第1章の参照とし、ここでは取得から実行までを独立した補足にする。
教員向け-devは使わない。取得済みの更新はローカル変更を確認して別途扱い、一律のpull/resetを指示しない。
-->

---

# 補足：保存する場所を決める

エクスプローラーで、教材を保存するフォルダを開きます。

1. 例として「ドキュメント」に `programming` フォルダを作ります。
2. VS Codeの「ファイル」→「フォルダーを開く」で選びます。
3. 「ターミナル」→「新しいターミナル」を開きます。

```powershell
Get-Location
```

<p class="check">選んだ <code>programming</code> フォルダが表示されれば、次へ進めます。</p>

<!--
ドキュメントがOneDriveの中にある場合など、実際の絶対パスは環境で異なる。固定パスを丸写しさせずVS Codeで選ぶ。
学内指定の保存場所がある場合はそちらを優先する。
-->

---

# 補足：GitHubから教材を取得する

PowerShellに次のコマンドを入力し、Enterを押します。

<div class="command-long">

```powershell
git clone https://github.com/m-riho/typescript-p5js-programming-textbook.git
```

</div>

<div class="flow compact">
<div class="node"><b>GitHub</b><span>学生向けの教材</span></div>
<div class="arrow">→</div>
<div class="node green"><b>自分のPC</b><span>教材フォルダを作成</span></div>
</div>

<p class="small">処理が終わり、次のコマンドを入力できる表示へ戻るまで待ちます。<br>同名フォルダがあるエラーが出たら、削除せず先生に確認してください。</p>

<!--
学生向けの公開リポジトリのHTTPS URL。通常cloneにGitHubアカウントは不要。
ネットワークやプロキシのエラー時に同じコマンドを闇雲に繰り返さない。
-->

---

# 補足：取得した教材をVS Codeで開く

「ファイル」→「フォルダーを開く」で、取得した教材フォルダを選びます。

<pre class="path-tree">programming/
  <mark>typescript-p5js-programming-textbook/</mark>
    typescript-p5/
      index.html
      package.json
      listings/
      workspace/</pre>

<p class="small">教材フォルダを開き直した後、新しいターミナルを開きます。<br>信頼の確認が出た場合は、取得元と内容を確認して判断します。</p>

<!--
VS Codeのウィンドウが別に開いた場合は、教材のエクスプローラーが見えるウィンドウを使う。
READMEしか見えない場合はtypescript-p5の三角をクリックして展開する。
-->

---

# 補足：必要なライブラリを準備する

ターミナルの場所を確認し、`typescript-p5` へ移動します。

```powershell
Get-Location
cd typescript-p5
npm install
```

<p class="small">すでに <code>typescript-p5</code> にいる場合は、<code>cd</code> を省略します。</p>
<p class="check"><code>npm install</code> は、必要なライブラリを取り込む初回の準備です。<br>完了して、次のコマンドを入力できるまで待ちます。</p>

<!--
ライブラリとはプログラムから利用する機能のまとまり。ここではp5.jsやViteなど。
npm installで表示される通知とエラーを混同しない。ERRORや失敗終了の場合は次へ進まず確認する。
-->

---

# 補足：サーバを起動してサンプルへ

同じターミナルで、開発サーバを起動します。

```powershell
npm run dev
```

1. 表示された `Local:` のURLをブラウザで開きます。
2. 本編の「編集するファイルをコピーする」へ戻ります。
3. コピーと `index.html` の実行先を合わせ、保存します。

<p class="small">このサーバを動かすターミナルは、実習中は開いたままにします。<br>サンプルを変えるたびにサーバを起動し直す必要はありません。</p>

<!--
port5173とは限らないので実際のLocalを使う。HTMLを直接ダブルクリックして開く方法ではない。
-->

---

# 補足：コマンドで止まったとき

メッセージの内容に合わせて、確認する場所を変えます。

| 表示・状況 | 確認すること |
| --- | --- |
| `git` が見つからない | Gitの導入を確認し、VS Codeを開き直す |
| `npm.ps1` の実行が拒否される | `npm.cmd install` / `npm.cmd run dev` を使う |
| `package.json` が見つからない | `Get-Location` で場所を確認 |
| 同名の教材フォルダがある | 削除せず、取得済みか確認 |

<p class="small">解決しない場合は、コマンドとエラーメッセージを先生に見せてください。</p>

<!--
npm.cmdはPowerShellの実行ポリシーを緩めずに実行する方法。npm自体が未導入ならNode.jsの確認が必要。
警告を消すための強制更新や管理者権限への変更は指示しない。
-->

---

# 補足：変更しても画面が変わらない

編集したファイルと、実行しているファイルが同じか確認します。

1. `listings` の元ファイルではなく、`workspace` のコピーを開いているか。
2. `index.html` の `src` が、そのコピーを指しているか。
3. 両方を `Ctrl + S` で保存したか。
4. ブラウザのURLが、サーバの `Local:` と一致するか。

<p class="check">色の設定を変える場所は、対象の図形を描く命令より前です。</p>

<!--
同名ファイルが2つある場合、VS Codeのタブにマウスを重ねてパスを確認する。
画面更新の問題と色設定の順番の問題を分けて確認する。
-->

---

# 補足：図形や線が見えない

設定が残っていないか、直前の命令から確認します。

| 困った状況 | 確認する命令 |
| --- | --- |
| 内側が塗られない | `noFill()` の後に `fill(...)` を書いたか |
| 枠線・口の線が見えない | `noStroke()` の後に `stroke(...)` を書いたか |
| 色が薄すぎる | アルファ値が小さすぎないか |
| 図形が背景に消える | 背景と同じ色になっていないか |

<p class="small">まず不透明な色で確認し、その後で透明度を調整すると原因を探しやすくなります。</p>

<!--
色の設定だけではなく、座標が画面外、backgroundが最後という第2章の原因も確認する。
-->

---

# 補足：作業を終えるとき

保存してから開発サーバを停止します。

1. 編集したTypeScriptと `index.html` を `Ctrl + S` で保存。
2. サーバのターミナルで `Ctrl + C`。
3. 次回開くフォルダとファイル名を確認。

<p class="check">保存、Gitのコミット、GitHubへの送信は、それぞれ別の操作です。</p>
<p class="small">Gitで記録する場合は、第1章・Git付録に従って変更を確認します。</p>

<!--
一律にgit add .やpushを指示しない。授業で指定された記録方法に従う。
-->
