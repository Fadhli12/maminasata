/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('globalCtrl',function($scope,$http){
    $scope.koridor = [];
    $http.get('public/app/model/getKoridor.php')
        .then(function(res){
            $scope.koridor = res.data
        },function(){
            console.log('error')
        });
    //materalizecss jquery script
    $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
        $('select').material_select();
    });

    $('#bus-modal').openModal();
    $('#bus-modal').closeModal();

    $('#koridor-modal').openModal();
    $('#koridor-modal').closeModal();

});
