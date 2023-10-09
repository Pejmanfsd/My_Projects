<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "friendsHotel";

#Create connection:
$db = new mysqli($servername, $username, $password, $database);

#Check connection:
if ($db->connect_error) {
    die("connection failed: " . $conn->connect_error);
}
?>