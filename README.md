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
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1OTc3MDY1OX0.lpGGDVJ0y-IfAViLy5D8m8GY965ZqTxQ-TZgikrQ5ME

# user2
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1OTc3MDY1OX0.tzLuKarW0wCOz-hI4xTQ5Q6S08NMZx3VWeKb4-9Cq4U

# profile1
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImNvbW11bml0eUlkIjoiY29tbXVuaXR5SWQxIiwicHJvZmlsZUlkIjoxLCJpYXQiOjE2NjIwMzI3Njh9.jtP9f1HtmTOaoE8o73jyRvsmp7LSaHxJoFv6dPYwD-c

# profile4
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImNvbW11bml0eUlkIjoiY29tbXVuaXR5SWQyIiwicHJvZmlsZUlkIjo0LCJpYXQiOjE2NjA0NzY0NTB9.5DCEP8ckjnagldmWWEPpUzGcuwNdDHVSa8xlCXXxoxs
```
