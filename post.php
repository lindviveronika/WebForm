<?php
    require "connect.php";

    $name = $_POST['name'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    $sex = $_POST['sex'];

    if(mysqli_query($connect,"INSERT INTO User VALUES('$name','$email','$age','$sex')"))
        echo "Your input has been saved.";
    else
        echo "Your input was not saved. Make sure that you have used an email address that is not already in the list";

    mysqli_close($connect);
?>
                                                                                                                            