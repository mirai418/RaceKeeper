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


.directive("racer", [ "$document", "$rootScope", "$interval", function ($document, $rootScope, $interval){
  // Runs during compile
  return {
    restrict: "E",
    templateUrl: "html/racer.html",
    scope: {
      races: "="
    },
    link: function(scope, iElem, iAttrs, controller) {

      var body = $document.find("body").eq(0);

      var calcTotal = function (races) {

        var totals = {};
        var highestTotal = 0;
        angular.forEach(races, function (value, key) {
          totals[key] = 0;
          for (var i = 0; i < value.length; i++) {
            totals[key] += value[i].distance;
          }
          if (totals[key] > highestTotal) {
            highestTotal = totals[key];
          }
        });

        return highestTotal;
      }

      var getPixelMeterRatio = function (totalDistance, width) {
        return width / totalDistance;
      }

      scope.$watch(function () {
        return scope.races;
      }, function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          var longestDistance = calcTotal(newValue);
          var width = body[0].offsetWidth - 20;
          $rootScope.pxMeterRatio = getPixelMeterRatio(calcTotal(newValue), width);
          $rootScope.barHeight = (body[0].offsetHeight - 80) / Object.keys(scope.races).length;
          console.log($rootScope.barHeight);
        }
      })


      var baseDate = new Date(2014, 4, 1);
      $rootScope.now = baseDate;

      $interval(function () {
        $rootScope.now.setDate($rootScope.now.getDate() + 1);
      }, 100, 30);

    }
  };
}])

.directive("runs", [ "$rootScope", function ($rootScope) {
  return {
    restrict: "E",
    templateUrl: "html/runs.html",
    scope: {
      runs: "=",
    },
    link: function (scope, iElem, iAttrs, controller) {

      scope.getHeight = function () {
        return ($rootScope.barHeight - 20).toString() + "px";
      }

    }
  }
}])

.directive("run", [ "$rootScope", function ($rootScope) {
  return {
    restrict: "E",
    templateUrl: "html/run.html",
    scope: {
      run: "=",
    },
    link: function (scope, iElem, iAttrs, controller) {

      scope.getWidth = function () {
        return ($rootScope.pxMeterRatio * scope.run.distance).toString() + "px";
      }

      scope.shouldShow = function () {
        var runDate = scope.run.start_time.rToJ();
        return (runDate < $rootScope.now);
      }

    }
  }
}])