<?php
    session_start();
    // Retrieving all the necessary information for adding data to the database
    $newSuitNumber = htmlspecialchars($_POST["newSuitNumber"]);
    $newFirstName = $_SESSION['newFirstName'];
    $newLastName = $_SESSION['newLastName'];
    $newCheckInDate = $_SESSION['newCheckInDate'];
    $newCheckOutDate = $_SESSION['newCheckOutDate'];
    // Introducing the database
    include 'db.php';
    if (isset($_POST['reservation'])) {
        $newSuitNumber = htmlspecialchars($_POST["newSuitNumber"]);
        $newFirstName = $_SESSION['newFirstName'];
        $newLastName = $_SESSION['newLastName'];
        $newCheckInDate = $_SESSION['newCheckInDate'];
        $newCheckOutDate = $_SESSION['newCheckOutDate'];
        // If the entered suit number is in the list of free suits ...
        if (in_array($newSuitNumber, $_SESSION['rowArray'])) {
            // The inserting sql query
            $sql = "insert into reservation (`Suit Number`, `First name`, `Last name`, `Check-in Date`, `Check-out Date`) values
            (" . $newSuitNumber . ", '" . $newFirstName . "', '" . $newLastName . "', '" . $newCheckInDate . "', '" . $newCheckOutDate . "')";
            // Saving the answer of the query in a new variable
            $val = $db -> query($sql);
        if ($val) {
            echo "<script type='text/javascript'>alert('Successfully inserted');</script>";
            echo ("<script>window.location = 'index.php';</script>");
        } else {
            echo "<script type='text/javascript'>alert('ERROR');</script>";
        }
        }
        // If the entered suit number is not in the list of free suits ...
        else {
            echo "<script type='text/javascript'>alert('Please choose your suit number from the list');history.back();</script>";
            
        }
    }
?>