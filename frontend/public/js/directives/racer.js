angular.module("raceKeeperApp")

.directive("sizer", [ function () {

  return {

    controller: [ "$scope", "$element", function ($scope, $element) {

      $scope.$watch(function () {
        return $element[0].offsetWidth;
      }, function (newValue, oldvalue) {
        // console.log(newValue);
      })

    }]

  }

}])

.directive("absCenter", [ function () {

  return {
    scope: true,
    restrict: "C",
    link: function(scope, elem, attrs) {

      var classList = attrs.class.split(" ")
      var isVerticallyCenter = (classList.indexOf("vertically-center") != -1);
      var isHorizontallyCenter = (classList.indexOf("horizontally-center") != -1);

      elem.bind("load", function (event) {
        if (isVerticallyCenter) {
          updateV(elem[0].offsetHeight);
        }
        if (isHorizontallyCenter) {
          updateH(elem[0].offsetWidth);
        }
      })

      if (isVerticallyCenter) {
        scope.$watch(function (){
          return elem[0].offsetHeight;
        }, function (newValue, oldValue){
          if (angular.isUndefined(oldValue) || Math.abs(newValue - oldValue) > 1) {
            updateV(newValue);
          }
        })
      }

      if (isHorizontallyCenter) {
        scope.$watch(function (){
          return elem[0].offsetWidth;
        }, function (newValue, oldValue){
          if (angular.isUndefined(oldValue) || Math.abs(newValue - oldValue) > 1) {
            updateH(newValue);
          }
        })
      }

      var updateV = function (height) {
        elem.css("margin-top", (height / -2).toString() + "px");
      }
      updateV(elem[0].offsetHeight);

      var updateH = function (width) {
        elem.css("margin-left", (width / -2).toString() + "px");
      }
      updateH(elem[0].offsetWidth);


    }
  };
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

      console.log(scope.races);

      var body = $document.find("body").eq(0);

    }
  };
}])

.directive("runs", [ function () {
  return {
    restrict: "E",
    templateUrl: "html/runs.html",
    scope: {
      runs: "="
    },
    link: function (scope, iElem, iAttrs, controller) {
      console.log('runs');
    }
  }
}])

.directive("run", [ function () {
  return {
    restrict: "E",
    templateUrl: "html/run.html",
    scope: {
      distance: "="
    },
    link: function (scope, iElem, iAttrs, controller) {
      console.log('run');
    }
  }
}])