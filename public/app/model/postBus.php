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
$no_telp = $request->no_telp;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "INSERT INTO user_bus SET nama = '$username', username = '$username', password = '$password', no_telp = '$no_telp', status = 'false'";
$result = $mysqli->query($sql_query);

if ($result){
    $query_last_id = $mysqli->query("SELECT id FROM user_bus ORDER BY id DESC LIMIT 1");
    while ($row = mysqli_fetch_array($query_last_id)){
        $last_id = $row['id'];
    }

    $sql_query2 = "INSERT INTO bus SET id_koridor = '$id_koridor', nama = '$nama', plat = '$plat', id_user = '$last_id', status = '1'";
    $result2 = $mysqli->query($sql_query2);

}
