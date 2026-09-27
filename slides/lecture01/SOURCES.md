# 出典・画像の由来

## 原稿

- `chapters/chapter01-introduction.tex`
- `typescript-p5/README.md`
- `typescript-p5/index.html`
- `typescript-p5/listings/chapter01/first-sketch.ts`
- `typescript-p5/listings/chapter01/first-ballon-game.ts`

教材のURL・フォルダ配置は、学生向け公開版に合わせています。
https://github.com/m-riho/typescript-p5js-programming-textbook

## 公式情報

確認日: 2026-09-27。画面の配置やバージョン番号は変更される場合があります。

- 神奈川工科大学の校章・ロゴ: https://www.kait.jp/about/philosophy/
- VS Code / Windows: https://code.visualstudio.com/docs/setup/windows
- VS Code / ターミナル: https://code.visualstudio.com/docs/terminal/basics
- Node.js: https://nodejs.org/en/download
- Git / Windows: https://git-scm.com/install/windows
- Gitの設定: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup
- GitHubのclone: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
- Slidev構成: https://sli.dev/custom/directory-structure
- Slidev出力: https://sli.dev/guide/exporting

神奈川大学など他大学のスクールカラー資料は流用していません。
このスライドの青は授業用配色であり、大学の公式指定色として定義していません。

## 提供済みのWindows画面

次の画像は、同名の `figures/chapter01/` 内の原本をコピーしたものです。
原本の綴りを維持しています。画面の一部を `Shot.vue` で拡大表示しても、PNG自体は変更しません。

- vcode-oficial.png
- vscode-installer.png
- start-vscode.png
- node-oficial.png
- node-download.png
- start-termnial-on-vscode.png
- terninal-on-vsocde.png
- git-install.png
- browser-first-sketch.png

インストール完了画像は、以下の提供済み原本を名前を変えてコピーしました。

| スライド内の名前 | `figures/Screenshot on windows/` 内の原本 |
| --- | --- |
| vscode-finish.png | スクリーンショット 2026-09-15 141833.png |
| node-finish.png | スクリーンショット 2026-09-15 142422.png |
| git-finish.png | スクリーンショット 2026-09-15 142712.png |

`get-material-from-git.png` は使用していません。
画像のclone実行場所と本文のwork-textbookが異なるため、操作説明は現在地を示す図で作成しました。

## サンプルの実行画面

- first-sketch-canvas.png: 実際のfirst-sketch.tsのcanvasを撮影。
- ballon-game.png: 実際のfirst-ballon-game.tsのcanvasを撮影。
- 撮影方法: `slides/scripts/capture-samples.mjs`。

これらはmacOS上のChromiumで実行したキャンバス部分です。WindowsのOS画面として示していません。
ゲームの動き・抽選・画像を変更して撮影していません。風船の配置は撮影時ごとに変わります。
ターミナルの文字だけの出力例は、形式を示す説明用の例であり実機のスクリーンショットではありません。
