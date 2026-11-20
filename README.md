# We部 Webサイト

Web系優良企業への内定を目指すコミュニティ「We部」の公式サイトです。
Next.js で構築されています。

## 必要な環境

- Node.js 22.23.5 以上（22系）、24.22.3 以上（24系）、または 26.13.1 以上（26系）
- pnpm

2026年11月の [Node.js セキュリティ更新](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases)を適用したバージョンを使用してください。本番ホスティング環境の Node.js も更新し、依存関係の更新後は再ビルド・再デプロイしてください。

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

## 依存関係の自動更新

[Dependabot](.github/dependabot.yml) が毎朝 (日本時間 7:00) 依存関係の更新を確認し、PR を作ります。

| 種類 | PR のまとめ方 | 取り込み |
| --- | --- | --- |
| パッチ更新 (例: 1.2.3 → 1.2.4) | 1 つの PR にまとめる | CI (lint + build) が成功したら自動でマージ |
| マイナー更新 (例: 1.2 → 1.3) | 1 つの PR にまとめる | 人が確認してマージ |
| メジャー更新 (例: 1 → 2) | 依存ごとに個別の PR | 人が確認してマージ |
| 脆弱性修正 (security update) | 個別の PR | パッチ相当なら CI 成功後に自動でマージ |

- 公開直後の版に問題が見つかるケースに備え、通常の更新は公開から 3 日 (メジャーは 14 日) 待ってから PR になります。脆弱性修正は待ちません。
- 自動マージは [CI ワークフロー](.github/workflows/ci.yml) の `dependabot-automerge` ジョブが行います。CI が失敗した PR はマージされずに残るので、内容を確認してください。

## 補足

- lockfile は `pnpm-lock.yaml` です。依存関係の更新も pnpm で行ってください。
- このプロジェクトでは TypeScript の build error を Next.js 設定で無視するようになっています。型の問題は別途確認してください。
