<?php
$link = mysql_connect("103.55.216.27", "syahbudin_ridwan", "rRyfgkH50b") or die('Cannot connect to the DB');
mysql_select_db('syahbudin_ridwan', $link) or die('Cannot select the DB');

//// receiving the post params
$username = $_POST['username'];
$password = $_POST['password'];

$query = mysql_query("SELECT * FROM user_bus WHERE username = '$username' AND password = '$password' AND status = 'false' LIMIT 1");
if (mysql_num_rows($query)>0){
    $row = mysql_fetch_array($query);

    $response['status_login']='1';
    $response['id']=$row['id'];
    $response['nama']=$row['nama'];
    $response['message']='Berhasil Melakukan Login';
    $query = mysql_query("UPDATE user_bus SET status = 'true' WHERE id = '$row[id]'");
} else {
    $response['status_login']='0';
    $response['message']='Gagal Melakukan Login !!';
}
echo json_encode($response);
?>