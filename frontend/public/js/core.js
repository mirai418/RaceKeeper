
var backendDomain = "http://ecebros.com:8081";

String.prototype.rToJ = function () {
  var components = this.split(" ");
  // if (components.length != 3) {
  //   throw "given RunKeeper time is in the wrong format. Needs to be yyyy-mm-dd"
  // }
  var year = parseInt(components[3]);
  // what the fuck is this ghetto coding?
  if (components[2] == "Dec") {
    var month = 11;
  } else if (components[2] == "Nov") {
    var month = 10;
  } else if (components[2] == "Oct") {
    var month = 9;
  } else if (components[2] == "Sep") {
    var month = 8;
  } else if (components[2] == "Aug") {
    var month = 7;
  } else if (components[2] == "Jul") {
    var month = 6;
  } else if (components[2] == "Jun") {
    var month = 5;
  } else if (components[2] == "May") {
    var month = 4;
  } else if (components[2] == "Apr") {
    var month = 3;
  } else if (components[2] == "Mar") {
    var month = 2;
  } else if (components[2] == "Feb") {
    var month = 1;
  } else if (components[2] == "Jan") {
    var month = 0;
  }
  var day = parseInt(components[1]);
  return new Date(year, month, day);
};

angular.module('raceKeeperApp', ["ngRoute", "ngCookies", "ngAnimate", "asui"])

.config(["$routeProvider", "$locationProvider", "$httpProvider", "$sceDelegateProvider", function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {

  // $locationProvider.html5Mode(true);
  // $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
  // console.log($httpProvider.defaults.headers);

  $sceDelegateProvider.resourceUrlWhitelist(['self', backendDomain ]);

  var resolveRace = {
    race: [ "$route", "RaceService", function ($route, RaceService) {
      return RaceService.get($route.current.params.id).promise;
    }]
  };

  $routeProvider

  .when("/", {
    title: "RaceKeeper",
    templateUrl: "html/home.html",
    controller: "HomeCtrl"
  })
  .when("/race/:id", {
    title: "RaceKeeper | Play Race",
    templateUrl: "html/play-race.html",
    controller: "PlayRaceCtrl",
    resolve: resolveRace
  })
  .when("/add-race", {
    title: "RaceKeeper | Add a new Race",
    templateUrl: "html/add-race.html",
    controller: "AddRaceCtrl"
  })
  .otherwise({
    title: "404",
    template: "Not Found Bru"
  })


}])

.run([ "$window", "$rootScope", "$location", "RaceListService", function ($window, $rootScope, $location, RaceListService) {

  $rootScope.clientId = "609fbfd328a84f4e9773adfb8cf9f824";
  $rootScope.clientSecret = "cf21c82d44d741a5ab42356f0a8e4326";

  $rootScope.domain = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;
  $rootScope.htmlDomain = encodeURIComponent($rootScope.domain);

  angular.element($window).bind("resize", function (event) {
    $rootScope.$apply();
  });

}])
