<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menyimpan bus
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_bus = $request->id_bus;
$id_koridor = $request->id_koridor;
$nama_bus = $request->nama_bus;
$status = $request->status_bus;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "UPDATE bus SET nama = '$nama_bus', status = '$status', id_koridor = '$id_koridor' WHERE id_bus = '$id_bus'";
$result = $mysqli->query($sql_query);

