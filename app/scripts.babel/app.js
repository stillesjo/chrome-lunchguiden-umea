'use strict';
/*@ngInject*/
angular.module('playground', ['ui.router']).config(function($urlRouterProvider) {
       $urlRouterProvider
      .otherwise('/');
});