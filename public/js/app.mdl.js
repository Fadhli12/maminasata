/**
 * Created by virah on 17-Nov-15.
 */

var myApp = angular.module('myApp',['ui.router','ngAnimate','ngRoute','ui.materialize']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider,$routeProvider){
   $stateProvider
       .state('map',{
           url:'/map/:id_koridor',
           templateUrl:'public/app/view/map.html',
           controller:'mapCtrl'
       })
       .state('koridor',{
           url:'/koridor',
           templateUrl:'public/app/view/koridor.html',
           controller:'koridorCtrl'
       })
       .state('edit-koridor',{
           url:'/edit-koridor/:id_koridor',
           templateUrl:'public/app/view/koridor.edit.html',
           controller:'koridorEditCtrl'
       })
       .state('edit-halte',{
           url:'/edit-halte/:id_koridor',
           templateUrl:'public/app/view/halte.edit.html',
           controller:'halteEditCtrl'
       });
    $urlRouterProvider.otherwise('map/3');
    //$locationProvider.html5Mode(true);

})
