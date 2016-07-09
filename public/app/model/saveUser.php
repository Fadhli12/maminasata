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
$id = $request->id;
$nama = $request->nama;
$no_telp = $request->no_telp;
$password = $request->password;
$status = $request->status;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "UPDATE user_bus SET nama = '$nama', password = '$password',no_telp = '$no_telp', status = '$status' WHERE id = '$id'";
$result = $mysqli->query($sql_query);

