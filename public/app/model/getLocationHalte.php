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
$id_halte = $request->id_halte;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "SELECT latitude, longitude FROM halte WHERE id_halte = '$id_halte'";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		$data = $row;
	}
	echo ")]}',\n";
	echo json_encode($data);
}

