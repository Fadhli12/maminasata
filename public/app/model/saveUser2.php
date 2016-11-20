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
$id_user = $request->id_user;
$nama = $request->nama;
$username = $request->username;
$password = $request->password;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "UPDATE user SET nama = '$nama', password = '$password', username = '$username' WHERE id_user = '$id_user'";
$result = $mysqli->query($sql_query);

