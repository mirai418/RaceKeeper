angular.module("raceKeeperApp")

.controller("AuthCtrl", [ "$scope", "$rootScope", "$routeParams", function ($scope, $rootScope, $routeParams) {

  $scope.clientId = $rootScope.clientId;
  $scope.htmlDomain = $rootScope.htmlDomain;

  console.log($routeParams.id);

  $rootScope.yolo = $routeParams.id;
  console.log($rootScope);

}])