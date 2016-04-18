<?php
$link = mysql_connect("103.55.216.27", "syahbudin_ridwan", "rRyfgkH50b") or die('Cannot connect to the DB');
mysql_select_db('syahbudin_ridwan', $link) or die('Cannot select the DB');

//// receiving the post params
$id = $_POST['id'];


$query = mysql_query("SELECT * FROM user_bus WHERE id = '$id' AND status = 'true' LIMIT 1");
if (mysql_num_rows($query)>0){
    $row = mysql_fetch_array($query);

    $response['status_login']='0';
    $response['message']='Berhasil Melakukan Log out';
    $query = mysql_query("UPDATE user_bus SET status = 'false' WHERE id = '$row[id]'");
} else {
    $response['message']='Gagal Melakukan Log out !!';
}
echo json_encode($response);
?>