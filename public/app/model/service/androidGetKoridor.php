<?php
include 'dbConnect.php';

//// receiving the post params
$query_koridor = mysql_query("SELECT * FROM koridor");

if (mysql_num_rows($query_koridor) != 0){
    while($row = mysql_fetch_array($query_koridor)){
        $koridor[] = $row;
    }
    $response['status'] = 'berhasil';
    $response['data'] = $koridor;
} else {
    $response['status'] = 'gagal';
    $response['message'] = 'tidak ada data di temukan';
}
echo json_encode($response);
?>