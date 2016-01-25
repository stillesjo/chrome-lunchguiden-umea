'use strict';

angular.module('playground').config(LunchinfoState);

/*@ngInject*/
function LunchinfoState($stateProvider) {
  $stateProvider.state('lunchinfo', {
    url: '/info',
    controller: 'LunchInfoController',
    templateUrl: chrome.extension.getURL('scripts/lunchinfo/lunchinfo.html'),
    params: {
      lunch: null,
    }
  })
}