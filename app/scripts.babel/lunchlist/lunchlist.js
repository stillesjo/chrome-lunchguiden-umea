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

  // Data
  $scope.restaurants = restaurants;
  $scope.dates = date;
  $scope.day = $stateParams.date || $scope.dates[0].format('L');
  $scope.appname = chrome.i18n.getMessage('appName')

  // Functions
  $scope.isSelected = isSelected;
  $scope.dateChanged = dateChanged;
  $scope.showLunchInfo = showLunchInfo;
  $scope.info = goToInfo;
  $scope.openLunchguiden = openLunchguiden;

  function isSelected(date) { return $scope.day === date; }

  function dateChanged() { $state.go('lunchlist', {date: $scope.day}); }

  function showLunchInfo(lunch, event) { $state.go('lunchinfo', {lunch: lunch}); }

  function goToInfo() { $state.go('info'); }

  function openLunchguiden() {
    chrome.tabs.create({ 'url': 'http://mega.vk.se/lunchguiden' });
  }
}
