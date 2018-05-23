#!/bin/sh
set -e

psql -h database --username "$POSTGRES_USER"  <<-EOSQL
  CREATE DATABASE it_api;
  CREATE DATABASE dept_api;
EOSQL
