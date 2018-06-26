---
title      : Emulating Enumerated Data Types in PostgreSQL
description: 
modified   : 2012-06-11 15:16:00
created    : 2012-06-11 15:16:00
viewcount  : 0
id         : 569
gmap       : 
tags        :
    - postgresql
    - programming
stars      : 
---

There are three ways to restrict entries in a Postgres database table column. Consider a table to store "colors" where you want only 'red', 'green', or 'blue' as valid entries.

1. 	Enumerated data type

		CREATE TYPE valid_colors AS ENUM ('red', 'green', 'blue');
		
		CREATE TABLE t (
			color VALID_COLORS
		);
	
	Advantages are that the type can be defined once and then reused in as many tables as needed. A standard query can list all the values for an ENUM type, and can be used to make application form widgets.
	
		SELECT 	n.nspname AS enum_schema,  
				t.typname AS enum_name,  
				e.enumlabel AS enum_value
		FROM 	pg_type t JOIN 
				pg_enum e ON t.oid = e.enumtypid JOIN 
				pg_catalog.pg_namespace n ON n.oid = t.typnamespace
		WHERE 	t.typname = 'valid_colors'
		
		 enum_schema | enum_name     | enum_value 
		-------------+---------------+------------
		 public      | valid_colors  | red
		 public      | valid_colors  | green
		 public      | valid_colors  | blue
	
	Disadvantages are, the ENUM type is stored in system catalogs, so a query as above is required to view its definition. These values are not apparent when viewing the table definition. And, since an ENUM type is actually a data type separate from the built in NUMERIC and TEXT data types, the regular numeric and string operators and functions don't work on it. So, one can't do a query like

		SELECT FROM t WHERE color LIKE 'bl%'; 

2.	Check constraints

		CREATE TABLE t (
			colors TEXT CHECK (colors IN ('red', 'green', 'blue'))
		);

	Two advantage are that, one, "what you see is what you get," that is, the valid values for the column are recorded right in the table definition, and two, all native string or numeric operators work.
	
3.	Foreign keys

		CREATE TABLE valid_colors (
			id SERIAL PRIMARY KEY NOT NULL,
			color TEXT
		);
		
		INSERT INTO valid_colors (colors) VALUES 
			('red'),
			('green'),
			('blue');
			
		CREATE TABLE t (
			color_id INTEGER REFERENCES valid_colors (id)
		);
		
	Essentially the same as creating an ENUM type, except, the native numeric or string operators work, and one doesn't have to query system catalogs to discover the valid values. Oh, and like #1 above, this too is form-widget-friendly.

