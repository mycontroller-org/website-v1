'use strict';

// Declare app level module which depends on views, and components
var myControllerModule = angular.module('myControllerPortal',[
  'ui.router',
  'ui.bootstrap',
  'ngResource'
]).
config(function($stateProvider, $urlRouterProvider) {
  //For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise('/home');
  
	$stateProvider
    .state('home', {
      url:"/home",
      templateUrl: "partials/about.html"
    }).state('downloads', {
      url:"/downloads",
      templateUrl: "partials/downloads.html"
    }).state('document', {
      url:"/document",
      templateUrl: "partials/document.html"
    });
});


//McNavCtrl
myControllerModule.controller('McPortalNavBarCtrl', ['$scope', '$location', function($scope, $location) {
   $scope.isCollapsed = true;
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);
