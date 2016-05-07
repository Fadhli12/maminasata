/**
 * Created by virah on 17-Nov-15.
 */

var myApp = angular.module('myApp',['ui.router','ngAnimate','ngRoute','ui.materialize','ngCookies']);

myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider,$routeProvider){
   $stateProvider
       .state('login',{
           url:'/login',
           templateUrl:'public/app/view/login.html',
           controller:'loginCtrl',
           data: {
               requireLogin: false
           }
       })
       .state('app',{
           url:'/app',
           templateUrl:'public/app/view/app.html',
           data: {
               requireLogin: true
           }
       })
           .state('app.map',{
               url:'/map/:id_koridor',
               templateUrl:'public/app/view/map.html',
               controller:'mapCtrl'
           })
           .state('app.koridor',{
               url:'/koridor',
               templateUrl:'public/app/view/koridor.html',
               controller:'koridorCtrl'
           })
           .state('app.edit-koridor',{
               url:'/edit-koridor/:id_koridor',
               templateUrl:'public/app/view/koridor.edit.html',
               controller:'koridorEditCtrl'
           })
           .state('app.edit-halte',{
               url:'/edit-halte/:id_koridor',
               templateUrl:'public/app/view/halte.edit.html',
               controller:'halteEditCtrl'
           })
           .state('app.manajemen-bus',{
               url:'/manajemen-bus',
               templateUrl:'public/app/view/manajemen_bus.html',
               controller:'manajemenBusCtrl'
           })
   ;
    $urlRouterProvider.otherwise('login');
    //$locationProvider.html5Mode(true);

});

myApp.run(['$rootScope','$location','userModel',function($rootScope,$location,userModel){
    $rootScope.$on("$stateChangeStart",function (event, toState, toParams, fromState, fromParams){
        var requireLogin = toState.data.requireLogin;
        if (requireLogin){
            if (!userModel.getAuthStatus()){
                event.preventDefault()
                $location.path('/');
            }
        }
        if (toState.url == '/'){
            if (userModel.getAuthStatus()){
                event.preventDefault();
                $location.path(fromState.url);
            }
        }
    });
}]);