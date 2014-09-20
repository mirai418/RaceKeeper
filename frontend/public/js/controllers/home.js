angular.module("raceKeeperApp")

.controller("HomeCtrl", [ "$scope", "$timeout", function ($scope, $timeout) {

  console.log("HomeCtrl");

  var fakeRaces = {
    makagawa: [
      {
        distance: 3214,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 6231,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 1003,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 4325,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      }
    ],
    icanberk: [
      {
        distance: 5532,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 10232,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 1021,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 1341,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      }
    ],
    mp: [
      {
        distance: 2144,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 2345,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      }
    ]
  };

  $timeout(function () {
    $scope.races = fakeRaces;
  }, 1000);

}])