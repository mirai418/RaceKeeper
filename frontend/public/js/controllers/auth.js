angular.module("raceKeeperApp")

.controller("AuthCtrl", [ "$scope", "$rootScope", function ($scope, $rootScope) {

  $scope.clientId = $rootScope.clientId;
  $scope.htmlDomain = $rootScope.htmlDomain;

}])