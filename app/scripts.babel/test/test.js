'use strict';
angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('test', {
        url: '/?date',
        // templateUrl: 'scripts/test/test.html',
        templateUrl: chrome.extension.getURL('scripts/test/test.html'),
        controller: TestController,
        resolve: {
            restaurants: function(restaurant, $stateParams, date) {
              console.log(date);
              var d = $stateParams.date || date[0].format('L');
              return restaurant.get({datum: d});
            }
        }
    })
});


/*@ngInject*/
function TestController($scope, $stateParams, $state, $mdDialog, restaurants, date) {

  $scope.restaurants = restaurants;
  $scope.dates = date;
  $scope.day = $stateParams.date || $scope.dates[0].format('L');
  $scope.isSelected = isSelected;
  $scope.dateChanged = dateChanged;
  $scope.showLunchInfo = showLunchInfo;

  function isSelected(date) {
    return $scope.day === date;
  }

  function dateChanged() {
    console.log('Date changed')
    console.log($scope.day);
    $state.go('test', {date: $scope.day.format('L')});
  }

  function showLunchInfo(lunch, event) {
    $state.go('lunchinfo', {lunch: lunch});
  }
}
