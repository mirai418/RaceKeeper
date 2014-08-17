angular.module("raceKeeperApp")

.directive("sizer", [ function () {

  return {

    controller: [ "$scope", "$element", function ($scope, $element) {

      $scope.$watch(function () {
        return $element[0].offsetWidth;
      }, function (newValue, oldvalue) {
        console.log(newValue);
      })

    }]

  }

}])

.directive("racer", [ "$document", function ($document){
  // Runs during compile
  return {
    restrict: "E",
    templateUrl: "html/racer.html",
    scope: {
      races: "="
    },
    link: function(scope, iElem, iAttrs, controller) {

      var body = $document.find("body").eq(0);
      console.log(body);

    }
  };
}]);