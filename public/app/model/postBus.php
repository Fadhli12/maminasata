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

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);
$sql_query = "INSERT INTO bus SET id_koridor = '$id_koridor', nama = '$nama', plat = '$plat', status = ''";
$result = $mysqli->query($sql_query);
