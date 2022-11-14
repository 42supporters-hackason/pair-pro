# ぺあぷろ！

### 技育展2022 優秀賞受賞作品

## アプリ概要
コミュニティ(会社、サークル)のなかでペアプロをしたい人同士がマッチングをし、学び合いを促進するサービス  

- マッチング → チャット → ビデオ通話まで全て一気通貫して行える
- マッチングポイントを導入して、ドライバーとナビゲータの数のバランスを調整
- 過去のペアプロ履歴からコミュニティ内でランキング化

## 使用技術
フロントエンド: React, Typescript  
バックエンド: Typescript  

## デプロイ
https://pairpro.vercel.app/  

試しに使用したい方は、こちらの招待コードを使用してください！  
18ada5fe-3f97-49af-befd-3983de03660a

## サービスの概要資料
こちらの資料により詳細な情報があります。   
[技育展.pptx](https://github.com/42supporters-hackason/pair-pro/files/9592874/default.pptx)

## 開発環境

必要なもの: `docker`コマンド

### postgres database コンテナの起動
```
docker compose up
```
-> db:     localhost:5432

npx prisma studio

### api デプロイ
```
heroku login

################## ここから最初のデプロイする人のみ ##################

heroku create p2p-matching # project作成

heroku addons:create heroku-postgresql:hobby-dev # db作成

heroku config # DATABASE_URLできてることを確認

git subtree push --prefix api/ heroku main # apiディレクトリをdeployする

################## ここまで最初のデプロイする人のみ ##################


heroku git:clone --app p2p-matching #Herokuからまずクローンする

heroku git:remote --app p2p-matching #リモートリポジトリ登録

git subtree push --prefix api/ heroku main # apiディレクトリをdeployする、基本このコマンドで差分が反映される

heroku logs --tail #デバッグ

heroku open #apiのURLにアクセス
```

## localでseed値を入れる

```
$ npx prisma db seed 
```


**注意点**
- seedを追加しても差分管理はされない
- `npx prisma migrate reset`は `seeding` もしてくれる




## テスト環境でのgithubログインの省略
```
# user1 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1OTc3MDY1OX0.lpGGDVJ0y-IfAViLy5D8m8GY965ZqTxQ-TZgikrQ5ME

# user2
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1OTc3MDY1OX0.tzLuKarW0wCOz-hI4xTQ5Q6S08NMZx3VWeKb4-9Cq4U
```
