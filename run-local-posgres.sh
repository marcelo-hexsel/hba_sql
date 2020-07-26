#!/bin/bash

 docker run -d \
    --name postgres-localhost \
    -e POSTGRES_PASSWORD=senha \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /home/mhexsel/tmp/postgres_data:/var/lib/postgresql/data \
    --net host \
    postgres:12