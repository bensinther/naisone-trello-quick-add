(function() {
  'use strict';

  angular
    .module('n1ElectronTrelloTodo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
