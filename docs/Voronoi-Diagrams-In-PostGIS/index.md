---
title      : Voronoi Diagrams In PostGIS (with PL/R)
description:
modified   : 2012-03-06 11:23:00
created    : 2012-03-06 11-23-00
viewcount  : 0
id         :
gmap       :
tags       :
    - code
    - PL/R
    - R
    - PostGIS
    - Perl
    - Voronoi
stars      :
---


A Voronoi diagram represents proximity information about a set of points. The points on the Voronoi diagram are equidistant to two or more sites. Per [Voronoi Diagrams and Delaunay Triangulation](http://www.comp.lancs.ac.uk/~kristof/research/notes/voronoi/)

> Voronoi diagrams were first discussed by Peter Lejeune-Dirichlet in 1850. But it was more than a half of a century later in 1908 that these diagrams were written about in a paper by Voronoi, hence the name Voronoi Diagrams. The Voronoi cells/polygons are sometimes also called Thiessen Polytopes or Dirichlet Regions.

<figure>
	<img src="img/macrostrat.jpg">
	<figcaption>Macrostrat</figcaption>
</figure>

Ever wanted to create a Voronoi tessellation for your points? Well, so have I, for our Macrostrat points. Fortunately for us, others already figured out how to do this. I have dusted off the original code by [Mike Leahy](http://www.linkedin.com/in/mgleahy) ever so slightly, and added a little bit more explanation, but it is good to go. It does require Postgres/PostGIS with PL/R. I am using Pg 9.0.x, PostGIS 1.5.3, and the latest PL/R as installed with help of MacPorts. Here is how to use the function once it is installed.

<pre class="brush: sql"><code>
	SELECT v.id, v.polygon
	FROM r_voronoi('table', 'the_geom', 'id') As v;
</code></pre>

or

<pre class="brush: sql"><code>
	SELECT v.id, v.polygon
	FROM r_voronoi(
		'(SELECT id, the_geom FROM table LIMIT 10) AS p',
		'p.the_geom',
		'p.id'
	) As v;
</code></pre>

The code for the function is below. All my contribution is under a [CC0 License Waiver](http://creativecommons.org/about/cc0). I claim no responsibility for your successes or failures.

<pre class="brush: sql"><code>
	/*
	  This function uses the deldir library in R to generate voronoi  
	  polygons for an input set of points in a PostGIS table.

	  Original function by Mike Leahy mgleahy at alumni.uwaterloo.ca
	  http://postgis.refractions.net/pipermail/postgis-users/2007-June/016102.html

	  Mar 6, 2012
	  Cleaned up formatting, and updated a teensy bit to modern times
	  Puneet Kishor punkish@eidesis.org
	  All my contribution is released under a CC0 License Waiver
	  Effectively in the Public Domain

	  Requirements:
	      R-2.5.0 with deldir-0.0-5 installed
	      PostgreSQL-8.2.x with PostGIS-1.x and PL/R-8.2.0.4 installed

	  Usage: SELECT * FROM r_voronoi('table','point-column','id-column');

	  Where:
	  'table' is the table or query (see below) containing the points to 
	  be usedfor generating the voronoi polygons,
	  
	  'point-column' is a single 'POINT' PostGIS geometry type
	  (each point must be unique)
	  
	  'id-column' is a unique identifying integer for each of the 
	  originating points (e.g., 'gid')

	  Output: returns a recordset of the custom type 'voronoi', which 
	  contains the id of the originating point, and a polygon geometry

	  Alternative usage: Instead of the name of a table, pass a query 
	  that returns a result set. Make sure to us an ALIAS for the 
	  result set.
	  
	  SELECT * FROM r_voronoi(
	      '(SELECT id, the_geom FROM table LIMIT 10) AS p',
	      'p.the_geom',
	      'p.id'
	  )
	*/
	DROP FUNCTION r_voronoi(text, text, text);
	DROP TYPE voronoi;

	CREATE TYPE voronoi AS (id integer, polygon geometry);

	CREATE OR REPLACE FUNCTION r_voronoi(text, text, text) 
	RETURNS SETOF voronoi AS '
</code></pre>

R code below

<pre class="brush: r"><code>
		library(deldir)

		# select the point x/y coordinates into a data frame
		points <- pg.spi.exec(
			sprintf(
				"SELECT ST_X(%2$s) AS x, ST_Y(%2$s) AS y FROM %1$s;",
				arg1,
				arg2
			)
		)

		# calculate an approprate buffer distance (~10%):
		buffer_distance = (
			(
				abs(max(points$x) - min(points$x)) +
				abs(max(points$y) - min(points$y))
			) / 2
		) * (0.10)

		# get EWKB for the overall buffer of the convex hull for all points:
		buffer_set <- pg.spi.exec(
			sprintf(
				"SELECT ST_Buffer(ST_Convexhull(ST_Union(%2$s)),%3$.6f) AS ewkb 
				FROM %1$s;",
				arg1,
				arg2,
				buffer_distance
			)
		)

		# the following use of deldir uses high precision and digits to 
		# prevent slivers between the output polygons, and uses a relatively
		# large bounding box with four dummy points included to ensure that
		# points in the peripheral areas of the dataset are appropriately
		# enveloped by their corresponding polygons:
		voro = deldir(
			points$x,
			points$y,
			digits=22,
			frac=0.00000000000000000000000001,
			list(ndx=2,ndy=2),
			rw=c(
				min(points$x) - abs(min(points$x) - max(points$x)),
				max(points$x) + abs(min(points$x) - max(points$x)),
				min(points$y) - abs(min(points$y) - max(points$y)),
				max(points$y) + abs(min(points$y) - max(points$y))
			)
		)

		tiles = tile.list(voro)
		poly = array()
		id = array()
		p = 1

		# construct the outgoing WKT now
		for (i in 1:length(tiles)) {
			tile = tiles[[i]]

			curpoly = "POLYGON(("

			for (j in 1:length(tile$x)) {
				 curpoly = sprintf(
					"%s %.6f %.6f,",
					curpoly,
					tile$x[[j]],
					tile$y[[j]]
				 )
			}

			curpoly = sprintf(
				"%s %.6f %.6f))",
				curpoly,
				tile$x[[1]],
				tile$y[[1]]
			)

			# this bit will find the original point that corresponds to the 
			# current polygon, along with its id and the SRID used for the
			# point geometry (presumably this is the same for all points)...
			# this will also filter out the extra polygons created for the
			# four dummy points, as they will not return a result from
			# this query:
			ipoint <- pg.spi.exec(
				sprintf(
					"SELECT %3$s AS id, 
					   intersection(''SRID=''||srid(%2$s)||'';%4$s'',''%5$s'') 
					   AS polygon 
					FROM %1$s 
					WHERE intersects(%2$s,''SRID=''||srid(%2$s)||'';%4$s'');",
					arg1,
					arg2,
					arg3,
					curpoly,
					buffer_set$ewkb[1]
				)
			)
			if (length(ipoint) > 0) {
				poly[[p]] <- ipoint$polygon[1]
				id[[p]] <- ipoint$id[1]
				p = (p + 1)
			}
		}
		return(data.frame(id,poly))
</code></pre>

Close off with SQL

<pre class="brush: sql"><code>
	' language 'plr';
</code></pre>

