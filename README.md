# We部 Webサイト

Web系優良企業への内定を目指すコミュニティ「We部」の公式サイトです。
Next.js で構築されています。

## 必要な環境

- Node.js 20.9 以上
- pnpm

pnpm が入っていない場合は、Node.js に同梱されている Corepack から有効化できます。

```bash
corepack enable
```

## ローカルで起動する

依存関係をインストールします。

```bash
pnpm install
```

開発サーバーを起動します。

```bash
pnpm dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

## よく使うコマンド

```bash
# 開発サーバーを起動
pnpm dev

# production build を作成
pnpm build

# build 済みのアプリを起動
pnpm start

# lint を実行
pnpm lint
```

## production build をローカルで確認する

本番相当の動作を確認したい場合は、build 後に start します。

```bash
pnpm build
pnpm start
```

`pnpm start` は build 済みの `.next` ディレクトリを使うため、先に `pnpm build` を実行してください。

## ディレクトリ構成

```text
app/          Next.js App Router のページとレイアウト
components/   画面を構成する React コンポーネント
components/ui UI 共通コンポーネント
lib/          ユーティリティやアニメーション定義
public/       画像、favicon などの静的ファイル
styles/       グローバルCSS
```

## 補足

- lockfile は `pnpm-lock.yaml` です。依存関係の更新も pnpm で行ってください。
- このプロジェクトでは TypeScript の build error を Next.js 設定で無視するようになっています。型の問題は別途確認してください。
