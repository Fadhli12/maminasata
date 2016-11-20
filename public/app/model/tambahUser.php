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
echo json_encode($request);
$nama = $request->nama;
$username = $request->username;
$password = $request->password;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "INSERT INTO user SET nama = '$nama', username = '$username', password = '$password'";
$result = $mysqli->query($sql_query);

