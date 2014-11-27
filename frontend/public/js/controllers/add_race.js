angular.module("raceKeeperApp")

.controller("AddRaceCtrl", [ "$rootScope", "$scope", "$location", "$http", "$timeout", function ($rootScope, $scope, $location, $http, $timeout) {

  $scope.activityTypes = ["Running", "Cycling", "Walking"];

  $scope.params = {
    start_date: new Date(),
    end_date: new Date()
  }

  var twoDigitify = function (thing) {
    var str = thing.toString();

    if (str.length == 1) {
      return "0" + str;
    } else {
      return str;
    }

  }

  var convertDate = function (date) {
    // convert date to yyyy-mm-dd

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    return year.toString() + "-" + twoDigitify(month + 1) + "-" + twoDigitify(day);

  }

  $scope.addRace = function (params) {
    console.log("adding race");

    if (angular.isUndefined(params) ||
        angular.isUndefined(params.race_name) ||
        angular.isUndefined(params.start_date_json) ||
        angular.isUndefined(params.end_date_json) ||
        angular.isUndefined(params.activity_type)) {
      return;
    }

    params.start_date = convertDate(params.start_date_json);
    params.end_date = convertDate(params.end_date_json);

    $scope.loading = true;
    var url = backendDomain + "/addRaceGroup/";
    $http({
      url: url,
      params: params,
      method: "POST",
    })
    .then(function (response) {
    $scope.loading = false;
      console.log("success");
      $timeout(function () {
        $location.path("/");
      }, 1000)
      console.log(response);
    }, function (reason) {
      $scope.loading = false;
      console.log("shit went down");
    })
  }

}])
