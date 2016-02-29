/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('mapCtrl',function($scope,$http,$interval,$stateParams){
    //app api
    var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    // init directions service
    var dirService = new google.maps.DirectionsService();
    var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirRenderer.setMap(map);
    //var infoWindow = new google.maps.InfoWindow();

    if ($stateParams.id_koridor){
        var koridor = $stateParams.id_koridor;
    } else {
        var koridor = 3;
    }
    var halteMarkers = [];
    var busMarkers = [];
    $scope.getRute = function(id_koridor){
        console.log('set rute');
        $http.post('public/app/model/getRute.php',{koridor : id_koridor})
            .then(function(res){
                console.log(res);
                getMap(res.data);
                setHalte(res.data.halte);
            },function(){
                console.log('error');
            });
    };
    $scope.getRute(koridor);

    function getMap(rute) {
        //google app
        console.log('get app');
        var request = {
            origin: rute.start,
            destination: rute.end,
            waypoints: rute.direction,
            travelMode: google.maps.TravelMode.DRIVING
        };
        dirService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirRenderer.setDirections(result);
            }
        });
    }

    function setHalte(halte){
        console.log('set halte');
        for (i = 0; i < halte.length; i++){
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(halte[i].latitude, halte[i].longitude),
                title: halte[i].nama,
                animation: google.maps.Animation.DROP
            });


            halteMarkers.push(marker);
        }
    }

    function setBus(){
        console.log('set bus')
        var bus = {latitude:-5.138828,longitude:119.420517};
        var iconBase = 'assets/img/icon/';
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(bus.latitude, bus.longitude),
            title: 'Bus',
            icon : iconBase+'icon-bus.png'
        });

        busMarkers.push(marker);
        for (m = 1; m <= busMarkers.length; m++){
            if (m < busMarkers.length){
                busMarkers[m-1].setMap(null);
            }
            if (m == busMarkers.length){
                busMarkers[m-1].setMap(map);
            }
        }
    }

    for (x = 0 ; x < busMarkers.length; x++){
        halteMarkers[x].setMap(map);
    }
    $interval(setBus, 5000);


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
