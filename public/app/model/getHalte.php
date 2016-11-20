<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * Mengambil lokasi dan detail halte menurut koridornya
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

$sql_query = "SELECT * FROM halte WHERE id_koridor = '$id_koridor'";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		$data[] = $row;
	}
	echo ")]}',\n";
	echo json_encode($data);
}

