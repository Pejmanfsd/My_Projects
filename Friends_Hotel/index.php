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
        <center><h2>The best hotel in Montreal</h2></center>
        <!-- Retrieving the weather condition of the city, using the appropriate API -->
        <center><?php
            $apiKey = 'fb48d3ced1ec2bb1f69946dfa7aaea1f';
            $cityName = 'Montreal';
            $url = 'https://api.openweathermap.org/data/2.5/weather?q=' . $cityName . '&appid=' . $apiKey;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $result = curl_exec($ch);
            curl_close($ch);
            $response = json_decode($result, true);
            if ($response['cod'] != 200) {
                echo 'ERROR API returned status code' . $response['cod'] . '<br>';
                echo 'Message: ' . $response['message'] . '<br>';
            }
            echo 'Weather in: ' . $cityName . '<br>';
            $temp = $response['main']['temp'] - 273.15;
            echo 'Temperature: ' . $temp . '<br>';
            echo 'Description: ' . $response['weather'][0]['description'] . '<br>';
            ?>
        </center>
        <center>
            <!-- Observing the rooms whose rates are more than the rate the user enters -->
            <h3>I want to see the rooms with minimum rate of:</h3><br>
            <input type = "number" id = "minRate"><br><br>
            <button id="fetchButton" class="btn btn-success"><h5>Show</h5></button><br>
            <dl id="roomlist"></dl>
        </center>
        <script>
            // Assigning the process of the "Show" button
            document.getElementById("fetchButton").addEventListener("click", fetchRooms);
            function fetchRooms() {
                // Retrieving the number the user has entered
                minRate = parseFloat(document.getElementById("minRate").value);
                // Validation: The rating that the user enters should be between 0 and 10
                if (minRate < 0 || minRate > 10) {
                    alert("The rate should be between 0 and 10");
                }
                // Retrieving the content of the text file that has been loaded in the "openFile.php" file
                fetch ("openFile.php")
                    // Parse the JSON from the response
                    .then(response => response.json())
                    .then(data => displayRooms(data))
                    .catch (error => console.error("ERROR: ", error));
            }
            // Printing ratings of each room
            function displayRooms(rooms) {
                const roomList = document.getElementById("roomlist");
                const minRate = parseFloat(document.getElementById("minRate").value);
                roomList.innerHTML = "";
                rooms.forEach(room => {
                    if (parseFloat(room.substring(18,22)) >= minRate) {
                        const li = document.createElement("li");
                        li.textContent = `${room}`;
                        roomList.appendChild(li);
                    }
                    
                });
            }
        </script>
        <!-- The button that leads the user to the next page -->
        <center><button id="personalInfoPage" class="btn btn-success"><h5>Go to personal information page</h5></button></center>
    </body>
    <script>
        // Event-handling the mentioned button
        var btn = document.getElementById('personalInfoPage');
        btn.addEventListener('click', function() {
            document.location.href = 'personalInfo.php';
        });
    </script>
</html>