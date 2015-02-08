angular.module('App.controllers.Main', [
    'App.services.Geolocation',
    'App.services.Station',
    'App.services.Prediction'
])

    //.controller('MainController', function($scope, getCurrentPosition, getStation, getPrediction){
    //    document.addEventListener('deviceready', function () {
    //        $scope.watch = 0;
    //
    //        var int = 0;
    //
    //        function onSuccess(position) {
    //            $scope.watch += 1;
    //            $scope.lat = position.coords.latitude;
    //            $scope.lon = position.coords.longitude;
    //
    //            getStation(position.coords.latitude, position.coords.longitude, function(data){
    //                if (data.stop[0].distance < 100) {
    //                    $scope.station = data.stop[0].parent_station_name;
    //                    getPrediction(data.stop[0].parent_station, function(southBound, northBound){
    //                        console.log(southBound);
    //                        console.log(northBound);
    //                        $scope.southBound = southBound;
    //                        $scope.northBound = northBound;
    //
    //                        window.plugin.notification.local.add({
    //                            id:         "notifications",  // A unique id of the notifiction
    //                            message:    southBound.toString(),  // The message that is displayed
    //                            title:      "test",  // The title of the message
    //                        });
    //                    });
    //
    //                }
    //                console.log(data);
    //
    //            });
    //
    //        };
    //        function onError(error) {
    //            console.log('err');
    //            alert('code: '    + error.code    + '\n' +
    //            'message: ' + error.message + '\n');
    //        }
    //
    //        var intervalID = window.setInterval(navigator.geolocation.getCurrentPosition, 10000);
    //
    //    });
    //});

    .controller('MainController', function($scope, $interval, getCurrentPosition, getStation, getPrediction){
        document.addEventListener('deviceready', function () {
            $scope.watch = 0;

            var int = 0;

            function onSuccess(position) {
                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
                getStation(position.coords.latitude, position.coords.longitude, function(data){
                    if (data.stop[0].distance < .25) {
                        $scope.station = data.stop[0].parent_station_name;
                        getPrediction(data.stop[0].parent_station, function(southBound, northBound){
                            console.log(southBound);
                            console.log(northBound);
                            $scope.southBound = southBound;
                            $scope.northBound = northBound;

                            window.plugin.notification.local.add({
                                id:         "notifications",  // A unique id of the notifiction
                                message:    southBound.toString(),  // The message that is displayed
                                title:      "test",  // The title of the message
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
            var id = $interval(function(){navigator.geolocation.getCurrentPosition(onSuccess)}, 1000);

        });
    });




//getCurrentPosition(function(position){
//    $scope.lat = position.coords.latitude;
//    $scope.lon = position.coords.longitude;
//    getStation(position.coords.latitude, position.coords.longitude, function(data){
//        console.log(data);
//        $scope.station = data.stop[0].parent_station_name;
//        getPrediction(data.stop[0].parent_station, function(southBound, northBound){
//            console.log(southBound);
//            console.log(northBound);
//            $scope.southBound = southBound;
//            $scope.northBound = northBound;
//
//        })
//    });
//});
//





