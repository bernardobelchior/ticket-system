# Ticket System
Distributed Issue Ticket System built for Distribution and Integration Technologies course @ FEUP.

## Running

### First Run

* `docker-compose up --build -d database`
* `docker-compose run database sh`
* `sh /docker-entrypoint-initdb.d/init-db.sh`
* `exit`
* `docker-compose down`

### Following Runs

* `docker-compose up --build`
* Run it-gui and dept-gui
