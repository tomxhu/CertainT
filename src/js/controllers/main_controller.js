angular.module('App.controllers.Main', [
    'App.services.Geolocation',
    'App.services.Station',
    'App.services.Prediction'
])

    .controller('MainController', function($scope, $interval, getCurrentPosition, getStation, getPrediction){
        document.addEventListener('deviceready', function () {
            $scope.watch = 0;

            var int = 0;

            function onSuccess(position) {

                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
                getStation(position.coords.latitude, position.coords.longitude, function(data){
                    if (data.stop[0].distance < 100) {
                        $scope.station = data.stop[0].parent_station_name;
                        getPrediction(data.stop[0].parent_station, function(southBound, northBound){
                            console.log(southBound);
                            console.log(northBound);
                            $scope.southBound = southBound;
                            $scope.northBound = northBound;

                            var message = "Northbound: " + northBound.slice(0,2).toString() +
                                            "\nSouthbound: " + southBound.slice(0,2).toString();

                            window.plugin.notification.local.add({
                                //id:         1,  // A unique id of the notifiction
                                message:    message,  // The message that is displayed
                                title:      "You're near: " + $scope.station,  // The title of the message
                            });


                        });
                    }
                });

                $scope.watch +=1;

            }
            function onError(error) {
                console.log('err');
                alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
            }
            //var options = {maximumAge:500, frequency: 10000, timeout:100000, enableHighAccuracy:true};
            //var navID = navigator.geolocation.watchPosition(onSuccess, onError, options);
            navigator.geolocation.getCurrentPosition(onSuccess);
            var id = $interval(function(){navigator.geolocation.getCurrentPosition(onSuccess)}, 1000*3*60);


        });
    });






