<?php
$link = mysql_connect("192.168.23.23", "maminasata", "maminasata123") or die('Cannot connect to the DB');
mysql_select_db('maminasata', $link) or die('Cannot select the DB');

//// receiving the post params
$id_bus = $_POST['id_bus'];
$speed = $_POST['speed'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$status = $_POST['status'];
$tujuan = $_POST['tujuan'];

$query = mysql_query("SELECT * FROM perjalanan WHERE id_bus = '$id_bus' LIMIT 1");
if (mysql_num_rows($query) == 0){
    $query_insert = "INSERT INTO perjalanan SET id_bus = '$id_bus', kecepatan = '$speed', latitude = '$latitude', longitude = '$longitude' , tujuan = '$tujuan' , status = '$status'";
    if (mysql_query($query_insert)){
        echo "berhasil menambah perjalanan";
    }
} else {
    $query_update = "UPDATE perjalanan SET kecepatan = '$speed', latitude = '$latitude', longitude = '$longitude', status = '$status', tujuan = '$tujuan' WHERE id_bus = '$id_bus'";
    if (mysql_query($query_update)){
        echo "berhasil mengaupdate perjalanan";
    }
}
?>