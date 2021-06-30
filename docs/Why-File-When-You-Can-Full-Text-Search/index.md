---
title      : Why File When You Can Full-Text Search
description: 
modified   : 2008-02-19 16:48:29
created    : 2008-02-19 16:48:29
viewcount  : 328
id         : 554
gmap       : 
tags        :
    - code
    - SQLite
    - FTS
stars      : 
tmpl       : 2_cols
ui			: 
---


Why file (or, in databases, categorize) when you can search? Although full-text search doesn't preclude other useful devices such as tagging and constraining searches by SQL columns, for the most part, full-text search is as close to a perfect information retrieval device as the memex could be.

Here is how to accomplish full-text search using [SQLite](http://www.sqlite.org) and Perl [DBD::SQLite](http://search.cpan.org/~msergeant/DBD-SQLite-1.14/lib/DBD/SQLite.pm).

1. Install Perl DBD::SQLite
  1. If you already have SQLite installed on your computer, move or rename `/usr/local/lib/libsqlite*` to something else so the new `DBD::SQLite` install is forced to use its own source.
  1. [Download](http://search.cpan.org/CPAN/authors/id/A/AU/AUDREYT/DBD-SQLite-Amalgamation-3.5.6.tar.gz)</a> Audrey Tang's most excellent [DBD::SQLite::Amalgamation-3.5.6](http://search.cpan.org/~audreyt/DBD-SQLite-Amalgamation-3.5.6/lib/DBD/SQLite/Amalgamation.pm)</a> from CPAN. Yes, we will use the [SQLite Amalgamation](http://www.sqlite.org/amalgamation.html) instead of the source code bits-and-bobs. Audrey's version magically does all the work and then disappears -- you still use DBD::SQLite via DBI, all the same syntax and all, but you get the latest source code all in one slurpee.
  1. un-gzip-tar the source code for the Perl module.
  1. Edit Makefile.PL. Add the flag `-DSQLITE_ENABLE_FTS3=1` to the 'DEFINE' key. It is line 135 in my Makefile.PL. I just added it right at the beginning. So, my 'DEFINE' key now looks like<br>
    `'DEFINE' => "-DSQLITE_ENABLE_FTS3=1 -DSQLITE_CORE -DNDEBUG=1 -DSQLITE_PTR_SZ=$Config{ptrsize}"`
  1. `make && sudo make install`
1. Install the latest SQLite with full-text search (for command line operation)
  1. [Download](http://www.sqlite.org/sqlite-amalgamation-3.5.6.tar.gz) the latest SQLite amalgamation from the mothership.
  1. run the following command in the src directory<br>
    `CFLAGS="-Os -DSQLITE_ENABLE_FTS3=1" ./configure`
  1. Finally, `make && sudo make install`


Alright. Now everything is installed. What to do now?

Let's imagine you have a bunch of papers (text files) that you want to load into a database and enable full-text search on it. Your schema is

    CREATE TABLE paper (
        paper_id INTEGER PRIMARY KEY, 
        paper_name TEXT, 
        paper_text TEXT
    );
  
Load your papers into the above table. It will automatically get its primary key populated by SQLite.

Now, create the following virtual table

    CREATE VIRTUAL TABLE fts_paper 
    USING fts3 (paper_name, paper_text);
    
Now, load data into it from your main table **paper**.

    INSERT INTO fts_paper (rowid, paper_name, paper_text) 
    SELECT paper_id, paper_name, paper_text FROM paper

Fts will do its magic and create a few of its own tables. In my world they look like

    CREATE TABLE fts_paper_content (
      docid INTEGER PRIMARY KEY,
      c0paper_name, 
      c1paper_text
    );
  
    CREATE TABLE fts_paper_segdir (
      level INTEGER,  
      idx INTEGER,  
      start_block INTEGER,  
      leaves_end_block INTEGER,  
      end_block INTEGER,  
      root BLOB,  
      PRIMARY KEY(level, idx)
    );
  
    CREATE TABLE fts_paper_segments (  
      blockid INTEGER PRIMARY KEY,  
      block BLOB
    );

But, leave those tables alone. But, you can now search your papers using 

    SELECT a.paper_id, a.paper_name, snippet(b.paper_text) 
    FROM paper a JOIN fts_paper b ON a.paper_id = b.rowid 
    WHERE b.paper_text MATCH 'automatically';

Assuming this wiki page has been inserted into the full-text index, you will get back (the following results are broken up on multiple lines)

    543 | 
    Why File When You Can Full-Text Search | 
    ... papers into the above table. It will 
    automatically get its primary key populated by 
    SQLite. ...
  
Final step. Create a few TRIGGERs to automatically update the fts index on INSERTs and UPDATEs

    CREATE TRIGGER update_fts 
    AFTER UPDATE OF paper_text ON paper 
    BEGIN
      UPDATE fts_paper 
      SET paper_text = new.paper_text 
      WHERE rowid = old.paper_id;
    END
  
    CREATE TRIGGER insert_fts 
    AFTER INSERT ON paper 
    BEGIN
      INSERT INTO fts_paper (rowid, paper_text) 
      VALUES (new.paper_id, new.paper_text);
    END

Enjoy.


