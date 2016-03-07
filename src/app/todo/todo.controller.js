(function () {
  'use strict';

  angular
    .module('n1ElectronTrelloTodo')
    .controller('TodoController', TodoController);

  function TodoController($scope, TrelloService, localStorageService, toastr, $log, $window) {

    var vm = this;

    ////////////////////////// UI / View Bindings

    vm.boards = []; //boards to select
    vm.lists = []; //filled when a board is selected

    vm.title = null;
    vm.desc = null;

    vm.trelloService = TrelloService;

    vm.getBoards = getBoards;
    vm.authorize = authorize;
    vm.addCard = addCard;
    vm.onBoardChanged = onBoardChanged;
    vm.onListChanged = onListChanged;
    vm.reset = reset;

    ////////////////////////// Init

    init();

    ////////////////////////// Implementation

    function init() {
      authorize();
      //getBoards();
    }

    function getBoards() {
      TrelloService.getBoards()
        .then(function (result) {
          vm.boards = result.data;
        })
        .then(function () {
          getLists();
        })
        .catch(function (error) {
          $log.info("error: " + error);
        });
    }

    function authorize() {
      TrelloService.authorize().then(function () {
        getBoards();
      });
    }

    function addCard(form) {

      if (form.$invalid) {
        toastr.alert('Please fill required fields');
        return;
      }

      if (vm.desc == null) {
        vm.desc = "Added via Naisone\'s Trello Quick Add";
      }

      TrelloService.addCard(vm.title, vm.desc)
        .then(function () {
          vm.title = null;
          vm.desc = null;
          form.$setPristine();
          form.$setUntouched();
          toastr.success('Card added');
        });
    }

    function getLists() {

      vm.lists = null; //TODO: necessary?

      TrelloService.getLists()
        .then(function (result) {
          vm.lists = result.data;
        })
    }

    function resetLists() {
      TrelloService.resetLists(); //TODO needed?
    }

    function reset() {
      delete $window.localStorage.trello_token;
      vm.trelloService.userState.isAuthorized = false;
    }

    ////////////////////////// Broadcast / Listener / Watcher

    function onBoardChanged() {
      var newValue = vm.trelloService.userState.selectedBoardId;
      $log.info("changed selectedBoardId to: " + newValue);
      localStorageService.set('selectedBoardId', newValue);
      resetLists();
      getLists();
    }

    function onListChanged() {
      var newValue = vm.trelloService.userState.selectedListId;
      $log.info("changed selectedListId to: " + newValue);
      localStorageService.set('selectedListId', newValue);
    }

  }
})();
