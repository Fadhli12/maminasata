<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menyimpan data halte setelah di edit
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_halte = $request->id_halte;
$latitude = $request->latitude;
$longitude = $request->longitude;
$nama = $request->nama;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "UPDATE halte SET latitude = '$latitude', longitude = '$longitude', nama= '$nama' WHERE id_halte = '$id_halte'";
$result = $mysqli->query($sql_query);
