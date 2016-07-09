<?php

 define('HOST','127.0.0.1');
 define('USER','maminasata');
 define('PASS','998877665544rfv');
 define('DB','maminasata');

 $con = mysqli_connect(HOST,USER,PASS,DB) or die('unable to connect to db');

$link = mysql_connect("127.0.0.1", "maminasata", "998877665544rfv") or die('Cannot connect to the DB');
mysql_select_db('maminasata', $link) or die('Cannot select the DB');

error_reporting(0);
?>
   