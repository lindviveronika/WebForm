<?php
    require "connect.php";
    mysqli_set_charset($connect,"utf8");
    $result = mysqli_query($connect, "SELECT * FROM User ORDER BY name ASC");
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($data);

    mysqli_free_result($result);
    mysqli_close($connect);
?>
