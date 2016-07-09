<?php
include 'dbConnect.php';

//// receiving the post params
if (isset($_GET['id_bus'])){
    $id_bus = $_GET['id_bus'];
}
if (isset($_GET['id_halte'])){
    $id_halte = $_GET['id_halte'];
}

if (($id_bus != '') && ($id_halte != '')){
    $query_bus = mysql_query("SELECT * FROM perjalanan WHERE id_bus = '$id_bus' LIMIT 1");
    $data_bus = mysql_fetch_array($query_bus);
    $status = $data_bus['status'];
    $kecepatan = $data_bus['kecepatan'];
    $lat_bus = $data_bus['latitude'];
    $lng_bus = $data_bus['longitude'];

    $query_halte = mysql_query("SELECT * FROM halte WHERE id_halte = '$id_halte' LIMIT 1");
    $data_halte = mysql_fetch_array($query_halte);
    $lat_halte = $data_halte['latitude'];
    $lng_halte = $data_halte['longitude'];
    $data = file_get_contents("https://maps.googleapis.com/maps/api/directions/json?origin=$lat_bus,$lng_bus&destination=$lat_halte,$lng_halte");
    $data_decode = json_decode($data);
    $distance = $data_decode->routes[0]->legs[0]->distance->value;

    $cek_tmp = mysql_query("SELECT * FROM tmp_jarak WHERE id_bus = '$id_bus' AND id_halte = '$id_halte'");
    if (mysql_num_rows($cek_tmp) == 0){
        if ($distance != null){
            $insert_tmp = mysql_query("INSERT INTO tmp_jarak SET id_bus = '$id_bus', id_halte = '$id_halte', jarak = '$distance'");
        } else {
            $distance = 0;
        }
    } else {
        if ($distance != null){
            $data_tmp = mysql_fetch_array($cek_tmp);
            $jarak = $data_tmp['jarak'];
            if ($jarak != $distance){
                $update_tmp = mysql_query("UPDATE tmp_jarak SET jarak = '$distance' WHERE id_bus = '$id_bus' AND id_halte = '$id_halte'");
            }
        } else {
            $get_tmp = mysql_query("SELECT * FROM tmp_jarak WHERE id_bus = '$id_bus' AND id_halte = '$id_halte'");
            $data_get_tmp = mysql_fetch_array($get_tmp);
            $distance = $data_get_tmp['jarak'];
        }
    }


    $eta = $distance / ($kecepatan*1000/3600);
    if ($eta == false){
        $eta = 0.0;
    }
    $response['status'] = 'berhasil';
    $response['data'] = array(
        'bus' => array(
            'latitude' => $lat_bus,
            'longitude' => $lng_bus,
            'status' => $status,
        ),
        'halte' => array(
            'latitude' => $lat_halte,
            'longitude' => $lng_halte,
        ),
        'kecepatan'=> $kecepatan,
        'jarak' => $distance,
        'eta' => $eta
    );
} else {
    $response['status'] = 'gagal';
    $response['message'] = 'id_bus tidak boleh kosong, id_halte tidak boleh kosong';
    $response['required'] = 'id_bus , id_halte ';
}
echo json_encode($response);
?>
