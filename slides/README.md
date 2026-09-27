# 授業用スライド（教員向け）

神奈川工科大学の授業で使用する、TypeScript + p5.js教材のSlidevスライドです。
第1章はWindows 11・VS Code・PowerShellを前提にした実習ガイドです。
学生にSlidevのインストールを求めるものではありません。

## 第1章の構成

| ページ | 内容 | 授業での扱い |
| --- | --- | --- |
| 1–11 | 目標、VS Code・Node.js・npm・Git・GitHubの役割 | 説明と確認 |
| 12–34 | VS Code・Node.js・Gitのインストールと動作確認 | 原則初回。34で全員の到達を確認 |
| 35–49 | フォルダ、PowerShell、教材取得、npm install | 原則初回。49で到達を確認 |
| 50–61 | 起動、ブラウザ表示、実行先変更、次回の再開 | 毎回使う操作 |
| 62–73 | 自分のコピーの編集、Git記録、エラー対応、終了 | 補足。時間と状況に合わせて使用 |

本編61枚と補足12枚です。操作と完了確認を別のスライドにしたため、当初の目安より増えています。
一度の授業で全て投影する前提ではありません。34または49で区切れます。
各スライド末尾のHTMLコメントは講師用ノートです。本文の長い説明を投影面へ詰め込まず、ノートを併用してください。

## 起動

このREADMEがある `slides/` で実行します。Node.js 22.12以上（現行LTS推奨）が必要です。

```sh
npm ci
npm run dev
```

初回の依存関係取得にはインターネットが必要です。通常は http://localhost:3030/ が表示されます。
既に使用中なら、別の番号を指定してください。

```sh
npm run dev -- --port 3031
```

- 投影画面: `http://localhost:3031/`
- 講師画面: `http://localhost:3031/presenter/`
- 一覧: `http://localhost:3031/overview/`
- 終了: 起動したターミナルで `Ctrl + C`

Slidevのサーバ（3030など）と、学生用Viteサーバ（5173など）は別のものです。
講師がサンプルを実演するときは、別のターミナルで `typescript-p5/` に移動して起動してください。
開発サーバはローカル利用を想定しています。スライドのソースと生成PDFは学生向けリポジトリやReleaseには公開しません。

## PDF出力・ビルド

```sh
npm run check
npm run build
npm run export
```

- Web用ビルド: `slides/dist/lecture01/`
- 教員用PDF: `slides/exports/lecture01-typescript-p5js.pdf`
- 出力ファイル、依存パッケージ、QA画像はGit管理対象外です。

PDF出力にはPlaywrightのChromiumを使います。ブラウザが未導入と表示された場合は、`npx playwright install chromium` を実行してください。
ブラウザの `/export/` 画面から出力する方法もあります。
段階表示に依存しない構成なので、PDFだけでも手順を追えます。

## ファイルの役割

```text
slides/
  package.json / package-lock.json   教員用Slidevの依存関係
  style.css                         共通の色・文字・図の設定
  scripts/                          内容検査、表示検査、実行画面の撮影
  lecture01/
    slides.md                       本文と講師用ノート
    style.css                       共通スタイルの読み込み
    global-top.vue                  ページ番号と初回・毎回の表示
    components/Shot.vue             元画像を変えずに必要部分を拡大表示
    public/figures/                 実画面の画像
    SOURCES.md                      出典と画像の由来
    PLAN.md                         作成・確認の記録
```

ページを追加・削除した場合は、READMEのページ範囲と `global-top.vue` の区分境界も更新してください。
`---` はスライド区切りです。出力例の罫線を独立した行に書くと、誤って別ページになる場合があります。

## 見た目と配布方針

青 `#0066a6`、明るい青 `#009edb`、白を基調に、確認に緑、注意に赤を使っています。
神奈川工科大学の公式サイトを参照しましたが、正式なスクールカラーの色番号は確認できなかったため、公式指定色とはしていません。
大学ロゴの加工・再描画はしていません。色は `style.css` の変数で調整できます。
日本語フォントはNoto Sans JPをローカル配信し、投影時の外部フォント接続を不要にしています。

スライドのソース・講師ノート・画像・依存関係の定義は、教員向け `-dev` のみで管理します。
制作元の教員用許可リストには `slides/` を含め、学生用の抽出では明示的に除外します。
生成PDF、Webビルド、依存パッケージ、検証画像、ローカル設定はGit管理対象外です。
学生向けリポジトリ・Releaseには、スライドのソースやPDFを追加しません。
なお、教員向けリポジトリ自体はPublicです。この配付先の区別は閲覧制限ではありません。

## 動作確認

`npm run check` はページ・講師ノート・画像参照・教材のパスとコマンドを検査します。
Slidev起動中に次を実行すると、全ページをChromiumで撮影して範囲外へのはみ出しを検査します。

```sh
node scripts/verify-slides.mjs http://localhost:3031
```

結果は `slides/qa/` に保存します。自動検査だけでなく、画像の内容・図の接続・文字の重なりも目視確認してください。
実行画面を撮り直す場合は、学生用 `typescript-p5/` の依存関係も導入したうえで、`node scripts/capture-samples.mjs` を実行します。
撮影では元の `index.html` やサンプルを書き換えません。開いた一時サーバとブラウザは終了します。

Windowsでの全インストール手順を、この作業環境（macOS）で再実行したわけではありません。
画面は提供済みのWindows実機画像です。管理権限、学内ネットワーク、ARM版、画面の変更は授業前にWindowsで確認してください。

## 依存関係

Slidev 53.0.0を使用しています。間接依存の `lodash-es`・`dompurify`・`image-size` は、公開済みの修正版にoverridesで固定しています。
また、Twoslashとの互換性のため `floating-vue` を5.2.2に固定しています。
更新時は `npm audit` とWeb/PDFの出力を再確認してください。PPTX出力は今回の検証対象外です。

本文・図のライセンスはリポジトリの `LICENSE`、コードは `LICENSE-CODE` を参照してください。
ソフトウェア画面・各社の名称等の権利は各権利者に帰属します。
