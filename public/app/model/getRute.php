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
$koridor = $request->koridor;

$db = Database::getInstance();
$mysqli = $db->getConnection();

//error_reporting(0);
$sql_query = "SELECT * FROM rute WHERE id_koridor = '$koridor' LIMIT 8";
$sql_query_starend = "SELECT * FROM rute WHERE id_koridor = '$koridor' AND status != 'tengah'";
$result = $mysqli->query($sql_query);
$result2 = $mysqli->query($sql_query_starend);
if (mysqli_num_rows($result2)>0) {
	$x = 0;
	while ($row2 = mysqli_fetch_array($result2)){
		if ($x == 0){
			$start = $row2['latitude'].", ".$row2['longitude'];
		} else {
			$end = $row2['latitude'].", ".$row2['longitude'];
		}
		$x++;
	}
}

if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		if ($row['status'] == 'tengah'){
			$rute['location'] = $row['latitude'].", ".$row['longitude'];

			$data['direction'][] = $rute;
		}
		$data['start'] = $start;
		$data['end'] = $end;
	}
}

$sql_query_halte = "SELECT * FROM halte WHERE id_koridor = '$koridor'";
$result_halte = $mysqli->query($sql_query_halte);
if (mysqli_num_rows($result_halte)>0){
	while ($row = mysqli_fetch_array($result_halte)){
		$data['halte'][] = $row;
	}
}
echo ")]}',\n";
echo json_encode($data);

