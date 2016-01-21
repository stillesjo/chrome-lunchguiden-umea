'use strict';
angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('test', {
        url: '/?date',
        // templateUrl: 'scripts/test/test.html',
        templateUrl: chrome.extension.getURL('scripts/test/test.html'),
        controller: TestController,
        resolve: {
            restaurants: function(restaurant, $stateParams) {
              var date = $stateParams.date || new Date().toLocaleDateString();
              return restaurant.get({datum: date});
            }
        }
    })
});


/*@ngInject*/
function TestController($scope, restaurants, date, $stateParams, $state) {

  $scope.restaurants = restaurants;
  $scope.dates = date;
  $scope.day = $stateParams.date || $scope.dates[0].date;
  $scope.isSelected = isSelected;
  $scope.dateChanged = dateChanged;
  
  function isSelected(date) {
    return $scope.day === date;
  }
  
  function dateChanged() {
    $state.go('test', {date: $scope.day});
  }
}