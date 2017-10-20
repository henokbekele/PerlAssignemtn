#!C:\Perl64\bin\perl.exe

use DBI;
use CGI qw(:standard);
use JSON::XS;
use utf8;
use Encode;
print header('application/json');
use JSON -support_by_pp;


 
 #To create connection to appointmentDb 
my $dbh =DBI->connect("dbi:SQLite:appointmentDb.db") || die "can not";

# quary to retrive appointments that match with the user query
my $sql  = 'SELECT * FROM apptTable where descAppointment LIKE ?';

# get the search value param from the ajax call
my $searchQV =param("searchQV");

#To prepare the query statment
my $sth = $dbh->prepare($sql);

#To execute the prepared statment
$sth->execute("$searchQV%");


#to put the result in array of object
my $appointments=[];
while (my ( $id, $dateAppointment, $timeAppointment, $descrAppointment) = $sth->fetchrow_array) {
push @{$appointments},{'appointmentDate'=>$dateAppointment,'appointmentTime'=>$timeAppointment,'appointmentDescription'=>$descrAppointment};  
    
}

#to convert the appointment into json
my $jsonObject = to_json( $appointments, { utf8 => 1, pretty => 1 } );  
print "$jsonObject";



