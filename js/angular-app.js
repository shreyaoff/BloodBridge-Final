var bloodApp = angular.module("bloodApp", []);

bloodApp.controller("bloodController", function ($scope) {
  var donors = JSON.parse(localStorage.getItem("donors")) || [];
  var groupNames = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  $scope.bloodGroups = groupNames.map(function (name) {
    var count = 0;
    for (var i = 0; i < donors.length; i++) {
      if (donors[i].bloodGroup === name) count++;
    }
    return { name: name, count: count };
  });
});
