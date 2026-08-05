var bloodApp = angular.module("bloodApp", []);

bloodApp.controller("bloodController", function ($scope) {
  var donors = JSON.parse(localStorage.getItem("donors")) || [];
  var groupNames = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  $scope.bloodGroups = [];

  for (var i = 0; i < groupNames.length; i++) {
    var name = groupNames[i];
    var count = 0;

    for (var j = 0; j < donors.length; j++) {
      if (donors[j].bloodGroup === name) {
        count++;
      }
    }

    $scope.bloodGroups.push({ name: name, count: count });
  }
});
