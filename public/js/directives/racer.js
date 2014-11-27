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

      var updateV = function (height) {
        elem.css("margin-top", (height / -2).toString() + "px");
      }

      var updateH = function (width) {
        elem.css("margin-left", (width / -2).toString() + "px");
      }

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
        updateV(elem[0].offsetHeight);
      }

      if (isHorizontallyCenter) {
        scope.$watch(function (){
          return elem[0].offsetWidth;
        }, function (newValue, oldValue){
          if (angular.isUndefined(oldValue) || Math.abs(newValue - oldValue) > 1) {
            updateH(newValue);
          }
        })
        updateH(elem[0].offsetWidth);
      }

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
            totals[key] += value[i].total_distance;
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

      var getInterval = function (races) {
        var minDate = null;
        var maxDate = new Date(0);
        var firstDate, lastDate;
        angular.forEach(races, function (value, key) {
          if (value.length > 0) {
            firstDate = value[value.length - 1].start_time.rToJ();
            if (minDate === null || firstDate < minDate) {
              minDate = firstDate;
            }
            lastDate = value[0].start_time.rToJ();
            if (lastDate > maxDate) {
              maxDate = lastDate;
            }
          }
        })

        var days = (maxDate - minDate) / (1000 * 60 * 60 * 24);

        return [minDate, maxDate, days];
      }

      scope.height = body[0].offsetHeight - 100;
      scope.getHeight = function () {
        return scope.height.toString() + "px";
      }

      scope.$watch(function () {
        return scope.races;
      }, function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {

          var i = 0;
          angular.forEach(newValue, function (value, key) {
            i += 1;
          })

          if (i < 1) {
            console.log("you didn't run");
            scope.noRuns = true;
            return;
          }

          scope.noRuns = false;

          scope.longestDistance = calcTotal(newValue);
          var width = body[0].offsetWidth - 40;
          $rootScope.pxMeterRatio = getPixelMeterRatio(scope.longestDistance, width);
          $rootScope.barHeight = (scope.height - 30) / Object.keys(scope.races).length;

          scope.increments = [1,2,3,4,5];
          scope.incrementWidth = (scope.longestDistance * $rootScope.pxMeterRatio / 5).toString() + "px";
        }

        var interval = getInterval(newValue);
        $rootScope.now = interval[0];

        $interval(function () {
          $rootScope.now.setDate($rootScope.now.getDate() + 1);
        }, 320, interval[2] + 2);

      })

      scope.getAxisMeasure = function (increment) {
        return (Math.round(scope.longestDistance / 5 * increment) / 1000).toString() + "km";
      }

    }
  };
}])

.directive("runs", [ "$rootScope", function ($rootScope) {
  return {
    restrict: "E",
    templateUrl: "html/runs.html",
    scope: {
      user: "=",
      runs: "=",
    },
    link: function (scope, iElem, iAttrs, controller) {

      scope.color = randomColor({
       luminosity: 'light'
      });

      scope.getHeight = function () {
        return ($rootScope.barHeight - 10).toString() + "px";
      }

      scope.getUser = function (user) {
        user = scope.user;
        // if (user == "6aab6d6c146b4035896bba1ba7481490") {
        //   return "makagawa";
        // } else if (user == "c528f921ebb54f58862980877a752838") {
        //   return "mp";
        // } else {
          return user;
        // }
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
      color: "@"
    },
    link: function (scope, iElem, iAttrs, controller) {

      scope.getWidth = function () {
        return ($rootScope.pxMeterRatio * scope.run.total_distance).toString() + "px";
      }

      scope.shouldShow = function () {
        var runDate = scope.run.start_time.rToJ();
        return (runDate < $rootScope.now);
      }

    }
  }
}])