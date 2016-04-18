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

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);
$sql_query_koridor = "SELECT * FROM koridor WHERE id_koridor = '$id_koridor'";
$result = $mysqli->query($sql_query_koridor);
if (mysqli_num_rows($result)>0) {
	while ($row = mysqli_fetch_array($result)) {
		$data['koridor'] = $row;
	}
}
$sql_query_rute = "SELECT * FROM rute WHERE id_koridor = '$id_koridor'";
$result_rute = $mysqli->query($sql_query_rute);
if (mysqli_num_rows($result_rute)>0){
	while ($row_rute = mysqli_fetch_array($result_rute)){
		$data['rute'][] = $row_rute;
	}
	echo ")]}',\n";
	echo json_encode($data);
}

