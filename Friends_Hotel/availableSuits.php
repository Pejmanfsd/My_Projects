<!DOCTYPE html>
<html>
    <head>
        <!-- Assigning appropriate technologies -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/main.css">
        <title>Friends Hotel</title>
    </head>
    <body>
        <header class="container-fluid navbar">
            <!-- Logo -->
            <div class="container"><br>
            <center><img src="FriendsHotel.png" width="50" height="50" alt="Hotel_logo"></center>
            <!-- Title of the Page -->
            <center><h1>Friends Hotel</h1></center>
        </header>
            <!-- Presenting the available suits for the user -->
        <center><h3>The available suits for you are:</h3></center>
        <!-- Declairing that the next page is "add.php" -->
        <center><form action = "add.php" method="post">
        <?php
            session_start();
            // Communicating with the database
            include 'db.php';
            // Retrieving The input information from the user
            $newCheckInDate = $_GET["newCheckInDate"];
            $newCheckOutDate = $_GET["newCheckOutDate"];
            // Introducing the sql query that validates if the selected suit is reserved or not
            $sql = "select * from SuitsInfo where `Suit Number` not in (select distinct `Suit Number` from Reservation where (`Check-in Date` BETWEEN '" . $newCheckInDate . "' and '" . $newCheckOutDate . "') OR (`Check-out Date` BETWEEN '" . $newCheckInDate . "' and '" . $newCheckOutDate . "'))";
            // The data that is separated from the database, using the "$sql" query
            $rows = $db -> query($sql);
            // Breaking the separated data into its rows
            $row = $rows -> fetch_assoc();
            // Introducing an empty array in order to restore the separated rows
            $rowArray = array();
            // Looping through the separated data
            foreach($rows as $row) {
                // Appending each row into the array
                array_push($rowArray, (int)$row['Suit Number']);
            }
            $_SESSION['rowArray'] = $rowArray;
            // Printing the free suits with their information
            foreach($rows as $row) {
                echo 'Suit Number: ' . $row['Suit Number'] .
                ' ........ Floor: ' . $row['Floor'] .
                ' ........ Price per Day: ' . $row['Price per Day'] . "<br>";
            }
            // Preparing all the necessary information for the "add.php" file
            $newFirstName = $_GET["newFirstName"];
            $newLastName = $_GET["newLastName"];
            $_SESSION['newFirstName'] = $newFirstName;
            $_SESSION['newLastName'] = $newLastName;
            $_SESSION['newCheckInDate'] = $newCheckInDate;
            $_SESSION['newCheckOutDate'] = $newCheckOutDate;
        ?>
        </center>
        <center>
        <!-- Booking the suit by the user -->
        <form method="post"><h3>Let's Book!</h3>
            <div class="form-group">
                <label><h5>Enter your chosen suit number:</h5></label><br>
                    <input type = "number" id = "newSuitNumber" name="newSuitNumber"><br>
            </div><br>
            <!-- Submitting the reservation -->
            <input type="submit" name="reservation" value="Book" class="btn btn-success">
        </form>
        </center>
    </body>
</html>