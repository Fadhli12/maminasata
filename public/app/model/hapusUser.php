<?php
/**
 * Created by PhpStorm.
 * Date: 11/20/2015
 * Time: 9:01 PM
 *
 * mengahpus data bus dan usernya
 */
include "connection.php";

/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_user = $request->id_user;

$db = Database::getInstance();
$mysqli = $db->getConnection();
if ($id_user != 1 || $id_user != '1') {
    $mysqli->query("DELETE FROM user WHERE id_user = '$id_user'");
}

