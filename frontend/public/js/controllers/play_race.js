angular.module("raceKeeperApp")

.controller("PlayRaceCtrl", [ "$scope", "$route", function ($scope, $route) {

  $scope.race = $route.current.locals.race

}])