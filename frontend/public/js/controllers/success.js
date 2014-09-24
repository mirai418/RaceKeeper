angular.module("raceKeeperApp")

.controller("SuccessCtrl", [ "$rootScope", "$scope", "$location", "$http", function ($rootScope, $scope, $location, $http) {

  $scope.code = $location.search().code;

  var token = {
    grant_type: "authorization_code",
    code: $scope.code,
    client_id: $rootScope.clientId,
    client_secret: $rootScope.clientSecret,
    redirect_uri: $rootScope.domain + "/#/success"
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
    var url = "http://104.131.120.21:8081/addMemberToRaceGroup/";
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



}])

// application/x-www-form-urlencoded