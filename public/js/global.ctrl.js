/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('mapCtrl',function($scope,$http,$interval){
    $scope.koridor = [];
    $http.get('public/map/model/getKoridor.php')
        .then(function(res){
            $scope.koridor = res.data
        },function(){
            console.log('error')
        });

    //modal init
    $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    });
    $('#modal1').openModal();
    $('#modal1').closeModal();



    $scope.getRute = function(k){
        $http.post('public/map/model/getRute.php',{koridor : k})
            .then(function(res){
                getMap(res.data);
            },function(){
                console.log('error');
            });
    };
    $scope.getRute('1');
    //$interval(getRute, 5000);

    function getMap(rute){
        var myOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        // init directions service
        var dirService = new google.maps.DirectionsService();
        var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
        dirRenderer.setMap(map);

        //google map
        var request = {
            origin: rute.direction[0].location,
            destination: rute.direction[0].location,
            waypoints: rute.direction,
            travelMode: google.maps.TravelMode.DRIVING
        };
        dirService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirRenderer.setDirections(result);
            }
        });
        /*var halte = [
            {latitude:'-5.1666716',longitude:'119.4477935'},
            {latitude:'-5.1567238',longitude:'119.4464341'},
            {latitude:'-5.1415601',longitude:'119.4485844'}
        ]*/

        var halte = rute.halte;

        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (halte) {
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(halte.latitude, halte.longitude),
                title: halte.nama
            });
            marker.content = '' +
                '<div class="infoWindowContent">' +
                '   <h4>' + marker.title + '</h4>  ' +
                '   <p><i class="fa fa-map-marker"></i> Lokasi :' + halte.latitude +','+ halte.longitude+'</p>' +
                '</div>';
            google.maps.event.addListener(marker, 'click', function () {
                /*open map default content*/
                infoWindow.setContent(marker.content);
                infoWindow.open(map, marker);
            });

        };

        //inisiasi marker
        for (i = 0; i < halte.length; i++){
            createMarker(halte[i]);
        }
        var iconBase = 'assets/img/icon/';
        var createMarkerBus = function (bus) {

            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(bus.latitude, bus.longitude),
                icon : iconBase+'icon-bus.png',
                title: 'Maminasata 1'
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
        };

        var bus = {latitude:-5.138828,longitude:119.420517};
        createMarkerBus(bus);
    }
});
