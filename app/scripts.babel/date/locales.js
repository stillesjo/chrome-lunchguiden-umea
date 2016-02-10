'use strict';

(function() {
  angular.module('playground').config(function() {
    moment.locale(chrome.i18n.getUILanguage());
  })
})()
