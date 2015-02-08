angular.module('App', [
  'ngRoute',
  'mobile-angular-ui',
  'App.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});