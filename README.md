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
```
