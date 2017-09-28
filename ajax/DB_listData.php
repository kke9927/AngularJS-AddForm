<?php

$servername = "mysql-instance1.cquppg6purlz.us-east-1.rds.amazonaws.com:3306";
$username = "admin";
$password = "admin1234";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// check connection
if($conn->connect_error){
    die("Connection failed:".$conn->connect_error);
}
//echo "Connected successfully\n";

$result = $conn->query("SELECT USERS.name, PROVINCES.name as province, USERS.telephone, USERS.postalcode, USERS.salary 
                        from USERS
                        INNER JOIN PROVINCES on USERS.province_id = PROVINCES.id;");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {

    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["name"] . '",';
    $outp .= '"Province":"'   . $rs["province"]        . '",';
    $outp .= '"Telephone":"'   . $rs["telephone"]        . '",';
    $outp .= '"PostalCode":"'   . $rs["postalcode"]        . '",';
    $outp .= '"Salary":"'. $rs["salary"]     . '"}';
}
$outp ='['.$outp.']';
$conn->close();

echo ($outp);

?>