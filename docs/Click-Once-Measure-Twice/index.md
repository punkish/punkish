---
title      : Click Once Measure Twice
description: 
modified   : 2012-02-13 21:05:49
created    : 2012-02-13 21-05-49
viewcount  : 0
id         : 
gmap       : 
tags        :
    - big data
    - Postgres
    - Perl
    - optimization
    - code
stars      : 
---

I have a fairly simple table with 8+ million rows. I want to do a postfix wildcard searches against this table of the type

<pre><code class="sql">
SELECT a, b, c FROM t WHERE Lower( a ) LIKE 'fooba%'
</code></pre>

Postgres allows one to build and use an index like below for carrying out searches such as above quickly and efficiently.

<pre><code class="sql">
CREATE INDEX idx_a ON t (Lower( a ) varchar_pattern_ops);
</code></pre>
	
I get the search term in `$q` as below

<pre><code class="perl">
$q = param 'q';

# Postfix wildcard on the search term
$q .= '%';
</code></pre>
	
Following conventional wisdom about good practices, I prepared the statement with a bind value to be supplied during execution

<pre><code class="perl">
## query 1
my $sql = qq{
	SELECT a, b, c
	FROM t 
	WHERE Lower( a ) LIKE '$q'
};
my $sth1 = $dbh->prepare($sql);
$sth1->execute();
</code></pre>

The above query takes around 2 to 4 seconds depending on the search term. Quite by accident, I had another version of the script where I had the search term inserted inline in the statement to be prepared like so

<pre><code class="perl">
## query 2
my $sth2 = $dbh->prepare(qq{
	SELECT a, b, c
	FROM t  
	WHERE Lower( a ) LIKE ?
});
$sth2->execute($q);
</code></pre>
	
This second version is an order of magnitude faster, taking 200 to 400 ms. Hmmmm… After much querying on [Stackoverflow](http://stackoverflow.com/questions/9269504/same-query-two-different-ways-vastly-different-performance/9271138#9271138), [Perlmonks](http://www.perlmonks.org/?node_id=953562), and on the DBI list, this is what I discovered: the Postgres query planner sees the first query and already knows that is has a string with a postfix wildcard, so it figures it can use the index. In the case of the second query, however, the Postgres query planner has no idea what term might be supplied, so it decides to do a sequential scan, which is rather expensive on a table with 8+ million rows.

Identical queries from my point of view, but seen very differently by Postgres. Now, it is possible to turn on a switch in DBI and prevent [server prepared queries](http://search.cpan.org/~turnstep/DBD-Pg-2.18.1/Pg.pm#pg_server_prepare_%28integer%29). But, moral of the story -- click once, but do measure twice.

