angular.module("raceKeeperApp")

.controller("HomeCtrl", [ "$scope", "$http", "$location", "$rootScope", "RaceListService", "$cookies", "asuiModal",
  function ($scope, $http, $location, $rootScope, RaceListService, $cookies, asuiModal) {

  $scope.$watch(function () {
    return RaceListService.list;
  }, function (newValue) {
    $scope.races = newValue
  })

  // epic hacking starts here.

  $scope.clientId = $rootScope.clientId;
  $scope.htmlDomain = $rootScope.htmlDomain;

  $scope.authorize = function (id) {
    $scope.redirectId = id;
    $cookies.redirectId = id;
    asuiModal.open("html/auth-modal.html", $scope);
  }

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
    $http({
      url: url,
      data: token,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {
      var params = {
        race_id: $cookies.redirectId,
        member_id: response.data.access_token
      };
      var url = backendDomain + "/addMemberToRaceGroup/";
      $http({
        url: url,
        params: params,
        method: "POST",
      })
      .then(function (response) {
      $scope.loading = false;
        console.log("success");
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