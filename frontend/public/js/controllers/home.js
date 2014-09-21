angular.module("raceKeeperApp")

.controller("HomeCtrl", [ "$scope", "$http", "$location", "$rootScope", function ($scope, $http, $location, $rootScope) {

  $http.get("http://unix2.andrew.cmu.edu:8080/races").then(function (response) {
    console.log(response);
    $scope.races = response.data.races;
  }, function (reason) {
    console.log(reason);
  })

  if (angular.isDefined($location.$$absUrl.split("?")[1])) {
    $scope.code = $location.$$absUrl.split("?")[1].split("=")[1].split("#")[0];
  }

  if (angular.isDefined($scope.code)) {
    var token = {
      grant_type: "authorization_code",
      code: $scope.code,
      client_id: $rootScope.clientId,
      client_secret: $rootScope.clientSecret,
      redirect_uri: $rootScope.domain + "/success"
    }

    var createQueryString = function(obj) {
      var arr = [];
      angular.forEach(obj, function (value, key) {
        arr.push(key + "=" + value);
      })
      return arr.join("&");
    }

    var url = "https://runkeeper.com/apps/token?" + createQueryString(token);
    console.log(url);
    $http({
      url: url,
      data: token,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {
      console.log("success!");
      console.log(response);
      console.log($rootScope.yolo);
      var params = {
        race_id: $rootScope.yolo,
        member_id: response.data.access_token
      };
      var url = "http://unix2.andrew.cmu.edu:8080/addMemberToRaceGroup/";
      $http({
        url: url,
        params: params,
        method: "POST",
      })
      .then(function (response) {
      $scope.loading = false;
        console.log("success");
        console.log(response);
      }, function (reason) {
        $scope.loading = false;
        console.log("shit went down");
      })
    }, function (reason) {
      console.log("fail.");
      console.log(reason);
    })
  }

}])