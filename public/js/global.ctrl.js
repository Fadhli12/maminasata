/**
 */
myApp.controller('globalCtrl',function($scope,$http,$cookies,userModel){
    $scope.koridor = [];
    $scope.bus = {};
    $scope.nama = $cookies.get('nama');
    $http.get('public/app/model/getKoridorOnly.php')
        .then(function(res){
            $scope.koridor = res.data
        },function(){
            console.log('error')
        });
    $scope.postBus = function(){
        $http.post('public/app/model/postBus.php', $scope.bus)
            .then(function(){
                Materialize.toast('Pendaftaran Berhasil! Silahkan tunggu konfirmasi selanjutnya', 5000);
                $scope.bus = {};
                $('#bus-modal').closeModal();
            },function(res){
                console.log(res);
            })
    };
    $scope.logOut = function(){
        userModel.doLogout();
    }
    
});
