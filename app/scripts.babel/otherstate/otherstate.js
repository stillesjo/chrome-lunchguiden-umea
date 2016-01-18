'use strict';

angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('otherstate', {
        url: '/hej',
        template: '<h2>Other content</h2>'
    }) 
});