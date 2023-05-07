---
title      : Geodata with SQLite
description: 
modified   : 2023-04-14 10:35:00
created    : 2023-04-14 10:35:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - code
    - SQLite
    - nodejs
stars      :
---

SQLite offers the [**R\*Tree** module](https://www.sqlite.org/rtree.html) for working with range queries useful when dealing with geodata. An additional [**Geopoly** interface](https://www.sqlite.org/geopoly.html), built on top of **R\*Tree** further facilitates geospatial analysis. While the common usecase for R*Tree and Geopoly is with poly data, I needed to maintain and analyze point-data. Here is what I learned.

```js
import Database from 'better-sqlite3';
const db = new Database('geo.sqlite');

// the chance module allows creating synthetic data easily 
// for testing. See https://chancejs.com/index.html for details
import Chance from 'chance';
const chance = Chance();

const createTables = () => {

    // create table to hold the data with basic sanity checks
    db.prepare(`CREATE TABLE IF NOT EXISTS t (
        id INTEGER PRIMARY KEY,
        longitude REAL,
        latitude REAL,
        desc TEXT,
        validGeo BOOLEAN GENERATED ALWAYS AS (
            typeof(longitude) = 'real' AND 
            abs(longitude) <= 180 AND 
            typeof(latitude) = 'real' AND 
            abs(latitude) <= 90
        ) STORED
    )`).run();

    // create the two virtual tables related to the main table 
    // via the id PRIMARY KEY
    db.prepare(`CREATE VIRTUAL TABLE IF NOT EXISTS tr USING rtree (
        id,
        minX, maxX,
        minY, maxY,
        +t_id
    )`).run();

    db.prepare(`CREATE VIRTUAL TABLE IF NOT EXISTS tg USING geopoly (t_id)`)
        .run();
}
```

A basic, rectangular poly looks like so (note that longitude is `x` and latitude is `y`)

<figure>
    <picture>
        <source srcset="img/poly.png" media="(min-width:400px)">
        <img src="img/poly.png">
    </picture>
    <figcaption>Poly</figcaption>
</figure>

It is possible to store points in an **R\*Tree** virtual table by making the bottom-left and top-right corners of a box the same, that is, a square of side = 0. However, while I was able to store the same in a **Geopoly** table as well, the `geopoly_within()` function didn't return any result. So I decided to make a tiny box of 5 meters around every point and store those polys in the virtual tables. The only problem is that the length of each degree of latitude in meters varies with the latitude (it gets smaller as one moves away from the equator toward the poles). The formula `abs(1/(40075017*cos(latitude)/360))` returns meters for any given latitude (40075017 is the radius of the earth in meters).

Triggers populate the virtual tables as the main table gets loaded with data. The `geopoly_regular()` function below makes a `4` sided poly of `abs(5/(40075017*cos(latitude)/360))` meters centered at `[longitude, latitude]`. The function `geopoly_bbox()` returns the bounding box of the poly, and `geopoly_json()` converts the bbox into json. Then `json_extract()` pulls out the bottom-left and top-right corners.

*Note: I am mixing meters and lng/lat because that is how we tend to use them in real life -- when talking of points, we refer to them with their lng/lat coords (actually, in spoken English we tend to say lat/lng even though we refer to cartesian coords as x/y), and when talking of distances, we speak in meters. I want to be able to answer queries such as, "Find all the points within x meters of (this) longitude/latitude."*

```js
const createTriggers = () => {
    db.prepare(`CREATE TRIGGER IF NOT EXISTS aftInsT
    AFTER INSERT ON t
    WHEN new.validGeo = 1
    BEGIN

        -- insert new entry in the rtree table
        INSERT INTO tr (
            minX, maxX, minY, maxY,
            t_id
        )
        SELECT 
            json_extract(g, '$[0][0]') AS minX, 
            json_extract(g, '$[2][0]') AS maxX,
            json_extract(g, '$[0][1]') AS minY,
            json_extract(g, '$[2][1]') AS maxY,
            id
        FROM (
            SELECT
                geopoly_json(
                    geopoly_bbox(
                        geopoly_regular(
                            new.longitude, 
                            new.latitude, 
                            abs(5/(40075017*cos(new.latitude)/360)),
                            4
                        )
                    )
                ) AS g,
                new.id AS id
        );

        -- insert new entry in the geopoly table
        INSERT INTO tg (
            _shape,
            t_id
        ) 
        VALUES (

            -- shape
            geopoly_bbox(
                geopoly_regular(
                    new.longitude, 
                    new.latitude, 
                    abs(5/(40075017*cos(new.latitude)/360)),
                    4
                )
            ),
            new.id
        );
    END;`).run();
}
```

Now we load the main table which automatically populates the virtual tables.

```js
const loadTable = () => {
    const stm = db.prepare(`INSERT INTO t (longitude, latitude, desc) 
    VALUES (@longitude, @latitude, @desc)`);

    // insert 100 random points
    const data = [...Array(100).keys()].map(i => {
        return {
            longitude: chance.longitude(),
            latitude : chance.latitude(),
            desc     : chance.sentence({ words: 5 })
        }
    });

    for (const row of data) {
        stm.run(row);
    }
    
}

// helper function to make polys easily
const geopolyRegular = (longitude, latitude, R, N) => {
    return `geopoly_regular(
        ${longitude}, 
        ${latitude}, 
        abs(${R}/(40075017*cos(${latitude})/360)), 
        ${N} 
    )`
};

// helper function to get bbox corners easily
const jsonExt = (pos, longitude, latitude, R, N) => {
    const corners = {
        minX: '$[0][0]',
        maxX: '$[2][0]',
        minY: '$[0][1]',
        maxY: '$[2][1]'
    };

    return `json_extract(
        geopoly_json(
            geopoly_bbox(
                ${geopolyRegular(longitude, latitude, R, N)}
            )
        ), 
        '${corners[pos]}'
    )`;
};
```

<figure>
    <picture>
        <source srcset="img/points-in-poly.png" media="(min-width:400px)">
        <img src="img/points-in-poly.png">
    </picture>
    <figcaption>Points in Poly</figcaption>
</figure>

Since `minX/minY` are the same as `maxX/maxY` in our data, we need to do the `WHERE … BETWEEN` comparison only for one of those pairs.

```
const selectData = () => {
    const obj = {
        latitude: 0,
        longitude: 0,
        R: 111319.458 * 1,
        N: 4
    };

    const resTr = db.prepare(`SELECT t.id, t.longitude, t.latitude, t.desc  
    FROM t JOIN tr ON t.id = tr.t_id 
    WHERE 
        minX BETWEEN 
            ${jsonExt('minX', '@longitude', '@latitude', '@R', '@N')} AND 
            ${jsonExt('maxX', '@longitude', '@latitude', '@R', '@N')} AND 
        minY BETWEEN 
            ${jsonExt('minY', '@longitude', '@latitude', '@R', '@N')} AND 
            ${jsonExt('maxY', '@longitude', '@latitude', '@R', '@N')}`)
        .all(obj);

    const resTg = db.prepare(`SELECT t.id, t.longitude, t.latitude, t.desc 
    FROM t JOIN tg ON t.id = tg.t_id
    WHERE geopoly_within(
        tg._shape,
        geopoly_bbox(
            ${geopolyRegular('@longitude', '@latitude', '@R', '@N')}
        )
    )`).all(obj);

    console.log('rtree\n', resTr, '\ngeopoly\n', resTg);
}

createTables();
loadTable();
selectData();
```

Running the above script gives me the exact same answer for both **R\*Tree** and **Geopoly** tables. 

```js
// output of `selectData()`
rtree
 [
  {
    id: 150,
    longitude: 0.47599,
    latitude: 0.23464,
    desc: 'Ge uc irejiphe se meluin.'
  },
  {
    id: 772,
    longitude: 0.90166,
    latitude: -0.80421,
    desc: 'Gibet wefo wad bip vowutzoz.'
  },
  {
    id: 813,
    longitude: 0.22911,
    latitude: 0.39079,
    desc: 'Mewu sekjutfir fe kez vehpo.'
  },
  {
    id: 986,
    longitude: -0.48092,
    latitude: 0.72125,
    desc: 'Lahsun li odagaku ap fi.'
  }
] 
geopoly
 [
  {
    id: 150,
    longitude: 0.47599,
    latitude: 0.23464,
    desc: 'Ge uc irejiphe se meluin.'
  },
  {
    id: 772,
    longitude: 0.90166,
    latitude: -0.80421,
    desc: 'Gibet wefo wad bip vowutzoz.'
  },
  {
    id: 813,
    longitude: 0.22911,
    latitude: 0.39079,
    desc: 'Mewu sekjutfir fe kez vehpo.'
  },
  {
    id: 986,
    longitude: -0.48092,
    latitude: 0.72125,
    desc: 'Lahsun li odagaku ap fi.'
  }
]

```

I am free to choose whichever approach for my implementation. I like the **Geopoly** interface more as it gives me the advantage of providing irregular polygons for selection even though internally Geopoly converts them to bboxes since it is really built on top of **R\*Tree**.

Note that if I have different points with the same coordinates (entirely possible in real world data, for example, residents in a multistory building), then it would be possible to save some space by storing only unique pairs in the virtual tables and joining them with the main table via a FK. This increases the complexity of the tables and data-insertion, but may save some space if the number of points is very large.