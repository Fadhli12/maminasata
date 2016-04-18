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
$nama = $request->nama;
$plat = $request->plat;
$username = $request->username;
$password = $request->password;

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);
$sql_query = "INSERT INTO bus SET id_koridor = '$id_koridor', nama = '$nama', plat = '$plat', status = '0'";
$result = $mysqli->query($sql_query);

if ($result){
    $query_last_id = $mysqli->query("SELECT id_bus FROM bus ORDER BY id_bus DESC LIMIT 1");
    while ($row = mysqli_fetch_array($query_last_id)){
        $last_id = $row['id_bus'];
    }

    $sql_query2 = "INSERT INTO user_bus SET id_bus = '$last_id', nama = '$username', username = '$username', password = '$password', status = 'false'";
    $result2 = $mysqli->query($sql_query2);

}
