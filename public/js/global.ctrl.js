/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('globalCtrl',function($scope,$http){
    $scope.koridor = [];
    $scope.bus = {};
    $http.get('public/app/model/getKoridor.php')
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
});
