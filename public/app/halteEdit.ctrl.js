/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('halteEditCtrl',function($scope,$http,$stateParams){
    $scope.list_halte = [];
    $scope.id_koridor = $stateParams.id_koridor;
    $scope.getHalte = function(){
        $scope.list_halte = [''];
        $http.post('public/app/model/getHalteEdit.php', {id_koridor:$scope.id_koridor})
            .then(function(res){
                $scope.list_halte = res.data;
            },function(){
                console.log('error');
            })
    };
    $scope.getHalte();
    
    $scope.openModal = function(id){
        $('#'+id).openModal();
        $('#map-picker').locationpicker('autosize');
    };

    $scope.tambahHalte = function(){
        var halte = new Object();
        halte.latitude = $('#latitude').val();
        halte.longitude = $('#longitude').val();
        halte.nama = $('#lokasi').val();
        halte.id_koridor = $scope.id_koridor;
        
        $http.post('public/app/model/postTambahHalte.php',halte)
            .then(function(){
                $scope.getHalte();
            },function(){
                console.log('error');
            })
    };
    $scope.cek = false;
    $scope.editHalte = function(index){
        var latitude = $scope.list_halte[index].latitude;
        var longitude = $scope.list_halte[index].longitude;
        if (!$scope.cek) {
            $('#map-picker-halte').locationpicker({
                location: {latitude: latitude, longitude: longitude},
                radius: 0,
                inputBinding: {
                    latitudeInput: $('#latitude-halte'),
                    longitudeInput: $('#longitude-halte'),
                    locationNameInput: $('#lokasi-halte')
                },
                enableAutocomplete: true
            });
            $scope.cek = true;
        } else {
            $('#map-picker-halte').locationpicker("location",{latitude: latitude, longitude: longitude})
        }
        $scope.id_halte = $scope.list_halte[index].id_halte;
        $('#edit-halte-modal').openModal();
        $('#map-picker-halte').locationpicker('autosize');
    };
    
    $scope.saveEditHalte = function(){
        var halte = new Object();
        halte.latitude = $('#latitude-halte').val();
        halte.longitude = $('#longitude-halte').val();
        halte.nama = $('#lokasi-halte').val();
        halte.id_halte = $scope.id_halte;

        $http.post('public/app/model/postHalteEdit.php',halte)
            .then(function(){
                $scope.getHalte();
            },function(){
                console.log('error');
            })
    };

    $scope.id_halte_hapus = '';
    $scope.modalConfirm = function(index){
        $('#confirm').openModal();
        $scope.id_halte_hapus = $scope.list_halte[index].id_halte;
    };

    $scope.hapusHalte = function(id_halte){
        $http.post('public/app/model/hapusHalte.php',{id_halte:id_halte})
            .then(function(){
                $scope.getHalte();
            },function(){
                console.log('error');
            })
    }
    
});
