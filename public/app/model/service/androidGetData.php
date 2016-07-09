<?php
include 'dbConnect.php';

//// receiving the post params
$query_koridor = mysql_query("SELECT * FROM koridor");

if (mysql_num_rows($query_koridor) != 0){
    $x = 0;
    while($row = mysql_fetch_array($query_koridor)){
        $koridor[$x]['id_koridor'] = $row['id_koridor'];
        $koridor[$x]['nama_koridor'] = $row['nama_koridor'];
        $query_halte = mysql_query("SELECT * FROM halte WHERE id_koridor = '$row[id_koridor]'");
        if (mysql_num_rows($query_halte) != 0){
            while($row2 = mysql_fetch_array($query_halte)){
                $koridor[$x]['halte'][] = $row2;
            }
        }
        $query_bus = mysql_query("SELECT * FROM bus WHERE id_koridor = '$row[id_koridor]'");
        if (mysql_num_rows($query_bus) != 0){
            while($row3 = mysql_fetch_array($query_bus)){
                $koridor[$x]['bus'][] = $row3;
            }
        }
        $x++;
    }
    echo json_encode($koridor);
}
?>