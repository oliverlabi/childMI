# Lastekeele korpuse veebirakendus

Tehtud [Tallinna Ülikooli Digitehnoloogiate instituudi](https://www.tlu.ee/dt) bakalaureusetöö raames.

## Rakenduse arendamiseks kasutatud tehnoloogiad
* MySQL ning MySQL Workbench 8.0.31
* Node.js v16.16.0
* NPM 8.19.2

## Ülesseadistamise juhend

Rakenduse korrektseks toimimiseks on vaja üles seadistada nii andmebaas, tagarakendus kui ka eesrakendus.
Enne seda on vaja alla laadida childMI hoidla "main" haru lähtekood ning soovitud kohta lahti pakkida.

### Andmebaasi ülesseadistamine
1. Installeerida MySQL Server, MySQL Workbench, Node.js ning NPM
2. Luua lokaalne MySQL server [(MySQL'i ametlik juhend)](https://dev.mysql.com/doc/workbench/en/wb-installing.html)
3. Võtta andmebaasi mudel "/db_model/db.mwb" kasutusele kasutades MySQL Workbench'i [forward engineer](https://dev.mysql.com/doc/workbench/en/wb-forward-engineering-live-server.html) funktsionaalsust
4. Sisesta andmetabelid andmebaasi "/backend/src/scripts" kaustas olevate skriptide abil.

Produktsiooniversiooni jaoks luua eraldi MySQL server.

<details><summary><b>Skriptide kasutamise juhend</b></summary>

Kuigi skripte on suur kogus, tuleb nende kasutajal tegeleda ainult kahe failiga: „config.py“ ning „runScripts.py“.

Esimese sammuna on vaja konfigureerida „config.py“ faili. Muuta tuleb järgmised andmetabeli muutujad:
* „fileName“,
* „currentSheetURL“,
* „currentSheetID“,
* „currentSheetHeaderIndex“.

„fileName“ väärtus tähistab andmetabeli faili nime. See peab olema kindlas formaadis, kuna selle pealt tuletatakse teised muutujad. 

Kirjeldatu kuju on järgmine: „andmetabeli tüüp – aasta – hooaeg – õpilaste alustamisaasta 1 – õpilaste alustamisaasta 2“. 

Kõik selle nime osad jaotatakse eraldi muutujatesse, eraldades need koodisiseselt sidekriipsuga. 

* Andmetabeli tüübi võimalikud väärtused on: kvantitatiivsed („qv“) ning kvalitatiivsed („ql“).
* Faili nime hooaja võimalikud tähistused on: sügised („0“) ning kevadised („1“) andmed. Kui vaja, saab sinna sisestada ka teisi numbreid, juhul, kui on näiteks vaja talviseid või suviseid andmeid sisestada. Töö käigus rohkem kui kahte see-eest vaja ei läinud.  
* „currentSheetURL“ muutujasse sisestatakse originaalse andmetabeli link
* „currentSheetID“  muutujale määratakse unikaalne andmebaasi „sheet“ tabeli identifikaator
* „currentSheetHeaderIndex“ väärtuseks sisestatakse andmetabeli päise indeks

Kui andmetabeli muutujad on paigas, tuleb skriptide kasutajal üle vaadata ning vajadusel kohendada globaalsed muutujad:
* „lastGroupName“,
* „commentProperty“,
* „childDataGroupName“,
* „childNameProperty“,
* „childNamePropertyEmpty“,
* „childAgeProperty“,
* „childAgePropertyEmpty“, 
* „childGenderProperty“,
* „childGenderPropertyEmpty“,
* „childSpecialNeedProperty“,
* „teacherNameProperty“,
* „schoolNameProperty“.

Nimetatud muutujad tähistavad andmetabelites olevaid päiseid. Neile tuleb määrata vastav korrektne nimeline väärtus. Tühjadele („empty“) muutujatele on vaja sisestada väärtus, mis kantakse andmebaasi, kui andmetabelis pole vastavat lahtrit.
Kui kõik eelnevalt nimetatud muutujad on korrektselt kohandatud, tuleb käivitada „runScripts.py“ fail. See käivitab kõik skriptid ükshaaval, sisestades andmetabeli andmed korrektsetesse andmebaasi tabelitesse. 

Konfiguratsioonivea puhul lõpetab skript tegevuse ning annab kasutajale veateate.

</details>

### Tagarakenduse (backend) ülesseadistamine
Tagarakenduse puhul on nii arenduse- kui ka produktsiooniversiooni ülesseadistamise protsess peaaegu üks-ühele.

1. Luua /backend kausta ".env" fail sisuga:
```
PASSWORD="[ANDMEBAASI PAROOL]"
USER_NAME="[ANDMEBAASI KASUTAJANIMI]"
DB_NAME="[ANDMEBAASI NIMI]"
PORT=49500
```
2. Installeerida vajalikud NPM paketid, navigeerides käsureal kataloogi /backend ning kasutades käsku "npm install"
3. Käivitada tagarakendus käsurea käsuga "npm start"
4. Produktsiooniversiooni korral on vaja "/backend/src/server.js" failis muuta corsOptioni muutuja origin väärtused korrektseteks taga- kui ka eesrakenduse internetiaadressiteks. Vastasel juhul esinevad CORS vead.


### Eesrakenduse (frontend) ülesseadistamine

#### Arendusversioon
1. Loo "/frontend/src" kausta kaust "config"
2. Navigeeri "/frontend/src/config" kausta ja loo "config.ts" fail sisuga:
```
export const API_URL = "http://localhost:49500/api/"
```
3. Installeeri vajalikud NPM paketid, navigeerides käsureal kataloogi /frontend ning kasutades käsku "npm install"
4. Käivita eesrakendus käsurea käsuga "npm start"

#### Produktsiooniversioon
1. Veendu, et arendusversioon toimib. Sellest edasi luuakse produktsiooniversioon
2. Muuda /frontend/src/config.ts failis muutuja API_URL'i väärtus ümber produktsiooniversiooni tagarakenduse aadressiks
4. Loo rakenduse produktsiooniversioon käsuga "npm build"
5. Navigeeri soovitud kausta ning loo uus Node.js rakendus käsuga "npm init"
6. Kopeeri "/frontend/dist" kaust uude loodud kausta
6. Installeeri järgmised NPM paketid: dotenv, express, sequelize, nodemon, @babel/core, @babel/node, @babel/preset-env
7. Loo juurkataloogi fail "server.js" sisuga:
```javascript
var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, './dist')));

app.get('/*', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, './dist')});
});

app.listen(process.env.PORT || 49501, function() {
  console.log(`App is running at port ${process.env.PORT || 49501}`)
})
```
8. Loo juurkataloogi ".env" fail sisuga:
```
PORT=49501
```
9. Loo juurkataloogi ".babelrc" fail sisuga:
```
{
    "presets": [
        "@babel/preset-env"
    ]
}
```
10. Modifitseeri "package.json" faili, lisades/muutes "script" välja rida:
```
    "start": "node ./server.js"
```
11. Käivita veebirakendus käsurea käsuga "npm start"

## Litsents

Autoriõigus @ [MIT](https://opensource.org/licenses/MIT)
