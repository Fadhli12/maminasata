<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_koridor = $request->id_koridor;

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);
$sql_query = "SELECT p.*, p.status AS status_perjalan, b.* FROM perjalanan AS p , bus AS b WHERE p.id_bus = b.id_bus AND b.id_koridor = '$id_koridor' LIMIT 1";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result) > 0){
    while ($row = mysqli_fetch_array($result)){
        $data = $row;
    }
}
echo json_encode($data);
