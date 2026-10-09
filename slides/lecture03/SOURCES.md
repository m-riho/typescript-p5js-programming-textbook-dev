# 第3章の出典・図版

- 本文: `chapters/chapter03-color-and-style.tex`。
- 元サンプル: `typescript-p5/listings/chapter03/` の8本。第2章の顔との比較には `chapter02/simple-face.ts` も使用。
- PNGは `scripts/capture-lecture03.mjs` でp5.jsを実行して撮影。変更例は `capture-cases.mjs` で定義。
- RGB値、描画状態の持続、透明度の重なりは実行画像の画素値でも検査する。説明用のコードと元サンプルは、インメモリで型チェックしてから実行する。
- 元サンプルと `typescript-p5/index.html` は変更しない。説明用の変更は撮影用の一時モジュール内だけで行う。
- `both-off.png` と `alpha-0.png` が白一色なのは、図形が見えない正しい実行結果。
- `components/ColorDiagram.vue` は塗り・枠線、RGB成分、アルファ値の説明用SVG。図の矢印やラベルは実行結果には含まれない。
- 色見本はRGB値に基づくHTML/CSS。色名と数値を併記し、色だけに依存しない。
- `components/ColorDemo.vue` はRGB・アルファ値の操作デモ。外部通信・新規依存関係なしで動作し、SVGでp5.jsの標準RGB範囲に相当する見た目を表示する。表示コードは描画部分の抜粋で、スケッチ全体ではない。
- 不透明度のデモは青い長方形を不透明に保ち、その上の赤い円だけを変更する。描画色を画素で検査する。PDFは初期状態の静止表示。
- 第1・2章の青系デザインを継承。正式なスクールカラーの指定ではない。
- 外部の写真、生成イラスト、企業ロゴは使用していない。

スライドは教員向け `-dev` の管理対象。学生向けリポジトリ・Releaseには追加しない。
