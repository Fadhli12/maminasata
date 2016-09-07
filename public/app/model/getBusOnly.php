<?php
/**
 * Created by PhpStorm.
 * User: Genesis
 * Date: 21/04/2016
 * Time: 13:30
 *
 * Mengambil data bus menurut koridornya
 */
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_koridor = $request->id_koridor;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "SELECT * FROM bus WHERE id_koridor = '$id_koridor'";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
    while ($row = mysqli_fetch_array($result)){
        $data[] = $row;
    }
    echo ")]}',\n";
    echo json_encode($data);
}
