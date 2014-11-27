angular.module("raceKeeperApp")

.factory('RaceListService', [ '$http', function ($http) {

  var res = {};

  res.get = function () {

    res.promise = $http.get(backendDomain + "/races");
    res.promise.then(function (response) {
      res.list = response.data.races;
      return res.list;
    }, function (reason) {
      console.log(reason);
    })

    return res.list
  }

  res.get();

  return res;

}])