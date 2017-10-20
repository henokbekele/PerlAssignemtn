#!C:\Perl64\bin\perl.exe

use DBI;
use CGI qw(:standard -debug);

use warnings;
use CGI;
use strict;
my $cgi = new CGI;

 #To create connection to appointmentDb 
  my $dbh =DBI->connect("dbi:SQLite:appointmentDb.db") || die "can not";

# to get values from submited form
  my $dateAppointment=param("dateAppointment"); 
  my $timeAppointment=param("timeAppointment"); 
  my $descAppointment=param("descAppointment"); 
 
   
#To create apptTable table if it doesn't exist
  $dbh->do("create table apptTable(id INTEGER PRIMARY KEY,dateAppointment DATE, timeAppointment TIME, descAppointment TEXT)");
 
 #To insert record in to apptTable table
  $dbh->do("insert into apptTable(dateAppointment,timeAppointment, descAppointment ) values(?,?,?)",
		 undef,$dateAppointment, $timeAppointment, $descAppointment);

  $dbh->disconnect(); 
 
 print ("Location: http://localhost/happointment/\n");    
 print ("Content-type: text/html\n\n");
