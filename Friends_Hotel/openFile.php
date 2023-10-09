<?php
header("Content-Type: application/json");
# Introducing an empty array for storing each rate (from the text file)
$rooms = array();
# Reading the text file
$suitsRates = fopen("suitsRates.txt","r");
# Looping through the text file
while (!feof($suitsRates)) {
    # Pushing each line into the empty array
    array_push ($rooms, fgets($suitsRates));
}
# Encoding the array (which is in json format)
echo json_encode($rooms);
?>