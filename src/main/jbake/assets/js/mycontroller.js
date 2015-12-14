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
      templateUrl: "files/pages/about.html"
    }).state('downloads', {
      url:"/downloads",
      templateUrl: "files/pages/downloads.html"
    }).state('documents', {
      url:"/documents/:docPage",
      templateUrl: function ($stateParams){
        return 'files/pages/documents/' + $stateParams.docPage;
        }
    }).state('blog', {
      url:"/blog/:blogPage",
      templateUrl: function ($stateParams){
        return 'blog/' + $stateParams.blogPage;
        }
    });
});


//McNavCtrl
myControllerModule.controller('McPortalNavBarCtrl', ['$scope', '$location', function($scope, $location) {
   $scope.isCollapsed = true;
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);
