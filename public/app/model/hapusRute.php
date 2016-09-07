<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menghapus rute berdasarkan id nya
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

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "DELETE FROM rute WHERE id_jalan = '$id_jalan'";
$result = $mysqli->query($sql_query);

