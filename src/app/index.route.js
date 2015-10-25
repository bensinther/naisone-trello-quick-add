(function() {
  'use strict';

  angular
    .module('n1ElectronTrelloTodo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/todo/todo.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
