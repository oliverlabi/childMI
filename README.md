# Lastekeele korpuse veebirakendus

Tehtud Tallinna Ülikooli Digitehnoloogiate instituudi bakalaureusetöö raames.

## Rakenduse arendamiseks kasutatud tehnoloogiad
* MySQL ning MySQL Workbench 8.0.31
* Node.js v16.16.0
* NPM 8.19.2

## Ülesseadistamise juhend

### Arendus
Installeerida lähtekood

#### Andmebaas
1. Installeerida MySQL Server, MySQL Workbench, Node.js ning NPM
2. Luua lokaalne MySQL server [MySQLi ametlik juhend](https://dev.mysql.com/doc/mysql-getting-started/en/) pordiga 49500
3. Võtta andmebaasi mudel db_model/db.mwb kasutusele kasutades MySQL Workbench'i "[forward engineer](https://dev.mysql.com/doc/workbench/en/wb-forward-engineering-live-server.html)" funktsionaalsust

#### Tagarakendus (backend)
1. Luua /backend kausta ".env" fail sisuga:
```
PASSWORD="[ANDMEBAASI PAROOL]"
USER_NAME="[ANDMEBAASI KASUTAJANIMI]"
DB_NAME="[ANDMEBAASI NIMI]"
PORT=49500
```
2. Installeerida vajalikud NPM paketid, navigeerides käsureal kataloogi /backend ning kasutades käsku "npm install"
3. Käivitada tagarakendus käsurea käsuga "npm start"

#### Eesrakendus (frontend)
1. Luua /src kausta kaust "config"
2. Navigeerida /src/config kausta ja luua "config.ts" fail sisuga:
```
export const API_URL = "http://greeny.cs.tlu.ee:49500/api/"
```
3. Installeerida vajalikud NPM paketid, navigeerides käsureal kataloogi /frontend ning kasutades käsku "npm install"
4. Käivitada eesrakendus käsurea käsuga "npm start"

## Litsents

Autoriõigus @ [MIT](https://opensource.org/licenses/MIT)