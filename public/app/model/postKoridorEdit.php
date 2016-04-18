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
$id_jalan = $request->id_jalan;
$latitude = $request->latitude;
$longitude = $request->longitude;
$nama = $request->nama;

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);

$sql_query = "UPDATE rute SET latitude = '$latitude', longitude = '$longitude', nama= '$nama' WHERE id_jalan = '$id_jalan'";
$result = $mysqli->query($sql_query);
