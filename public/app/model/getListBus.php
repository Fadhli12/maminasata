<?php
/**
 * Created by PhpStorm.
 * User: Genesis
 * Date: 21/04/2016
 * Time: 13:30
 *
 * mengambil daftar data bus
 */
include "connection.php";

$db = Database::getInstance();
$mysqli = $db->getConnection();

$sql_query = "SELECT b.*, b.nama AS nama_bus, b.status AS status_bus, k.*, ub.*, ub.nama AS nama_user FROM bus AS b, koridor AS k, user_bus AS ub WHERE b.id_koridor = k.id_koridor AND b.id_user = ub.id";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
    while ($row = mysqli_fetch_array($result)){
        $data[] = $row;
    }
    echo ")]}',\n";
    echo json_encode($data);
}
