FROM postgres:10-alpine

COPY init-db.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh
