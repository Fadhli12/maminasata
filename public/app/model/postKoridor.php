<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * menyimpan data koridor
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$nama_koridor = $request->nama_koridor;
$rute = $request->rute;
$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query1 = "INSERT INTO koridor SET nama_koridor = '$nama_koridor'";
$result1 = $mysqli->query($sql_query1);
if ($result1){
	$sql_query2 = "SELECT id_koridor FROM koridor ORDER BY id_koridor DESC LIMIT 1";
	$result2 = $mysqli->query($sql_query2);
	while ($row1 = mysqli_fetch_array($result2)){
		$id_koridor = $row1['id_koridor'];
	}
	$x = 0;
	foreach ($rute AS $r){
		if ($x == 0){
			$status = 'awal';
		} else if ($x == count($rute)-1){
			$status = 'akhir';
		} else {
			$status = 'tengah';
		}
		$sql_query3 = "INSERT INTO rute SET nama = '$r->lokasi', latitude = '$r->latitude', longitude = '$rute->longitude', status = '$status', id_koridor = '$id_koridor'";
		$result3 = $mysqli->query($sql_query3);
		$x++;
	}
}

