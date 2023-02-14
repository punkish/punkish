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
js         : 
    - dataintegrity
---

In a rapidly evolving data extraction environment, we need the ability to edit data already recorded while also offering a permanence of record. But these two roces are in opposing tension, so how to offer both? Fortunately, timestamps and the ability to **INSERT … ON CONFLICT** provide a way. Consider the following tables (all code using `nodejs`, but the underlying data principles would be the same for any programming language)

```js
const createTable = function() {

    // main table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS treatments (
            id INTEGER PRIMARY KEY, 
            tId TEXT UNIQUE, 
            tTitle TEXT,
            author TEXT,
            created INTEGER,           -- created date unixtime ms
            modified INTEGER,          -- modified data unixtime ms
            state INTEGER              -- 0 deleted | 1 modified
        )
    `).run();

    // related table via `tId` Foreign Key (FK)
    db.prepare(`
        CREATE TABLE IF NOT EXISTS materialsCitations (
            id INTEGER PRIMARY KEY, 
            mId TEXT, 
            tId TEXT,
            lat REAL, 
            lon REAL,
            created INTEGER,           -- created date unixtime ms
            modified INTEGER,          -- modified data unixtime ms
            state INTEGER,             -- 0 deleted | 1 modified
            UNIQUE (mId, tId)
        )
    `).run();
};

createTable();
```

We get our database called **test.sqlite**.

```sql
$ sqlite3 test.sqlite 
SQLite version 3.28.0 2019-04-16 19:49:53
Enter ".help" for usage hints.
sqlite> .schema
CREATE TABLE treatments (
            id INTEGER PRIMARY KEY, 
            tId TEXT UNIQUE, 
            tTitle TEXT,
            author TEXT,
            created INTEGER,           -- created date unixtime ms
            modified INTEGER,          -- modified data unixtime ms
            state INTEGER              -- 0 deleted | 1 modified
        );
CREATE TABLE materialsCitations (
            id INTEGER PRIMARY KEY, 
            mId TEXT, 
            tId TEXT,
            lat REAL, 
            lon REAL,
            created INTEGER,           -- created date unixtime ms
            modified INTEGER,          -- modified data unixtime ms
            state INTEGER,             -- 0 deleted | 1 modified
            UNIQUE (mId, tId)
        );
```

This how the entity relationship diagram (ERD) looks like

```
┌──────────────────────────────┐             ┌──────────────────────────────┐
│██████████treatments██████████│             │██████materialsCitations██████│
├──────────────────────────────┤             ├──────────────────────────────┤
│    id INTEGER PRIMARY KEY    │             │    id INTEGER PRIMARY KEY    │
├──────────────────────────────┤             ├──────────────────────────────┤
│   tId TEXT NOT NULL UNIQUE   ┼─────┐       │   mId TEXT NOT NULL UNIQUE   │
├──────────────────────────────┤     │      ╱├──────────────────────────────┤
│         tTitle TEXT          │     └───────│           tId TEXT           │
├──────────────────────────────┤            ╲├──────────────────────────────┤
│         author TEXT          │             │           lat REAL           │
├──────────────────────────────┤             ├──────────────────────────────┤
│       created INTEGER        │             │           lon REAL           │
├──────────────────────────────┤             ├──────────────────────────────┤
│       modified INTEGER       │             │       created INTEGER        │
├──────────────────────────────┤             ├──────────────────────────────┤
│        state INTEGER         │             │       modified INTEGER       │
└──────────────────────────────┘             ├──────────────────────────────┤
                                             │        state INTEGER         │
                                             ├──────────────────────────────┤
                                             │      UNIQUE (mId, tId)       │
                                             └──────────────────────────────┘
```

We start with the following data. `data_t0` is an array of **treatments** (think, a table of **treatments**) whose every element is a record (a row in a table representing a single **treatment**). The fourth element in every record is actually a reference to a another array of **materialsCitations** for this **treatment**.

```js
const data_t0 = [
    {
        tId: '7E9081', 
        tTitle: 'Neonersia fugax', 
        author: 'Song, Zhi-Shun', 
        created: 819167040000, 
        m: [
            {   mId: '5EDEB3', 
                tId: '7E9081', 
                lat: '22.345', 
                lon: '21.546',
                created: 819167040000 },

            {   mId: '283B67', 
                tId: '7E9081', 
                lat: '81.432', 
                lon: '-17.532',
                created: 819167400000 },

            {   mId: 'B59511', 
                tId: '7E9081', 
                lat: '22.442', 
                lon: '21.687',
                created: 819174600000 }
        ]
    },
    {
        tId: '2F2B15', 
        tTitle: 'Polyrhachis', 
        author: 'Fr. Smith', 
        created: 819174660000,
        m: [
            {   mId: '07D267', 
                tId: '2F2B15', 
                lat: '123.542', 
                lon: '12.522',
                created: 819174660000 }
        ]
    },
    {
        tId: '0c74f1', 
        tTitle: 'Daptonema papillifera', 
        author: 'Sun, Yan, Huang', 
        created: 819174720000,
        m: [
            {   mId: 'b4b2fb', 
                tId: '0c74f1', 
                lat: '-56.967', 
                lon: '67.376',
                created: 819174720000 },
        ]
    }
];
```

Given the following program

```js
const createInsertStatements = function() {

    const insert_t = db.prepare(`
        INSERT INTO treatments (tId, tTitle, author, created, modified, state) 
        VALUES(?, ?, ?, ?, ?, ?) 
        ON CONFLICT(tId) DO UPDATE SET 
            tTitle=excluded.tTitle,
            author=excluded.author,
            created=excluded.created,
            modified=excluded.modified,
            state=excluded.state`
    );

    const insert_m = db.prepare(`
        INSERT INTO materialsCitations (mId, tId, lat, lon, created, modified, state) 
        VALUES(?, ?, ?, ?, ?, ?, ?) 
        ON CONFLICT(mId, tId) DO UPDATE SET 
            lat=excluded.lat,
            lon=excluded.lon,
            created=excluded.created,
            modified=excluded.modified,
            state=excluded.state`
    );

    return [insert_t, insert_m];
};

const insertRows = function(data) {

    const [insert_t, insert_m] = createInsertStatements();

    data.forEach(function(t) {
        
        if (t.state !== 0 && t.state !== 1) {
            t.state = '';
        }
        insert_t.run(t.tId, t.tTitle, t.author, t.created, t.modified || '', t.state);

        t.m.forEach(function(m) {

            // if the parent treatment is deleted, then all children are deleted
            if (t.state === 0) {
                m.modified = t.modified;
                m.state = 0;
            }

            if (m.state !== 0 && m.state !== 1) {
                m.state = '';
            }
            insert_m.run(m.mId, m.tId, m.lat, m.lon, m.created, m.modified || '', m.state);
        });
    });
};

insertRows(data_t0);
```

We get the initial snapshot of our data in the the database

```sql
sqlite> .headers on
sqlite> .mode col
sqlite> SELECT * FROM treatments;
id          tId     tTitle                            author          created       modified      state     
----------  ------  --------------------------------  --------------  ------------  ------------  ----------
1           7E9081  Neonersia fugax  Song, Zhi-Shun  819167040000                        
2           2F2B15  Polyrhachis      Fr. Smith       819174660000                        
3           0c74f1  Daptonema papil  Sun, Yan, Huan  819174720000                        
sqlite> SELECT * FROM materialsCitations;
id          mId     tId     lat         lon         created       modified    state     
----------  ------  ------  ----------  ----------  ------------  ----------  ----------
1           5EDEB3  7E9081  22.345      21.546      819167040000                        
2           283B67  7E9081  81.432      -17.532     819167400000                        
3           B59511  7E9081  22.442      21.687      819174600000                        
4           07D267  2F2B15  123.542     12.522      819174660000                        
5           b4b2fb  0c74f1  -56.967     67.376      819174720000 
```

A few days later, we have some changes. One **treatment** has a few edits, and its related **materialsCitations** too have edits. In fact, a new one has been added as well, and one of them has been deleted. Also, another **treatment** has been completely deleted.

```js
const data_t1 = [
    {
        // treatment edited
        tId: '7E9081', 
        tTitle: 'Neonersia fugax (Melichar, 1912)', 
        author: 'Song, Zhi-Shun', 
        created: 819174660000, 
        modified: 820834320000,
        state: 1,
        m: [
            // unchanged
            {   mId: '5EDEB3', 
                tId: '7E9081', 
                lat: '22.345', 
                lon: '21.546',
                created: 819167040000 },

            // edited
            {   mId: '283B67', 
                tId: '7E9081', 
                lat: '83.433', 
                lon: '-16.874',
                created: 819167400000,
                modified: 820834320000,
                state: 1 },

            // deleted
            {   mId: 'B59511', 
                tId: '7E9081', 
                lat: '22.442', 
                lon: '21.687', 
                created: 819174600000,
                modified: 820834320000,
                state: 0 },

            // added
            {   mId: '677E2553DD4D43B09DA77414DB1EB8EA', 
                tId: '7E9081', 
                lat: '-45.348', 
                lon: '-121.998',
                created: 821698320000 }
        ]
    },

    // entire treatment deleted
    {
        tId: '0c74f1', 
        tTitle: 'Daptonema papillifera', 
        author: 'Sun, Yan, Huang', 
        created: 819174720000, 
        modified: 821698320000, 
        state: 0,
        m: [
            {   mId: 'b4b2fb', 
                tId: '0c74f1', 
                lat: '-56.967', 
                lon: '67.376',
                created: 819174720000 },
        ]
    }
];
```

We run the program again with new data `insertRows(data_t1)` and we get the following

```sql
sqlite> SELECT * FROM treatments;
id          tId     tTitle                            author          created       modified      state     
----------  ------  --------------------------------  --------------  ------------  ------------  ----------
1           7E9081  Neonersia fugax (Melichar, 1912)  Song, Zhi-Shun  819174660000  820834320000  1  <- edited       
2           2F2B15  Polyrhachis                       Fr. Smith       819174660000                          
3           0c74f1  Daptonema papillifera             Sun, Yan, Huan  819174720000  821698320000  0  <- deleted       
sqlite> SELECT * FROM materialsCitations;
id          mId     tId     lat         lon         created       modified    state     
----------  ------  ------  ----------  ----------  ------------  ----------  ----------
1           5EDEB3  7E9081  22.345      21.546      819167040000                        
2           283B67  7E9081  83.433      -16.874     819167400000  8208343200  1 <- edited        
3           B59511  7E9081  22.442      21.687      819174600000  8208343200  0 <- deleted        
4           07D267  2F2B15  123.542     12.522      819174660000                        
5           b4b2fb  0c74f1  -56.967     67.376      819174720000  8216983200  0 <- deleted        
6           677E25  7E9081  -45.348     -121.998    821698320000                <- added
```
