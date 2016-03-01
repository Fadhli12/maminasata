/**
 * Created by virah on 17-Nov-15.
 */

var myApp = angular.module('myApp',['ui.router','ngAnimate','ngRoute']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){
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
       });
    $urlRouterProvider.otherwise('/map/3');
    $locationProvider.html5Mode({enabled:true,requireBase:true});
})
