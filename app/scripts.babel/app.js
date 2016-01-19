'use strict';
/*@ngInject*/
angular.module('playground', ['ui.router', 'ngResource']).config(function($urlRouterProvider) {
       $urlRouterProvider
      .otherwise('/');
});