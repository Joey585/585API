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
    ?>
</body>
</html>