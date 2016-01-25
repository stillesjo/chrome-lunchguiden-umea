'use strict';
/*@ngInject*/
/* global angular */
/*eslint semi: 2*/


angular.module('playground', [
  'ui.router',
  'ngResource',
  'ngMaterial',
  'pascalprecht.translate'
]).config(function($urlRouterProvider) {
       $urlRouterProvider
      .otherwise('/');
}).filter('splitnewline', function() {
  return function(input) {
    return input
      // .replace(/\*/g, '')
      .replace(/<br>/g, '')
      .split('\r\n')
      .filter(Boolean);
  };
});