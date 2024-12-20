---
title      : Serving Data, Licenses, Citations, and Tracking Use  
description: a proposal on closing the loop  
modified   : 2012-03-29 12:21:49  
created    : 2012-03-29 12-21-49  
viewcount  : 0  
id         : 24  
gmap       :   
tags        :
    - licenses
    - CC
    - Copyright
    - Intellectual Property
stars      :   
---

We have <strike>four</strike> five objectives

1.  Allow contributors to declare their preferred licenses;

    If the contributors agree to a single license type, then everything is a lot easier. Assuming contributors want control over their data, and want to customize licenses, we need to allow contributors to declare their preferred license types.
    
    Each contributor can have a license, but the same license will be applied to all records entereby by that contributor. That is, a contributor cannot have more than one preferred license type.
    
    Theoretically a contributor could choose any license, but preferably the license should be chosen from a predetermined set of well-known licenses. We use the Creative Commons licenses, skewing toward CC0 and CC-BY as the most preferred licenses.

2.  Return license info for every row in the result set;

    A query can return rows entered by many contributors. As such, the license information should be returned for every row. To reduce bulk in the returned result set, we return only a URI with the license_id.

3.  Track query count for the root resource in every result set;

    For every result set, we track how many times each row has been queried. This opens up possibilities of all kinds of analytics, not just from the perpesctive of who entered the record, but also criteria such as spatial distribution of more popular queries. A point to note: we track only queryable resources, not dependent resources. For example, given a resource called "collection" that has a "collection_type," only collections are tracked, not collection_types. Another way to look at it -- if you want to track it, it should be worth tracking, and should have an "entered_by" assigned to it.

4.  Provide a mechanism to cite a result set with a permanent URI.

    Since every query is unique, we can return a URI, if requested, that may be used to cite the queried record set. The permanent URI can easily be resolved back to the original result set. If the URI returns results from a single contributor, that contributor can be cited. If the URI returns results from more than one contributor, the entire data collection team can be cited.
    
    Other initiatives have chosen different mechanisms for identification. For example, [DataCite][dc] uses digital object identifiers or DOIs. However, this seems to prefer centralization as I can't just create a DOI. I have to first find a DataCite member who will then facilitate my getting the ability to generate my own DOIs. This also seems to violate timbl's [second rule of linked data][ld]:
    
    > The second rule, to use HTTP URIs, is also widely understood. The only deviation has been, since the web started, a constant tendency for people to invent new URI schemes (and sub-schemes within the urn: scheme) such as LSIDs and handles and XRIs and DOIs and so on, for various reasons. Typically, these involve not wanting to commit to the established Domain Name System (DNS) for delegation of authority but to construct something under separate control. Sometimes it has to do with not understanding that HTTP URIs are names (not addresses) and that HTTP name lookup is a complex, powerful and evolving set of standards.
    
    One argument against URIs may be that they are not persistent. However, that is not a knock against URIs. That is entirely an institutional problem as there is nothing inherent in a URI that makes it volatile. In fact, HTTP specs provide for redirection codes as the correct and viable way to direct the user to the right destination.
    
    One knock against DOI is that it introduces another layer of indirection and complexity where none were needed. The more important reason for URI as opposed to a DOI is that I want a unique identifier for any arbitrary query. An experiment might depend on a certain query, and that query, in fact, any query, is identifiable by its URI. In a persistently and ubiquitously networked environment, it is unimaginable that any scientist will be able to get a DOI for any arbitrary query instantly.
 
[dc]: http://datacite.org   
[ld]: http://www.w3.org/DesignIssues/LinkedData

5.  Enable URIs to preserve history.

    A URI is a unique way to reach a resource. However, even a unique and persistent URI may not return exactly the same resource everytime. For example a URI to "today's weather" always does return "today's" weather, except, the data returned are different from yesterday. To solve this problem we attach a timestamp to each resource, and return the most recent representation of the resource relative to the URI timestamp. If a URI doesn't have an explicit timestamp, it defaults to the implicit timestamp `now()`.
    
    Further, to preserve history, no resource is every deleted. It is simply marked as "inactive" but is still queryable. If a resource is modified, the data enterer/modifier can make a decision as to whether the modification is "substantive" or "trivial." In case of a substantive modification, the copy of the resource is made and modified while the original resource is archived as "inactive."
    
6.  Validate returned dataset.

    Along with providing timestamps to ensure data from correct time are being returned, a scheme such as the Dataverse Network's [Universal Numerical Fingerprint][unf] created by Micah Altman, or PGP, MD5 or SHA1 digests as employed by most open source software downloads may be utilized to ensure that the data retrieved sometime in the future from an existing URI are the same as the original dataset returned when the URI was first used. The short Perl program below creates my implementation of UNF that I call the **EarthBase Fingerprint** (EBF) that deals with JSON-ified data.
    
> Micah Altman. 2008. "A Fingerprint Method for Verification of Scientific Data", in Advances in Systems, Computing Sciences and Software Engineering (Proceedings of the International Conference on Systems, Computing Sciences and Software Engineering 2007), Springer Verlag.

[unf]: http://thedata.org/book/unf-version-5

<!--
[^ma]: Micah Altman. 2008. "A Fingerprint Method for Verification of Scientific Data", in Advances in Systems, Computing Sciences and Software Engineering (Proceedings of the International Conference on Systems, Computing Sciences and Software Engineering 2007), Springer Verlag.
-->

<pre><code class="perl">
use JSON;
use Data::Dumper;
use Data::Rmap qw( rmap );
use Digest::SHA qw(sha256_base64);
use Scalar::Util qw(looks_like_number);
use Date::Parse;
use Date::Format;
use Storable qw(dclone);
use Data::Compare;

my $file = '/path/to/data.json';

open my $fh, '<', $file or die $!;
my $data = from_json <$fh>;
close $fh;

my $orig = dclone($data);

my $ebf = ebf($data);
say $ebf . "\n";

say ('-' x 50);
say "A few years later... ";

my $ebf = ebf($orig);
say $ebf . "\n";

test($orig, $data);

sub test {
    my ($orig, $data) = @_;
    
    say 'The two are ' . 
        (Compare($orig, $data) ? '' : 
        'not ') . 
        'identical';
}

sub ebf {
    my ($data) = @_;
    
    return sha256_base64( 
        join(',', sort{ $a cmp $b } rmap { masticate($_); } $data) );
}

sub masticate {
    my ($data) = @_;

    my $orig_data = $data;
    my $ROUNDTO = '%.' . 7 . 'f';
    
    # number
    if (looks_like_number($data)) {
    
        # real
        if ($data =~ /\./) {
            $data = sprintf($ROUNDTO, $orig_data) * 1;
        }
        
        # integer
        else {
            $data = $orig_data;
        }
    }
    
=begin

## dates

* 	Normalize time, date, and durations based on a single, unambiguous 
	representation selected from the many described in the ISO 8601 
	standard.

* 	Convert calendar dates to a character string of the form YYYY-MM-DD. 
	Partial dates in the form YYYY or YYYY-MM are permitted.

	Time representation is based on the ISO 8601 extended format, 
	hh:mm:ss.fffff. When .fffff represents fractions of a second, 
	it must contain no trailing (non-significant) zeroes, and is omitted 
	if valued at zero. Other fractional representations, such as 
	fractional minutes and hours, are not permitted. If the time zone of 
	the observation is known, convert the time value to the UTC time zone 
	and append a 'Z' to the time representation.

	Format elements that comprise a combined date and time by concatenating 
	the (full) date representation, “T”, and the time representation. Do not 
	use partial date representations for combined date and time values.

	For type-specific approximation, delete the entire component of the time, 
	date, or combined time-date in the following order: fractional seconds, 
	seconds, minutes, hours, day, time zone indicator (if any), and month.

	Represent durations by using two date-time values, formatted as defined 
	previously, and separated by a solidus (“/”), where each [n] represents 
	the number of years, months, dates, hours, minutes, and seconds 
	(respectively) in the duration.

	Fractional values of seconds (only) are permitted in the form of 
	nnn.fffff. Where n=0, the “0” is required. All other leading and 
	trailing zeroes, fractional hours and minutes, and truncated values 
	are prohibited. Use durations only where the actual start time is not 
	known, otherwise use a time interval must be used.

=cut

    elsif (my $datetime = str2time($data)) {
        $data = time2str("%Y-%m-%dT%T", $datetime);
    }

    # lower case all text
    elsif ($data =~ /\w+/) {
        $data = lc($data);
    }
    
    return sha256_base64( $data );
}
    
</code></pre>

The following psuedocode illustrates a solution for the above objectives
    
<pre><code class="sql">
    CREATE TABLE licenses (
        license_id SERIAL,
        license_name TEXT PRIMARY KEY,
        license TEXT
    );
    
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        preferred_license INTEGER REFERENCES licenses(license_id)
    );
        
    CREATE TABLE collections (
        collection_id SERIAL PRIMARY KEY,
        collection_name TEXT,
        entered_by INTEGER REFERENCES users(user_id),
        query_count INTEGER DEFAULT 0,
        is_active DEFAULT 1,
        modified_on TIMESTAMP
    );

    CREATE TABLE subcollections (
        subcollection_id SERIAL PRIMARY KEY,
        subcollection_name TEXT,
        parent_collection INTEGER REFERENCES collections(collection_id)
    );
            
    INSERT INTO licenses (license_name, license) VALUES 
        ('CC0', 'do whatever you want'),
        ('CC-BY', 'do anything, but give me credit'),
        ('CC-BY-NC', 'do anything except commercial use, and give me credit');
    
    INSERT INTO users (first_name, last_name, preferred_license) VALUES 
        ('p', 'k', 1),
        ('j', 'a', 2),
        ('w', 'k', 3);
        
    -- the following should error
    INSERT INTO users (first_name, last_name, preferred_license) VALUES ('s', 'p', 4);
    ERROR:  insert or update on table "users" violates foreign key constraint "users_preferred_license_fkey"
    DETAIL:  Key (preferred_license)=(4) is not present in table "licenses".
    
    INSERT INTO collections (collection_name, entered_by) VALUES 
        ('foo', 1),
        ('bar', 2),
        ('baz', 3);
    
    INSERT INTO subcollections (subcollection_name, parent_collection) VALUES 
        ('child_of_foo', 1),
        ('another_child_of_foo', 1),
        ('child_of_baz', 3),
        ('child_of_bar', 2),
        ('another_child_of_baz', 3);
</code></pre>

To return users and their preferred licenses

<pre><code class="sql">
    SELECT 
        u.first_name || u.last_name AS "name",
        l.license_name, l.license
    FROM 
        users u JOIN
        licenses l ON u.preferred_license = l.license_id;
</code></pre>

Pure SQL for returning results of an arbitrary query with license info and optional URI while UPDATEing the "query_count"

<pre><code class="sql">
    BEGIN;
    
        -- update the query count
        UPDATE collections 
        SET query_count = query_count + 1
        FROM (
            SELECT 
                c.collection_id, c.collection_name, c.entered_by,
                s.subcollection_id, s.subcollection_name,
                u.first_name || u.last_name AS "name",
                l.license_name, l.license
            FROM 
                collections c JOIN 
                subcollections s ON c.collection_id = s.parent_collection JOIN 
                users u ON c.entered_by = u.user_id JOIN 
                licenses l ON u.preferred_license = l.license_id
            WHERE 
                c.modified_on <= now() AND 
                c.collection_name LIKE 'b%'
        ) s
        WHERE collections.collection_id = s.collection_id;
        
        -- return the results
        SELECT 
            c.collection_id, c.collection_name, c.entered_by,
            s.subcollection_id, s.subcollection_name,
            u.first_name || u.last_name AS "name",
            l.license_name, l.license
        FROM 
            collections c JOIN 
            subcollections s ON c.collection_id = s.parent_collection JOIN 
            users u ON c.entered_by = u.user_id JOIN 
            licenses l ON u.preferred_license = l.license_id
        WHERE 
            c.modified_on <= now() AND 
            c.collection_name LIKE 'b%';
    COMMIT;
</code></pre>

Or, in application code

<pre><code class="perl">
    $sth_sel = $dbh->prepare( .. complicated SELECT includes "entered_by" ..);
    $sth_upd = $dbh->prepare("UPDATE collections SET qry_count = qry_count + 1 WHERE entered_by = ?");
    
    $sth_sel->execute( .. bind params ..);
    while (my $r = $sth_sel->fetchrow_hashref) {
        $sth_upd->execute( $r->{entered_by} );
    
        .. do other things with $sth_sel, perhaps build a JSON obj to return ..
    }
</code></pre>

Of course, it is up to the user to respect the license.


