'use strict';

angular.module('playground-options',[
  'ui.router',
  'ngMaterial',
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
function OptionsController($scope) {

}
