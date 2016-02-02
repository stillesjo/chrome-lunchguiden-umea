'use strict';
angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('lunchlist', {
        url: '/?date',
        templateUrl: chrome.extension.getURL('scripts/lunchlist/lunchlist.html'),
        controller: LunchlistController,
        resolve: {
            restaurants: function(restaurant, $stateParams, date) {
              var d = $stateParams.date || date[0].format('L');
              return restaurant.get({datum: d});
            }
        }
    })
});


/*@ngInject*/
function LunchlistController($scope, $stateParams, $state, $mdDialog, restaurants, date) {

  $scope.restaurants = restaurants;
  $scope.dates = date;
  $scope.day = $stateParams.date || $scope.dates[0].format('L');
  $scope.isSelected = isSelected;
  $scope.dateChanged = dateChanged;
  $scope.showLunchInfo = showLunchInfo;
  $scope.info = goToInfo;
  $scope.openSource = openSource;

  function isSelected(date) {
    return $scope.day === date;
  }

  function dateChanged() {
    $state.go('lunchlist', {date: $scope.day});
  }

  function showLunchInfo(lunch, event) {
    $state.go('lunchinfo', {lunch: lunch});
  }

  function goToInfo() {
    console.log('Going to info!');
    $state.go('info');
  }

  function openSource() {
    chrome.tabs.create({
      'url': 'http://mega.vk.se/lunchguiden'
    })
  }
}
