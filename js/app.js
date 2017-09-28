var myApp = angular.module('myApp', [
    'ui.router',
    'userControllers'
]);

myApp.config(function($stateProvider) {
    var formState = {
      name: 'form',                             // The state is named form
      url: '/form',                             // When the state is active, the browser's ulr will be /form
      templateUrl: 'partials/form.html',         // When the state is active, this view will be loaded into a viewport
      controller : 'UserFormController'         // Controller page.
    }
    
    var confirmationState = {
        name: 'confirmation',
        url : '/confirmation',
        templateUrl: 'partials/confirmation.html',
        controller : 'ConfirmationController'
    }

    var listState = {
      name: 'list',
      url: '/list',
      templateUrl: 'partials/list.html',
      controller : 'UserListController',
    
    }
  
    $stateProvider.state(formState);
    $stateProvider.state(confirmationState);
    $stateProvider.state(listState);
  });

myApp.factory('myFactory', function() {
    var savedData = {}
    function set(data) {
      savedData = data;
    }
    function get() {
     return savedData;
    }
   
    return {
     set: set,
     get: get
    }
   
   });

/*

****************************************This is ngRoute example*************************************************

var myApp = angular.module('myApp', [
    'ngRoute',
    'userControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/form', {
        templateUrl : 'partials/form.html',
        controller  : 'UserFormController'
    }).
    when('/list', {
        templateUrl : 'partials/list.html',
        controller  : 'UserListController' 
    }).
    otherwise({
        redirectTo: '/form'
    });
}]);
*****************************************************************************************************************
*/