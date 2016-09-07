<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
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
$id_bus = $request->id_bus;
$id_user = $request->id_user;

$db = Database::getInstance();
$mysqli = $db->getConnection();

$mysqli->query("DELETE FROM user_bus WHERE id = '$id_user'");
$mysqli->query("DELETE FROM bus WHERE id_bus = '$id_bus'");

