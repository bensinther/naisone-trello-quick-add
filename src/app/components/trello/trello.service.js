(function () {
  'use strict';

  /* global Trello:false, angular: false*/

  //example URL for Trello API
  //https://api.trello.com/1/boards/4eea4ffc91e31d1746000046/lists?cards=open&card_fields=name&fields=name&key=[application_key]&token=[optional_auth_token]

  angular
    .module('n1ElectronTrelloTodo')
    .service('TrelloService', TrelloService);

  /** @ngInject */
  function TrelloService($http, localStorageService, $window, $q, $log) {

    ////////////////////////// Setup

    var apiHost = 'https://api.trello.com/1/';
    var apiKey = '6bac3f4652664d397ed2d1b6a0ab649d';
    var userState = {
      isAuthorized: false,
      selectedBoardId: localStorageService.get('selectedBoardId') || null,
      selectedListId: localStorageService.get('selectedListId') || null
    };

    var service = {
      getBoards: getBoards,
      authorize: authorize,
      getLists: getLists,
      addCard: addCard,
      resetLists: resetLists,
      userState: userState
    };

    return service;

    ////////////////////////// API

    function authorize() {

      var defer = $q.defer();

      Trello.authorize({
        type: "popup",
        name: 'Naisone\'s Trello Quick Add',
        scope: {
          read: true,
          write: true
        },
        expiration: "never",
        success: function success() {
          userState.isAuthorized = true;
          $log.info("user successfully authorized");
          defer.resolve();
        },
        error: function error() {
          userState.isAuthorized = false;
          delete $window.localStorage.trello_token;
          $log("unable to authorize user");
          defer.reject();
        }
      });

      return defer.promise;
    }

    //function getBoards(token) { //not needed to pass token as parameter (did it for testing)
    function getBoards() {

      var token = $window.localStorage.trello_token;

      if(token != null) {
        return $http({
          method: 'GET',
          url: apiHost + 'members/me/boards?key=' + apiKey + '&token=' + token
        });
      }
      else {
        authorize();
      }
    }

    function getLists() {

      var boardId = localStorageService.get('selectedBoardId');
      var token = $window.localStorage.trello_token;

      return $http({
        method: 'GET',
        url: apiHost + 'boards/' + boardId + '/lists' + '?key=' + apiKey + '&token=' + token
      });
    }

    function addCard(name, desc) {

      var listId = localStorageService.get('selectedListId');
      var token = $window.localStorage.trello_token;

      return $http({
        method: 'POST',
        url: apiHost + 'lists/' + listId + '/cards' + '?key=' + apiKey + '&token=' + token,
        params: {
          name: name,
          desc: desc
        }
      });
    }

    function resetLists() {
      localStorageService.set('selectedListId', null);
      userState.selectedListId = null;
    }
  }
})();
