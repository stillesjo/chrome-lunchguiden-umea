'use strict';
/*@ngInject*/
/* global angular */
/*eslint semi: 2*/

angular.module('lunchguideUmea', [
  'ui.router',
  'ngResource',
  'ngMaterial',
])
.config(function($urlRouterProvider) {
  $urlRouterProvider
  .otherwise('/');
})
.config(function($mdThemingProvider) {
  // VK-blue = #007bc4
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
})
.filter('splitnewline', function() {
  return function(input) {
    return input
      .replace(/<br>/g, '')
      .split('\r\n')
      .filter(Boolean);
  };
})
.filter('translate', function() {
  return function(input) {
    const message = chrome.i18n.getMessage(input);
    console.log(input);
    console.log(message);
    return message || input;
  }
});
