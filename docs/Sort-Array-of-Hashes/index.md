---
title      : Sort Array of Hashes
description: 
modified   : 2006-07-08
created    : 
viewcount  : 68
id         : 393
gmap       : 
tags        :
    - code
stars      : 
tmpl       : 2_cols
ui			: 
---

<pre class="brush: Perl">
  >  input file 

  >  
  >  something1	something2	something3	price		something4
  >  text1		text2		text3		100		text4
  >  text1		text2		text3		50		text4
  >  text1		text2		text3		200		text4
  >  text1		text2		text3		25		text4
  >  text1		text2		text3		75		text4
  >  text1		text2		text3		300		text4
  >  

  >  desired output
  >  
  >  something1	something2	something3	price		something4
  >  text1		text2		text3		25		text4
  >  text1		text2		text3		50		text4
  >  text1		text2		text3		75		text4
  >  text1		text2		text3		100		text4
  >  text1		text2		text3		200		text4
  >  text1		text2		text3		300		text4
  >  

  >  so rather than my data structure looking like below..
  >  $listings[0]->{price} = 100
  >  $listings[1]->{price} = 50
  >  $listings[2]->{price} = 200
  >  $listings[3]->{price} = 25......
  >  

  >  I am trying trying to change it to look like ...
  >  

  >  $listings[0]->{price} = 25
  >  $listings[1]->{price} = 50
  >  $listings[2]->{price} = 75
  >  $listings[3]->{price} = 100......
  >  
  >  I hope I explained this so it makes sense.

   use strict;
   my $file = "somefile.txt";

   # get the data into @data
   open FILE, $file || die "can't open $file";
   my @data = <FILE> ;
   close FILE;
   
   chomp @data;

   # get the categories from line one
   my @category = split / *\t+ */, shift @data;

   # create an array of hashes for who knows what
   my @listings;
   for (my $ii = 0; $ii < @data; $ii++) {
     my @listing = split / *\t+ */, $data[$ii];
     next if @listing ne @category;	# make sure # flds right
     for (my $jj = 0; $jj < @category; $jj++){
       my $key = $category[$jj];
       my $value = $listing[$jj];
       $listings[$ii]-> {$key} = $value;
     }
   }

   # sort the data on Price field (4th col)

   # this one ignores the @listings array and just does it on the raw @data
   print "\nMethod 1:\n";
   my @slistings = map { $_-> [0] } sort { $a->[4] <=> $b->[4] } map {[$_, split / *\t+ */ ]} @data;
   print "$_\n" foreach @slistings;

   # this one sorts the array of hashes created above
   print "\nMethod 2:\n";
   @slistings = sort { $a-> {Price} <=> $b->{Price} } @listings;

   # print sorted array (columns not sorted back to orig order)
   for (my $ii = 0; $ii < @slistings; $ii++) {
     foreach (keys %{$slistings[$ii]}) {
       print "$slistings[$ii]-> {$_}\t";
     }
     print "\n";
   }
   __END__
</pre>


