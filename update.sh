#!/bin/bash

echo "Pulling Update"
git fetch && git status && git pull

echo "Building"
go build

echo "Restarting server"
./run_server.sh
