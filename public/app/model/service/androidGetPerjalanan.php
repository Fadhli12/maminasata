<?php
include 'dbConnect.php';

//// receiving the post params
$id_user = $_POST['id_user'];
$speed = $_POST['speed'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$status = $_POST['status'];
$tujuan = '';

$query_bus = mysql_query("SELECT * FROM bus WHERE id_user = '$id_user'");
$data_bus = mysql_fetch_array($query_bus);

$id_bus = $data_bus['id_bus'];

$query = mysql_query("SELECT * FROM perjalanan WHERE id_bus = '$id_bus' LIMIT 1");
if (mysql_num_rows($query) == 0){
    $query_insert = "INSERT INTO perjalanan SET id_bus = '$id_bus', kecepatan = '$speed', latitude = '$latitude', longitude = '$longitude' , tujuan = '$tujuan' , status = '$status'";
    if (mysql_query($query_insert)){
        echo "berhasil menambah perjalanan";
    } else {
        echo "error menambah data";
    }
} else {
    $query_update = "UPDATE perjalanan SET kecepatan = '$speed', latitude = '$latitude', longitude = '$longitude', status = '$status', tujuan = '$tujuan' WHERE id_bus = '$id_bus'";
    if (mysql_query($query_update)){
        echo "berhasil mengaupdate perjalanan";
    } else {
        echo "error update data";
    }
}
?>
