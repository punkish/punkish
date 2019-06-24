---
title      : Maintaining data integrity
description: a data structure to ensure integrity through edits and updates
modified   : 2019-06-21 12:58:00
created    : 2019-06-21 12:58:00
viewcount  : 0
id         : 717
gmap       : 
tags       :
    - code
    - sqlite
    - nodejs
    - Plazi
    - taxonomy
stars      : 
---

We start with the following data. `data_t0` is an array of **treatments** (like a table of **treatments**) whose every element is a record (like a row in a table, single **treatment**). The fourth element in every record is actually a reference to a another array of **materialsCitations** for this **treatment**.

```js
const data_t0 = [
    {
        tId: '7E9081B59A6D4CC1A8C347F69FB4198D', tTitle: 'Jungle Fever', aName: 'Spike Lee',
        m: [
            {   mId: '5EDEB36C9006467A8D04AFB6F62CD7D2', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '22.345', lon: '21.546'},

            {   mId: '283B67B2430F4E6F97E619041992C1B0', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '81.432', 
                lon: '-17.532'},

            {   mId: 'B59511BD6A5F4DF09ECF562A108D8A2E', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '22.442', 
                lon: '21.687'}
        ]
    },
    {
        tId: '2F2B15A526154748BDABA124210F15EC', tTitle: 'Femme Fatal', aName: 'Brian de Palma',
        m: [
            {   mId: '07D267AB712645EB8FFC51994D05F0B2', 
                tId: '2F2B15A526154748BDABA124210F15EC', 
                lat: '123.542', 
                lon: '12.522'}
        ]
    },
    {
        tId: '0c74f13ffa834c489b3368921dd72463', tTitle: 'Toy Story 4', aName: 'Josh Cooley',
        m: [
            {   mId: 'b4b2fb69c6244e5eb0698e0c6ec66618', 
                tId: '0c74f13ffa834c489b3368921dd72463', 
                lat: '-56.967', 
                lon: '67.376'},
        ]
    }
];
```

A few days later, we have some changes. One **treatment** has few edits, and its related **materialsCitations** too have edits. In fact, a new one has been added as well, and one of them has been deleted. Also, another **treatment** has been completely deleted.

```js
const data_t1 = [
    {
        // treatment edited
        tId: '7E9081B59A6D4CC1A8C347F69FB4198D', tTitle: 'Do The Right Thing', aName: 'Mr. Spike Lee',
        m: [
            // unchanged
            {   mId: '5EDEB36C9006467A8D04AFB6F62CD7D2', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '22.345', 
                lon: '21.546'},

            // edited
            {   mId: '283B67B2430F4E6F97E619041992C1B0', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '83.433', 
                lon: '-16.874'},

            // deleted
            {   mId: 'B59511BD6A5F4DF09ECF562A108D8A2E', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '22.442', 
                lon: '21.687', 
                del: 'true'},

            // added
            {   mId: '677E2553DD4D43B09DA77414DB1EB8EA', 
                tId: '7E9081B59A6D4CC1A8C347F69FB4198D', 
                lat: '-45.348', 
                lon: '-121.998'}
        ]
    },

    // entire treatment deleted
    {
        tId: '0c74f13ffa834c489b3368921dd72463', tTitle: 'Toy Story 4', aName: 'Josh Cooley', del: 'true',
        m: [
            {   mId: 'b4b2fb69c6244e5eb0698e0c6ec66618', 
                tId: '0c74f13ffa834c489b3368921dd72463', 
                lat: '-56.967', 
                lon: '67.376'},
        ]
    }
];
```

Given the following program

```js
const createTable = function() {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS t (
            id INTEGER PRIMARY KEY, 
            tId TEXT UNIQUE, 
            tTitle TEXT,
            aName TEXT,
            del TEXT DEFAULT 'false'
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS m (
            id INTEGER PRIMARY KEY, 
            mId TEXT, 
            tId TEXT,
            lat TEXT, 
            lon TEXT,
            del TEXT DEFAULT 'false',
            UNIQUE (mId, tId)
        )
    `).run();
};


const upsertRows = function() {
    const upsert_t = db.prepare(`
        INSERT INTO t (tId, tTitle, aName, del) VALUES(?, ?, ?, ?) 
            ON CONFLICT(tId) DO UPDATE SET 
                tTitle=excluded.tTitle,
                aName=excluded.aName,
                del=excluded.del
    `);

    const upsert_m = db.prepare(`
        INSERT INTO m (mId, tId, lat, lon, del) VALUES(?, ?, ?, ?, ?) 
            ON CONFLICT(mId, tId) DO UPDATE SET 
                lat=excluded.lat,
                lon=excluded.lon,
                del=excluded.del
    `);
    
    const upt = function(t) {
        upsert_t.run(t.tId, t.tTitle, t.aName, t.del || 'false');
        t.m.forEach(upm);
    };

    const upm = function(m) {
        upsert_m.run(m.mId, m.tId, m.lat, m.lon, m.del || 'false');
    };

    data_t0.forEach(upt);
    data_t1.forEach(upt);
};

createTable();
upsertRows();
```

We get our database called **test.sqlite**.

```sql
$ sqlite3 test.sqlite 
SQLite version 3.28.0 2019-04-16 19:49:53
Enter ".help" for usage hints.
sqlite> SELECT * FROM t;
id          tId                               tTitle              aName          del       
----------  --------------------------------  ------------------  -------------  ----------
1           7E9081B59A6D4CC1A8C347F69FB4198D  Do The Right Thing  Mr. Spike Lee  false     <-- edited
2           2F2B15A526154748BDABA124210F15EC  Femme Fatal         Brian de Palm  false     
3           0c74f13ffa834c489b3368921dd72463  Toy Story 4         Josh Cooley    true      <-- deleted
sqlite> SELECT * FROM m;
id          mId                               tId                               lat         lon         del       
----------  --------------------------------  --------------------------------  ----------  ----------  ----------
1           5EDEB36C9006467A8D04AFB6F62CD7D2  7E9081B59A6D4CC1A8C347F69FB4198D  22.345      21.546      false
2           283B67B2430F4E6F97E619041992C1B0  7E9081B59A6D4CC1A8C347F69FB4198D  83.433      -16.874     false   <-- edited
3           B59511BD6A5F4DF09ECF562A108D8A2E  7E9081B59A6D4CC1A8C347F69FB4198D  22.442      21.687      true    <-- deleted
4           07D267AB712645EB8FFC51994D05F0B2  2F2B15A526154748BDABA124210F15EC  123.542     12.522      false     
5           b4b2fb69c6244e5eb0698e0c6ec66618  0c74f13ffa834c489b3368921dd72463  -56.967     67.376      false     
6           677E2553DD4D43B09DA77414DB1EB8EA  7E9081B59A6D4CC1A8C347F69FB4198D  -45.348     -121.998    false   <-- added
sqlite> 
```