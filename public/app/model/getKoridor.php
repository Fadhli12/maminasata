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

$sql_query = "SELECT DISTINCT * FROM koridor";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
	while ($row = mysqli_fetch_array($result)){
		$query_rute = "SELECT * FROM rute WHERE id_koridor = '$row[id_koridor]'";
		$result2 = $mysqli->query($query_rute);
		if (mysqli_num_rows($result2)>0){
			while ($rute = mysqli_fetch_array($result2)){
				$row['rute'][] = $rute['nama'];
			}
		}

		$query_halte = "SELECT * FROM halte WHERE id_koridor = '$row[id_koridor]'";
		$result3 = $mysqli->query($query_halte);
		if (mysqli_num_rows($result3)>0){
			while ($halte = mysqli_fetch_array($result3)){
				$row['halte'][] = $halte['nama'];
			}
		}
		$data[] = $row;
	}
	echo ")]}',\n";
	echo json_encode($data);
}

