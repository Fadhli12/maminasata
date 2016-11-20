<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menyimpan data halte
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$halte = $request->halte;
$id_koridor = $request->id_koridor;
$db = Database::getInstance();
$mysqli = $db->getConnection();

foreach ($halte AS $h){
	$sql_query = "INSERT INTO halte SET id_koridor = '$id_koridor', latitude = '$h->latitude', longitude = '$h->longitude', nama = '$h->lokasi'";
	$result = $mysqli->query($sql_query);
}
