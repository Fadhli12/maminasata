<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menghapus data halte berdasarkan id nya
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

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "DELETE FROM halte WHERE id_halte = '$id_halte'";
$result = $mysqli->query($sql_query);

