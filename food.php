<html lang="en">
<head>
    <title>Food Submitted</title>
</head>
<body>
    <?php
        $file_name = $_FILES["file"]["name"];
        $file_temp_location = $_FILES["file"]["tmp_name"];
        if(!$file_temp_location){
            echo "ERROR: No file selected";
            exit();
        }

        if(move_uploaded_file($file_temp_location, "food-pics/$file_name")){
            echo "Thank you for uploading your beautiful food picture!";
        } else {
            echo "Error!";
        }


        try {
            $conn = new mysqli("localhost:3306", "root", "", "585API");
            $title = $_POST["title"];
            $tags = str_replace(" ", ",", $_POST["tags"]);
            $location = "food-pics/$file_name";
            $views = 0;
            $ID = random_int(100000, 999999);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $query = "INSERT INTO FoodPics (title, tags, location, views, id) VALUES (?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query) or die(mysqli_error($conn));
            $stmt->bind_param("sssss", $title, $tags, $location, $views, $ID);
            $stmt->execute();
            $stmt->close();

        } catch (Exception $exception){
            echo $exception;
        }
    ?>
</body>
</html>