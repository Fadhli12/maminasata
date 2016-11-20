<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menyimpan halte
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$latitude = $request->latitude;
$longitude = $request->longitude;
$nama = $request->nama;
$id_koridor = $request->id_koridor;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "INSERT INTO halte SET latitude = '$latitude' , longitude = '$longitude', nama = '$nama' , id_koridor = '$id_koridor'";
$result = $mysqli->query($sql_query);
