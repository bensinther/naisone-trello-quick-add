(function() {
  'use strict';

  angular
    .module('n1ElectronTrelloTodo')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 1500;
    toastrConfig.positionClass = 'toast-bottom-right';

    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $mdThemingProvider.theme('default')
      .primaryPalette('lime')
      .accentPalette('orange');
  }
})();
