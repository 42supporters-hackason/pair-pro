## 起動コマンド

| コマンド       | 内容                         |
| -------------- | ---------------------------- |
| yarn storybook | storybook 起動               |
| yarn dev     | アプリ 起動 (localhost:3000) |

## 命名規則

| 対象                             | 規則                       |
| -------------------------------- | -------------------------- |
| コンポーネントのディレクトリ     | 先頭大文字、キャメルケース |
| コンポーネント定義ファイル       | index.tsx                  |
| ストーリー定義ファイル           | \*.stories.tsx           |
| プロパティインターフェイス名     | (コンポーネント名) + Props |

### ディレクトリ構成

```
client
  ├ .storybook/ // storybookの設定
  ├ graphql/ // graphql code genで生成するGraphqlのスキーマを定義する
  ├ src/
  │ ├ assets/  // 静的ファイルを格納する
  │ ├ pages/
  │ ├ lib/  // libraryを管理する
  │ ├ components/
  │ ├ hooks/  // カスタムフック
  │ ├ theme/  // 共通のmui themeを管理 
  │ ├ routes/  // routingの設定
  │ ├ utils/  // 便利系関数などを格納 基本的にはindex.tsに
  │ ├ types/  // 型定義
  │ ├ App.tsx
  │ └ main.tsx   //エントリーポイント
  ├ .eslintrc.js    //eslint設定ファイル
  └ tsconfig.json   //typescriptコンパイラ設定ファイル
```
