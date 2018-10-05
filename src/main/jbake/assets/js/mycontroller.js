'use strict';

// Declare app level module which depends on views, and components
var myControllerModule = angular.module('myControllerPortal',[
  'ui.router',
  'ui.bootstrap',
  'ngResource',
  'angularMoment'
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
      templateUrl: "files/pages/downloads.html",
      controller: "DownloadsController"
    }).state('documents', {
      url:"/documents/:docPage",
      templateUrl: function ($stateParams){
        return 'files/pages/documents/' + $stateParams.docPage;
        }
    }).state('projectDocuments', {
      url:"/documents/user/:docPage",
      templateUrl: function ($stateParams){
        return 'files/docs/' + $stateParams.docPage;
        }
    }).state('blog', {
      url:"/blog/:blogPage",
      templateUrl: function ($stateParams){
        return 'blog/' + $stateParams.blogPage;
        }
    });
});


myControllerModule.run(function ($rootScope, $window, $location) {
  // initialise google analytics
  $window.ga('create', 'UA-126931459-1', 'auto');

  $rootScope.$on('$stateChangeStart', function (event) {
    // send to Google analytics
    $window.ga('send', 'pageview', $location.path());
  });
});

//McNavCtrl
myControllerModule.controller('McPortalNavBarCtrl', ['$scope', '$location', function($scope, $location) {
   $scope.isCollapsed = true;
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);


//Downlaods controller
myControllerModule.controller('DownloadsController', function($scope, GithubFactory) {
  $scope.releaseItems = GithubFactory.getAllReleases();
});



//Read json files
myControllerModule.factory('GithubFactory', function ($resource,$http) {
  $http.defaults.useXDomain = true;
  return $resource('https://api.github.com/repos/mycontroller-org/mycontroller/releases/:filter', {}, {
   getAllReleases: { method: 'GET', isArray: true, params: {filter:'@filter'} },
  })
});

myControllerModule.filter('byteToFriendlyConvertor', function() {
  return function(sizeInByte) {
    if(sizeInByte < 0){
      return "n/a";
    }else if((sizeInByte /(1024 * 1024)) > 1024){
      return (sizeInByte /(1024 * 1024 * 1024)).toFixed(2) + " GB";
    }else if((sizeInByte /(1024)) > 1024){
      return (sizeInByte /(1024 * 1024)).toFixed(2) + " MB";
    }else if(sizeInByte > 1024){
    return (sizeInByte /1024).toFixed(2) + " KB";
    }
    return sizeInByte + " Bytes";
  }
});
