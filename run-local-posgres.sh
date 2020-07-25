#!/bin/bash

 docker run -d \
    --name postgres-localhost \
    -e POSTGRES_PASSWORD=senha \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /home/mhexsel/tmp/postgres_data:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:12