# TypeScript + p5.js プログラミング入門: 教員向け編集用資料

本文・図版・サンプルプログラムの改善と、教員間での情報共有のためのリポジトリです。
学生には [学生向けリポジトリ](https://github.com/m-riho/typescript-p5js-programming-textbook)と、[教材PDFのRelease](https://github.com/m-riho/typescript-p5js-programming-textbook/releases/latest)をご案内ください。
このリポジトリでは、これまで公開していたLaTeXソースとGit履歴・タグを引き継いでいます。以前のReleaseと添付PDFは学生向けリポジトリに残しています。

## 構成

| パス | 内容 |
|---|---|
| `main.tex` | 教材全体を組版する入口 |
| `preamble.tex`、`boxes/` | 共通設定・囲みなどの定義 |
| `chapters/` | 章・付録・奥付の本文 |
| `figures/` | 本文に掲載する図版・スクリーンショット |
| `typescript-p5/` | 学生向けにも配付する実行プロジェクト |
| `typescript-p5/listings/` | 章ごとのサンプルプログラム |
| `typescript-p5/workspace/` | 学生の練習・課題用フォルダのひな形 |

`figures/` は本文用の図版です。プログラムが読み込む画像などは `typescript-p5/` 内の各章で指定された場所に置きます。
Processing版の参照原稿、制作途中のメモ、非公開の作業用ファイルは含めていません。

## 取得とサンプルの確認

```console
git clone https://github.com/m-riho/typescript-p5js-programming-textbook-dev.git
cd typescript-p5js-programming-textbook-dev/typescript-p5
npm ci
npm run check
npm run dev
```

`index.html` の既存の `script` 要素の `src` を、たとえば `/listings/chapter02/points-and-lines.ts` に変更するとサンプルを実行できます。学生が用いる実行パスと同じです。実行後は配付用の初期状態を確認し、個人の実験用コードや `node_modules/`、`dist/` はコミットしません。

## PDFの組版

LuaLaTeX、latexmk、mintedとその実行環境を用意します。mintedは `latexminted` コマンドを使うため、そのコマンドも実行可能にしておきます。
リポジトリのルートで、次を実行します。

```console
latexmk -lualatex -shell-escape -interaction=nonstopmode -halt-on-error main.tex
```

`-shell-escape` は外部コマンドの実行を許可します。内容を確認し、信頼できるソースだけを組版してください。生成物はGitへ追加しません。

## 修正の進め方

修正提案やPull Requestは、この教員向けリポジトリへ集約します。章ごとにブランチを作り、対象の説明・サンプル・図版をまとめて修正してください。

- 初学者が読める説明、明示的な型注釈、p5.js instance modeを基本にします。
- サンプルの変更は `typescript-p5/` で `npm run check` と `npm run build` を確認します。
- 本文の変更は組版し、未解決参照やはみ出し、図と文字の重なりを確認します。
- 学生向け本文の取得URLは `typescript-p5js-programming-textbook` のままにします。学生にこの `-dev` リポジトリをcloneさせる手順には変更しません。
- 学生向けのコードを別管理せず、このリポジトリの確認済みコードから配付します。

## 配付版との対応

同じ版番号のタグを両リポジトリに付けます。教員向けタグはPDFの生成元ソース、学生向けタグは配付ファイルを表すため、コミットIDは異なります。
配付PDFは学生向けReleaseに添付し、Release本文に教員向けの生成元コミットを記録します。PDFをこのリポジトリへ重複してコミットする必要はありません。

制作担当者は、公開前にこのリポジトリの修正を制作元へ取り込み、学生向けファイルの抽出と検証を行います。制作元にしかない資料は公開せず、学生向けリポジトリへ教員用ソースを再びコピーしないようにします。

## ライセンス

- `typescript-p5/` 内のサンプルプログラム: [MIT License](LICENSE-CODE)
- 本文、図版、文書、LuaLaTeXソース: [CC BY-NC-SA 4.0](LICENSE)

教材内の作者提供イラストも、教材資料の一部としてCC BY-NC-SA 4.0の対象です。
