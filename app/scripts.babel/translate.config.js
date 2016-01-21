'use strict';

angular.module('playground').config(TranslateConfig);

/*@ngInject*/
function TranslateConfig($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: '/languages/',
    suffix: '.json'
  });
  
  $translateProvider.useSanitizeValueStrategy(null);
  
  $translateProvider.preferredLanguage('sv');
}