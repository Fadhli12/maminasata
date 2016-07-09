<?php
include 'dbConnect.php';

$id_koridor = $_GET['id_koridor'];

if (empty($id_koridor)){
    $response['required'] = 'id_koridor tidak boleh kosong';
}
//// receiving the post params
$query_bus = mysql_query("SELECT * FROM bus WHERE id_koridor = '$id_koridor'");

if (mysql_num_rows($query_bus) != 0){
    $x = 0;
    while($row = mysql_fetch_array($query_bus)){
        $data[] = $row;
    }
    $response['status'] = 'berhasil';
    $response['data'] = $data;
} else {
    $response['status'] = 'gagal';
    $response['message'] = 'data tidak ditemukan';
}

echo json_encode($response);

?>
