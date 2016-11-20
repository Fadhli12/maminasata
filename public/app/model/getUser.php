<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menyimpan data user
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "SELECT * FROM user";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
    while ($row = mysqli_fetch_array($result)){
        $data['user'][] = $row;
    }
}
echo json_encode($data);

