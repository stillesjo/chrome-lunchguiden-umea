'use strict';
angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('test', {
        url: '/',
        template: '<h2>Hejsan state 2!</h2>',
    })
});