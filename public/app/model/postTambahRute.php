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

$latitude = $request->latitude;
$longitude = $request->longitude;
$nama = $request->nama;
$id_koridor = $request->id_koridor;

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);

$sql_query = "INSERT INTO rute SET latitude = '$latitude' , longitude = '$longitude', nama = '$nama' , id_koridor = '$id_koridor'";
$result = $mysqli->query($sql_query);
