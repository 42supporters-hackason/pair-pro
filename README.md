必要なもの: `docker`コマンド、やる気

# ローカルでapi/clientサーバー立ち上げたいとき (2回目以降 && 新しくyarn addしなければ--buildはつけなくていい(= docker imageは作り直さなくていい))
```
docker compose up --build
```
-> client: localhost:3000
-> api:    localhost:8080

# apiコンテナでコマンド実行したい時(upした状態で！)
```
docker compose exec api [yarn add apollo | yarn run generate]
```

# clientコンテナでコマンド実行したい時(upした状態で！)
```
docker compose exec client [yarn add apollo | yarn run build]
```
