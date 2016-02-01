'use strict';

/*@ngInject*/
angular.module('playground').factory('restaurant', function($resource) {
    return $resource('http://mega.vk.se/lunchguiden/export/lunchlist.php');
});
