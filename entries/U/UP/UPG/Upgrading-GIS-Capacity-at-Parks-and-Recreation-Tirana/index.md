---
title      : Upgrading GIS Capacity at Parks and Recreation, Tirana
description: 
modified   : 2016-12-23 14:57:00
created    : 2016-12-23 14:57:00
viewcount  : 0
id         : 569
gmap       : 
tags        :
    - GIS
    - Bashkia Tirana
stars      : 
---

[Agjencia e Parqeve dhe Rekreacionit Tiranë](http://aprtirana.al), or APR, manages 40,000+ ha of parks, and has an ambitious plan to plant 2 million trees in Tirana by 2030. To prepare for this task, to continuously monitor progress toward it, and to finally achieve this target, APR will require in-house technical capacity. A crucial component of such technical capacity is a robust geographic information system (GIS) that stores and manages the authoritative record of all of APR’s land holdings and resources.

Currently a map of parcels of land managed by APR is maintained as a layer in AutoCAD. There are 46 parcels in the layer right now. Each parcel has trees planted already, however, there is no geolocation information for the trees. There is, however, information about the number and species of trees, and other information about each tree.

All this information is maintained in a MS-Excel spreadsheet with one sheet for every parcel. The 46 sheets containing the parcel-level information are names “Parcel 1,” “Parcel 2,” and so on. There are other sheets in the spreadsheet containing other related information about the trees. Other than the naming convention, there is no link between the parcels in AutoCAD and the sheets in Excel.

<figure>
    <img src="parcels-tables.jpg">
    <figcaption>park parcels stored in a spreadsheet</figcaption>
</figure>

First, the parcels layer was exported from AutoCAD to [ESRI](http://esri.com/) [shapefile](https://en.wikipedia.org/wiki/Shapefile) format as polygons. This ensured that closed polylines were treated as polygons in the GIS. And the 46 individual sheets in the Excel spreadsheet were combined into a single sheet, and a column was added to the sheet for the parcel number of each sheet. This resulted in a table with more than 900 rows that was then exported to a comma separated value (CSV) format:

    apr-tirana$ ll
    total 528
    drwxr-xr-x  8 punkish  staff     272 Dec 22 18:11 .
    drwxr-xr-x  7 punkish  staff     238 Dec 22 18:10 ..
    -rwxrwxrwx  1 punkish  staff       4 Dec 13 12:34 parcels.cpg
    -rwxrwxrwx  1 punkish  staff   24038 Dec 13 12:37 parcels.dbf
    -rwxrwxrwx  1 punkish  staff    3120 Dec 13 12:34 parcels.idx
    -rwxrwxrwx  1 punkish  staff  180244 Dec 13 12:37 parcels.shp
    -rwxrwxrwx  1 punkish  staff     820 Dec 13 12:37 parcels.shx
    -rw-r--r--@ 1 punkish  staff   47781 Dec 15 16:22 trees.csv
    apr-tirana$ 
    apr-tirana$ less trees.csv
    parcel_number,tree_type,govt_type,dia1_6cm,dia6_9cm,dia10_22cm,dia23_42cm,dia_42cm_plus,damaged_trees,description
    1,Akacie,Trungishte,8,2,1,4,2,,Në gjëndje të mirë
    1,Dafinë ,Shkurre,16,,,,,,Në gjëndje të mirë
    1,Eukalipt,Trungishte,,1,4,4,4,,Në gjëndje të mirë
    …
    2,Akacie,Trungishte,20,20,40,10,12,,Mbi 20 cm degraduara
    2,Akacie,Trungishte,10,20,,,,,Mbi 20 cm degraduara
    2,Akacie,Trungishte,20,10,4,,,,Mbi 20 cm degraduara
    …
    apr-tirana$
    apr-tirana$ wc -l parcels.csv 
        928 parcels.csv

The next step was to download and install Quantum GIS aka [QGIS](http://www.qgis.org/en/site/), a free and open source desktop GIS that allows users to “Create, edit, visualise, analyse and publish geospatial information on Windows, Mac, Linux, BSD (Android coming soon)” on their “desktop, server, in the web browser and as developer libraries.” QGIS is primarily a desktop product designed to work with local or remote data. There is a QGIS Server project as well, but it is mostly for publishing data using web mapping service (WMS) or web feature service (WFS) specifications. In any case, the QGIS family of products is not designed to serve as a central store of GIS data. 

To enable central storage of a single, authoritative APR dataset, and to provide advanced analytical and publishing capabilities for the long term, [PostGIS](http://postgis.org) was chosen as the data storage option. PostGIS is a spatial extension to the free and open source relational database [PostgreSQL](https://www.postgresql.org) (aka Postgres) that has been around for decades and is considered “the world’s most advanced opensource database.” Simple to get started, Postgres is capable of handling hundreds of millions of entities for virtually any business or analytical scenario. PostGIS, also free and open source, allows storing spatial data in Postgres and manipulating and analyzing these data with the help of dozens of spatial functions that allow querying spatial data like any other relational data.

Once Postgres/PostGIS were installed, a database was created to hold all the APR data, and this database was spatially enabled by installing the spatial extension via `psql`, the command line interface to Postgres:

    apr-tirana$ psql -d apr -c "CREATE EXTENSION postgis;"
    apr=# \l
                                    List of databases
    Name       |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
    -----------+----------+----------+-------------+-------------+-----------------------
    apr        | punkish  | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
    postgres   | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
    template0  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
               |          |          |             |             | postgres=CTc/postgres
    (3 rows)
    apr=# \q

As we can see above in the `psql` console, `\l` lists all the database, showing our newly created **apr** database with the default UTF8 encoding. We quit `psql` with the command `\q` to get back at the console prompt.

The shapefile was imported into Postgres with the help of a standalone utility program called `shp2pgsql` which comes with [PostGIS](http://postgis.net/)

    apr-tirana$ shp2pgsql -c -D -s 32634 -I parcels.shp public.parcels | psql -d apr

The `shp2pgsql` command is used with the following switches (note the Albania specific SRID as Albania is in UTM zone 34N).

    -c Creates a new table and populates it, default if you do not specify any options.
    -D Use postgresql dump format (defaults to sql insert statments).
    -s from_srid 32634 for Albania (no to_srid is specified so no transformation happens).
    -I Create a GiST index on the geometry column.

The output from `shp2pgsql` is piped directly to `psql` and into the **apr** database with the `-d` switch.

Finally, we create a table in Postgres to hold our **trees.csv** and import the CSV into it. For this, we go back into `psql` and ru the following commands

    apr-tirana$ psql -d apr
    apr=# CREATE TABLE trees (
    apr(#    parcel_number INTEGER, 
    apr(#    tree_type VARCHAR, 
    apr(#    govt_type VARCHAR, 
    apr(#    dia1_6cm INTEGER, 
    apr(#    dia6_9cm INTEGER, 
    apr(#    dia10_22cm INTEGER, 
    apr(#    dia23_42cm INTEGER, 
    apr(#    dia_42cm_plus INTEGER, 
    apr(#    damaged_trees VARCHAR, 
    apr(#    description VARCHAR
    apr(# );
    apr=# COPY trees FROM '~/apr-tirana/trees.csv' DELIMITER ',' CSV HEADER;

Now that all our data are imported into Postgres, we can connect to the database from QGIS and work with it in a real, world class, modern GIS environment.

<figure>
    <img src="qgis.jpg">
    <figcaption>parks coverage</figcaption>
</figure>

From here, the next major step would be to hook a web server to serve data to the browser directly from PostGIS. But that is for another day…
