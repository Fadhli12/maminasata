<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * mengambil daftar koridor
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

$sql_query = "SELECT DISTINCT * FROM koridor";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		$data[] = $row;
	}
	echo ")]}',\n";
	echo json_encode($data);
}

