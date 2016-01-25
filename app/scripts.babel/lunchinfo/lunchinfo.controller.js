'use strict';

angular.module('playground').controller('LunchInfoController', LunchInfoController);

/*@ngInject*/
function LunchInfoController($scope, $stateParams) {
  console.log($scope);
  console.log($stateParams);
}

