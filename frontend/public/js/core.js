String.prototype.rToJ = function () {
  var components = this.split("-");
  if (components.length != 3) {
    throw "given RunKeeper time is in the wrong format. Needs to be yyyy-mm-dd"
  }
  var year = parseInt(components[0]);
  var month = parseInt(components[1]) - 1;
  var day = parseInt(components[2]);
  return new Date(year, month, day);
};

angular.module('raceKeeperApp', ["ngRoute"])

.config(["$routeProvider", "$locationProvider", "$httpProvider", "$sceDelegateProvider", function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {

  $locationProvider.html5Mode(true);
  // $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
  // console.log($httpProvider.defaults.headers);

  $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://unix2.andrew.cmu.edu:8080/**', 'http://unix2.andrew.cmu.edu:8080/**']);

  $routeProvider

  .when("/", {
    title: "RaceKeeper",
    templateUrl: "html/home.html",
    controller: "HomeCtrl"
  })

  .when("/auth", {
    title: "RaceKeeper | Authorize",
    templateUrl: "html/auth.html",
    controller: "AuthCtrl"
  })
  .when("/success", {
    title: "RaceKeeper | Authorization Success",
    templateUrl: "html/success.html",
    controller: "SuccessCtrl"
  })
  .when("/add-race", {
    title: "RaceKeeper | Add a new Race",
    templateUrl: "html/add-race.html",
    controller: "AddRaceCtrl"
  })


}])

.run([ "$window", "$rootScope", "$location", function ($window, $rootScope, $location) {

  $rootScope.clientId = "609fbfd328a84f4e9773adfb8cf9f824";
  $rootScope.clientSecret = "cf21c82d44d741a5ab42356f0a8e4326";

  var slash = "%2F";
  var colon = "%3A";

  $rootScope.domain = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;
  $rootScope.htmlDomain = encodeURIComponent($rootScope.domain);

  angular.element($window).bind("resize", function (event) {
    $rootScope.$apply();
  });

}])
