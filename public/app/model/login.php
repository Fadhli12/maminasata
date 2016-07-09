<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/25/2015
 * Time: 5:29 AM
 */

include "connection.php";

$db = Database::getInstance();
$mysqli = $db->getConnection();
/*
 * get data from $http.post request
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$username = $request->username;
$password = $request->password;

$sql_query = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
$result = $mysqli->query($sql_query);

if (mysqli_num_rows($result)>0){
    $row = mysqli_fetch_array($result);

    $response['status_login']='1';
    $response['id_user']=$row['id_user'];
    $response['nama']=$row['nama'];
} else {
    $response['status_login']='0';
    $response['message']='Maaf, Username atau Password Salah!!';
}
echo ")]}',\n";
echo json_encode($response);