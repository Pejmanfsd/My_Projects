<!DOCTYPE html>
<?php
include 'db.php';
?>
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
                <table class="table table-hover">
                    <!-- Declairing that the next page is "availableSuits.php" -->
                    <center><form action = "availableSuits.php" method="get">
                        <h3>Enter your personal information:</h3><br>
                            <!-- Receiving The user's personal information -->
                        <div class="form-group">
                            <h5>First name:</h5> <input type = "text" id = "newFirstName" name = "newFirstName">
                            <br>
                        </div>
                        <div class="form-group">
                            <h5>Last name:</h5> <input type = "text" id = "newLastName" name = "newLastName"> <br>
                        </div>
                        <div class="form-group">
                            <h5>Email:</h5> <input type = "text" id = "newEmail"> <br>
                        </div>
                        <div class="form-group">
                            <h5>Phone number:</h5> <input type = "number" id = "newPhoneNumber"> <br>
                        </div>
                        <div class="form-group">
                            <h5>Check-in date:</h5> <input type = "text" id = "newCheckInDate" name =  "newCheckInDate"> <br>
                        </div>
                        <div class="form-group">
                            <h5>Check-out date:</h5> <input type = "text" id = "newCheckOutDate" name =  "newCheckOutDate"> <br>
                        </div>
                        <!-- Submitting The user's personal information -->
                        <input type="submit" name="send" onclick="isValid()" value="Done" id="fetchButton" class="btn btn-success">
                    </form></center><br><br>
                </table>
    </body>
    <script>
        // All the validations
        function isValid() {
            // Retrieving the information entered by the user for each part
            newFirstName = document.getElementById("newFirstName").value;
            newLastName = document.getElementById("newLastName").value;
            newEmail = document.getElementById("newEmail").value;
            newPhoneNumber = document.getElementById("newPhoneNumber").value;
            newCheckInDate = document.getElementById("newCheckInDate").value;
            newCheckOutDate = document.getElementById("newCheckOutDate").value;
            // Validation of the FirstName part
            if (newFirstName.length < 2) {
                event.preventDefault();
                alert("Your first name should have at least 2 letters");
            }
            // Validation of the LastName part
            if (newLastName.length < 2) {
                event.preventDefault();
                alert("Your last name should have at least 2 letters");
            }
            // Validation of the Email part
            if (!newEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                event.preventDefault();
                alert("Invalid email");
            }
            // Validation of the Phone number part
            if (newPhoneNumber.length !== 10) {
                event.preventDefault();
                alert("Your phone number should have 10 digits");
            }
            // Validation of the Check-in Date part
            if (!newCheckInDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                event.preventDefault();
                alert('Your check-in date should be in " ****_**_** " format');
            }
            // Validation of the Check-out Date part
            if (!newCheckOutDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                event.preventDefault();
                alert('Your check-out date should be in " ****_**_** " format');
            }
            // Validation: Check-in Date can't be after the Check-out Date
            if (parseInt(newCheckInDate.replaceAll("-","")) >= parseInt(newCheckOutDate.replaceAll("-",""))) {
                event.preventDefault();
                alert("Check-in date should be before check-out date");
            }
            // The rating of the suits can't be greater than 10 or less than 0
            newMinimumRate = document.getElementById("minimumRate").value;
            if (newMinimumRate < 0 || newMinimumRate > 10) {
                event.preventDefault();
                alert("The rate should be between 0 and 10");
            }
        }
    </script>
</html>