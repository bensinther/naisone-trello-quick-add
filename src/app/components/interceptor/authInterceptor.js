// register the interceptor as a service
angular.module('n1ElectronTrelloTodo').factory('authInterceptor', function ($q) {
  return {
    // optional method
    'request': function(config) {
      // do something on success

      return config;
    },

    // optional method
    'requestError': function(rejection) {
      // do something on error
      return $q.reject(rejection);
    },

    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
    'responseError': function(rejection) {
      if(rejection.data == "invalid token") {
        //$rootScope.$brosadcast('token:invalid'); //TODO: direkter Zugriff auf TrelloService nicht möglich, da sonst circular dependency
      }
      return $q.reject(rejection);
    }
  };
}).config(function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
});
