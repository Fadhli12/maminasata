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
$sql_query = "SELECT * FROM halte LIMIT 8";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		$rute['location'] = $row['latitude'].", ".$row['longitude'];
		$data['direction'][] = $rute;
		$data['halte'][] = $row;
	}
	echo ")]}',\n";
	echo json_encode($data);
}
