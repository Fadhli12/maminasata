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
/*$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$ktp = $request->id_akun;*/

$db = Database::getInstance();
$mysqli = $db->getConnection();

error_reporting(0);
$sql_query = "SELECT DISTINCT k.* FROM koridor AS k, halte As h WHERE k.id_koridor = h.id_koridor";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		$data[] = $row;
	}
	echo ")]}',\n";
	echo json_encode($data);
}
