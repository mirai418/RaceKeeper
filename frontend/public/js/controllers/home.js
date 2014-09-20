angular.module("raceKeeperApp")

.controller("HomeCtrl", [ "$scope", "$timeout", function ($scope, $timeout) {

  console.log("HomeCtrl");

  var fakeRaces = {
    ican: [
      {
        distance: 3214,
        start_time: "2014-05-01",
        end_time: "2014-05-01"
      },
      {
        distance: 6231,
        start_time: "2014-05-03",
        end_time: "2014-05-03"
      },
      {
        distance: 1003,
        start_time: "2014-05-05",
        end_time: "2014-05-05"
      },
      {
        distance: 4325,
        start_time: "2014-05-08",
        end_time: "2014-05-08"
      },
      {
        distance: 3214,
        start_time: "2014-05-11",
        end_time: "2014-05-11"
      },
      {
        distance: 6231,
        start_time: "2014-05-13",
        end_time: "2014-05-13"
      },
      {
        distance: 1003,
        start_time: "2014-05-15",
        end_time: "2014-05-15"
      },
      {
        distance: 4325,
        start_time: "2014-05-17",
        end_time: "2014-05-17"
      },
      {
        distance: 3214,
        start_time: "2014-05-20",
        end_time: "2014-05-20"
      },
      {
        distance: 6231,
        start_time: "2014-05-21",
        end_time: "2014-05-21"
      },
      {
        distance: 1003,
        start_time: "2014-05-25",
        end_time: "2014-05-25"
      },
      {
        distance: 4325,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
    ],
    makagawa: [
      {
        distance: 5532,
        start_time: "2014-05-01",
        end_time: "2014-05-01"
      },
      {
        distance: 10232,
        start_time: "2014-05-02",
        end_time: "2014-05-02"
      },
      {
        distance: 1021,
        start_time: "2014-05-03",
        end_time: "2014-05-03"
      },
      {
        distance: 1341,
        start_time: "2014-05-05",
        end_time: "2014-05-05"
      },
      {
        distance: 3214,
        start_time: "2014-05-10",
        end_time: "2014-05-10"
      },
      {
        distance: 6231,
        start_time: "2014-05-26",
        end_time: "2014-05-26"
      },
      {
        distance: 1003,
        start_time: "2014-05-27",
        end_time: "2014-05-27"
      },
      {
        distance: 4325,
        start_time: "2014-05-30",
        end_time: "2014-05-30"
      },
    ],
    mp: [
      {
        distance: 2144,
        start_time: "2014-05-15",
        end_time: "2014-05-15"
      },
      {
        distance: 2345,
        start_time: "2014-05-16",
        end_time: "2014-05-16"
      },
      {
        distance: 3214,
        start_time: "2014-05-17",
        end_time: "2014-05-17"
      },
      {
        distance: 6231,
        start_time: "2014-05-20",
        end_time: "2014-05-20"
      },
      {
        distance: 1003,
        start_time: "2014-05-21",
        end_time: "2014-05-21"
      },
      {
        distance: 4325,
        start_time: "2014-05-30",
        end_time: "2014-05-30"
      },
    ]
  };

  $timeout(function () {
    $scope.races = fakeRaces;
  }, 10);

}])