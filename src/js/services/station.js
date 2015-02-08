angular.module('App.services.Station', [])

    .factory('getStation', function($http){
        return function(lat, lon, done) {
            $http({method: 'GET', url: 'http://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key=lRCjEwqkJE6nRPbtNFUAMQ&lat=' + lat +
                                        '&lon=' + lon + '&format=json'})
                .success(function(data, status, headers, config) {
                    done(data);
                })
                .error(function(data, status, headers, config) {
                    throw new Error('Unable to get station');
                });
        };
    });