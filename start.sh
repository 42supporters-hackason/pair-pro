#!/bin/bash
trap killall SIGINT

killall(){
  echo 'good bye'
  kill 0
}

client () {
	cd client
	yarn dev
    echo 'client'
}

api () {
	cd api
	yarn dev
    echo 'api'
}

db () {
	docker-compose up
    echo 'db'
}

db &
api &
client &

wait
