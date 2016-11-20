<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menghapus koridor berdasarkan id nya
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;

$db = Database::getInstance();
$mysqli = $db->getConnection();

echo $sql_query = "DELETE FROM koridor WHERE id_koridor = '$id'";
$result = $mysqli->query($sql_query);

