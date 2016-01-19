'use strict';
angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('test', {
        url: '/',
        templateUrl: chrome.extension.getURL('scripts/test/test.html'),
        controller: TestController,
        resolve: {
            restaurants: function(restaurant) {
                return restaurant.get();
            }
        }
    })
});


/*@ngInject*/
function TestController($scope, restaurants) {
    console.log(restaurants);
    $scope.restaurants = restaurants;
}