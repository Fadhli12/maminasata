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
$nama_koridor = $request->nama_koridor;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "UPDATE koridor SET nama_koridor = '$nama_koridor' WHERE id_koridor = '$id_koridor'";
$result = $mysqli->query($sql_query);
