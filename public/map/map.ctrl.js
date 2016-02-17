/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('mapCtrl',function($scope,$http,$interval,$stateParams){
    //map api
    var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    // init directions service
    var dirService = new google.maps.DirectionsService();
    var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirRenderer.setMap(map);
    var infoWindow = new google.maps.InfoWindow();

    if ($stateParams.id_koridor){
        var koridor = $stateParams.id_koridor;
    } else {
        var koridor = 1;
    }
    var halteMarkers = [];
    var busMarkers = [];
    $scope.getRute = function(id_koridor){
        $http.post('public/map/model/getRute.php',{koridor : id_koridor})
            .then(function(res){
                getMap(res.data);
                setHalte(res.data.halte)
            },function(){
                console.log('error');
            });
    };
    $scope.getRute(koridor);

    function getMap(rute) {
        //google map
        var request = {
            origin: rute.direction[0].location,
            destination: rute.direction[0].location,
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
        for (i = 0; i < halte.length; i++){
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(halte[i].latitude, halte[i].longitude),
                title: halte[i].nama,
                animation: google.maps.Animation.DROP
            });
            marker.content = '' +
                '<div class="infoWindowContent">' +
                '   <h4>' + marker.title + '</h4>  ' +
                '   <p><i class="fa fa-dashboard"></i> Keceptan : 30 km/jam</p>' +
                '   <p><i class="fa fa-bus"></i> Status : OTW</p>' +
                '   <p><i class="fa fa-clock-o"></i> ETA : 15 menit</p>' +
                '</div>';
            google.maps.event.addListener(marker, 'click', function () {
                /*open map default content*/
                infoWindow.setContent(marker.content);
                infoWindow.open(map, marker);
            });

            halteMarkers.push(marker);
        }
    }

    function setBus(){
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


    //modal init
    $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    });
    $('#modal1').openModal();
    $('#modal1').closeModal();
});
