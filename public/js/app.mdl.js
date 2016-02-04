/**
 * Created by virah on 17-Nov-15.
 */

var myApp = angular.module('myApp',['ui.router','ngAnimate','ngRoute']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){
   $stateProvider
       .state('map',{
           url:'/',
           templateUrl:'public/map/view/map.html',
           controller:'mapCtrl'
       });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({enabled:true,requireBase:true});
})
