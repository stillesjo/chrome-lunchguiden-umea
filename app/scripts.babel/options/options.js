'use strict';

angular.module('playground-options',[
  'ui.router',
  'ngMaterial',
  'LocalStorageModule'
]).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
 .otherwise('/');

  $stateProvider.state('options', {
    url: '/',
    templateUrl: chrome.extension.getURL('scripts/options/options.html'),
    controller: OptionsController,
  })
}).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('red');
})


/* @ngInject */
function OptionsController($scope, $mdToast) {
  $scope.apply = apply;
  chrome.storage.sync.get("reminder", function(result) {
    $scope.reminder = result.reminder;
  })

  function apply() {
    chrome.storage.sync.set({reminder: $scope.reminder},
      function() {
        $mdToast.show($mdToast.simple({textContent: 'Saved!'}));
      });
  }
}
