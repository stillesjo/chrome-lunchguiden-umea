'use strict';
/*@ngInject*/
/* global angular */
/*eslint semi: 2*/

angular.module('playground', [
  'ui.router',
  'ngResource',
  'ngMaterial'
])
.config(function($urlRouterProvider) {
       $urlRouterProvider
      .otherwise('/');
})
.filter('splitnewline', function() {
  return function(input) {
    return input
      .replace(/<br>/g, '')
      .split('\r\n')
      .filter(Boolean);
  };
});
