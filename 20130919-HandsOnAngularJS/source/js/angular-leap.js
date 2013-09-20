angular.module("leap", []);

angular.module("leap")
    .service('leap', function () {
        if (angular.isUndefined(Leap)) {
            throw new Error("You should include LeapJS Native JavaScript API");
        }
        var controller = new Leap.Controller();
        controller.connect();
        return controller;
    });

angular.module("leap")
    .directive('leapSwipeLeft', function ($timeout, $parse, leap) {
        return {
            restrict: 'A',
            link    : function (scope, elem, attr) {
                var directiveName = "leapSwipeLeft";

                var timeoutActive = false;

                function timeOut(ms) {
                    timeoutActive = true;
                    $timeout(function () {
                        timeoutActive = false;
                    }, ms)
                };

                var execute = function () {
                    scope.$apply(function () {
                        $parse(attr[directiveName])(scope);
                    });
                };


                function handleSwipe(swipe) {
                    if (!timeoutActive && swipe.state === 'stop') {
                        if (swipe.direction[0] > 0) {
                            execute();
                        }
                        else {
                            // right
                        }
                        timeOut(650);
                    }
                }


                leap.on('gesture', function (gesture) {
                    if (gesture.type === 'swipe') {
                        handleSwipe(gesture);
                    }
                });

            }
        };
    });


angular.module("leap")
    .directive('leapScreenTap', function ($timeout, $parse, leap) {
        return {
            restrict: 'A',
            link    : function (scope, elem, attr) {
                var directiveName = "leapScreenTap";

                var timeoutActive = false;

                function timeOut(ms) {
                    timeoutActive = true;
                    $timeout(function () {
                        timeoutActive = false;
                    }, ms)
                };

                var execute = function () {
                    scope.$apply(function () {
                        $parse(attr[directiveName])(scope);
                    });
                };


                function handleSwipe(swipe) {
                    if (!timeoutActive && swipe.state === 'stop') {
                        execute();
                        //timeOut(650);
                    }
                }


                leap.on('gesture', function (gesture) {
                    if (gesture.type === 'screenTap') {
                        handleSwipe(gesture);
                    }
                });

            }
        };
    });




angular.module("leap")
    .controller('newScope', function ($scope) {});