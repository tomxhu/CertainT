angular.module('App.services.Geolocation', [
    'App.services.Cordova'
])

    .factory('getCurrentPosition', function(deviceReady, $document, $window, $rootScope){
        return function(done) {
            deviceReady(function(){
                navigator.geolocation.getCurrentPosition(function(position){
                    $rootScope.$apply(function(){
                        //console.log(position);
                        done(position);
                    });
                }, function(error){
                    $rootScope.$apply(function(){
                        throw new Error('Unable to get position');
                    });
                });
            });
        };
    });