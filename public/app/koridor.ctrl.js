/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('koridorCtrl',function($scope,$http){
    $scope.koridor = [];
    $scope.rute = [];
    $scope.halte = [];
    function getKoridor(){
        $http.get('public/app/model/getKoridor.php')
            .then(function(res){
                $scope.koridor = res.data;
            }, function(res){
                console.log(res)
            })
    }

    getKoridor();

    $scope.tambahRute = function(){
        var data = new Object();
        data.lokasi = $('#lokasi-kordinat').val();
        data.latitude = $('#latitude').val();
        data.longitude = $('#longitude').val();
        $scope.rute.push(data);
    }

    $scope.tambahHalte = function(){
        var data = new Object();
        data.lokasi = $('#lokasi-kordinat-halte').val();
        data.latitude = $('#latitude-halte').val();
        data.longitude = $('#longitude-halte').val();
        $scope.halte.push(data);
    }

    $scope.hapusRute = function(index){
        $scope.rute.splice(index,1);
    }

    $scope.hapusHalte = function(index){
        $scope.halte.splice(index,1);
    }
    $scope.tambahKoridor = function(){
        var koridor = new Object();
        koridor.rute = $scope.rute;
        koridor.nama_koridor = $scope.nama_koridor;
        $http.post('public/app/model/postKoridor.php', koridor)
            .then(function(res){
                console.log(res);
                getKoridor();
            },function(res){
                console.log(res);
            })
    }

    $scope.openModal = function(id){
        $('#'+id).openModal();
    }
    $scope.openHalte = function(id){
        $('#halte-modal').openModal();
        $('#map-picker-halte').locationpicker('autosize');
        $scope.halte = [];
        $scope.id_koridor = id;
    }

    $scope.postHalte = function(){
        $http.post('public/app/model/postHalte.php', {halte: $scope.halte, id_koridor : $scope.id_koridor})
            .then(function(res){
                console.log(res);
                getKoridor();
            },function(res){
                console.log(res);
            })
    }
    $scope.hapusKoridor = function(id,nama){
        var answer = confirm("Yakin ingin menghapus "+nama+" !");
        if (answer) {
            $http.post('public/app/model/hapusKoridor.php',{id : id})
                .then(function(){
                    getKoridor();
                },function(res){
                    console.log(res);
                })
        }
    }
});
