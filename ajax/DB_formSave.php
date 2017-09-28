<?php 

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);


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
echo "Connected successfully\n";

/*echo "Name : ".$data->name."\n";
echo "P : ".$data->province."\n";
echo "T : ".$data->telephone."\n";
echo "P : ".$data->postalcode."\n";
echo "S : ".$data->salary."\n";
echo "I : ".$data->pid."\n";
*/

$sql = "INSERT INTO USERS (name, province_id, telephone, postalcode, salary)
VALUES ('$data->name', $data->pid, '$data->telephone', '$data->postalcode', $data->salary)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();

?>