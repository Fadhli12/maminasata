/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('koridorEditCtrl',function($scope,$http,$stateParams){
    $scope.list_rute = [];
    $scope.edit_koridor = {};
    $scope.koridor = {};
    $scope.id_koridor = $stateParams.id_koridor;

    $scope.getKoridor = function(){
        $scope.edit_koridor = [''];
        $http.post('public/app/model/getKoridorEdit.php',{id_koridor:$scope.id_koridor})
            .then(function(res){
                $scope.list_rute = res.data.rute;
                $scope.koridor = res.data.koridor;
            },function(){
                console.log('error');
            })
    };

    $scope.getKoridor();
    $scope.cek = false;
    $scope.editRute = function(index){
        var latitude = $scope.list_rute[index].latitude;
        var longitude = $scope.list_rute[index].longitude;
        if (!$scope.cek) {
            $('#map-picker-rute').locationpicker({
                location: {latitude: latitude, longitude: longitude},
                radius: 0,
                inputBinding: {
                    latitudeInput: $('#latitude-rute'),
                    longitudeInput: $('#longitude-rute'),
                    locationNameInput: $('#lokasi-kordinat-rute')
                },
                enableAutocomplete: true
            });
            $scope.cek = true;
        } else {
            $('#map-picker-rute').locationpicker("location",{latitude: latitude, longitude: longitude})
        }
        $scope.id_jalan = $scope.list_rute[index].id_jalan
        $('#edit-rute-modal').openModal();
        $('#map-picker-rute').locationpicker('autosize');
    }

    $scope.saveEditRute = function(){
        var rute = new Object();
        rute.latitude = $('#latitude-rute').val();
        rute.longitude = $('#longitude-rute').val();
        rute.nama = $('#lokasi-kordinat-rute').val();
        rute.id_jalan = $scope.id_jalan;
        
        $http.post('public/app/model/postKoridorEdit.php',rute)
            .then(function(){
                $scope.getKoridor();
            },function(){
                console.log('error');
            })
    };

    $scope.openModal = function(id){
        $('#'+id).openModal();
        $('#map-picker').locationpicker('autosize');
    };

    $scope.tambahRute = function(){
        var rute = new Object();
        rute.latitude = $('#latitude').val();
        rute.longitude = $('#longitude').val();
        rute.nama = $('#lokasi').val();
        rute.id_koridor = $scope.id_koridor;
        
        $http.post('public/app/model/postTambahRute.php',rute)
            .then(function(){
                $scope.getKoridor();
            },function(){
                console.log('error');
            })
    };
    $scope.id_jalan_hapus = ''; 
    $scope.modalConfirm = function(index){
        $('#confirm').openModal();
        $scope.id_jalan_hapus = $scope.list_rute[index].id_jalan;
    };
    
    $scope.hapusRute = function(id_jalan){
        $http.post('public/app/model/hapusRute.php',{id_jalan:id_jalan})
            .then(function(){
                $scope.getKoridor();
            },function(){
                console.log('error');
            })
    };

    $scope.submitForm = function(){
            $http.post('public/app/model/simpanKoridorEdit.php', {nama_koridor : $scope.koridor.nama_koridor, id_koridor: $scope.id_koridor})
                .then(function(){
                    
                },function(){
                    console.log('error')
                })
    }
});
