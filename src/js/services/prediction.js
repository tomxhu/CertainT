angular.module('App.services.Prediction', [])

    .factory('getPrediction', function($http){
        return function(station, done) {
            $http({method: 'GET', url: 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=lRCjEwqkJE6nRPbtNFUAMQ&stop=' + station + '&format=json'})
                .success(function(data, status, headers, config) {
                    var routes = data.mode[0].route
                    //console.log(routes)
                    var southBound = [];
                    var northBound = [];

                    routes.forEach(function(route){
                        //console.log(route);
                        var directions = route.direction
                        directions.forEach(function(direction){

                            if (direction.direction_name == "Southbound") {
                                direction.trip.forEach(function (trip) {
                                    //console.log(trip);
                                    //console.log(trip.pre_away);
                                    southBound.push(Math.round(trip.pre_away/60))
                                    southBound.sort(function(a, b){
                                        return a-b;
                                    })

                                })
                            } else {
                                direction.trip.forEach(function(trip){
                                    northBound.push(Math.round(trip.pre_away/60))
                                    northBound.sort(function(a, b){
                                        return a-b;
                                    })

                                })
                            }

                        });

                    });
                    southBound = southBound.map(function(a){
                        return " " + a + " min"
                    })

                    northBound = northBound.map(function(a){
                        return " " + a + " min"
                    })

                    done(southBound, northBound);
                })
                .error(function(data, status, headers, config) {
                    throw new Error('Unable to get prediction');
                });
        };
    });