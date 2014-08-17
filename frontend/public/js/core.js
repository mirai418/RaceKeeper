angular.module('raceKeeperApp', ["ngRoute"])

.config(["$routeProvider", function ($routeProvider) {
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

}])

.run([ "$window", "$rootScope", function ($window, $rootScope) {

  angular.element($window).bind("resize", function (event) {
    $rootScope.$apply();
  });

}])