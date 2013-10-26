angular.module("angular-leap")
    .controller('newScope', function ($scope) {
        $scope.left = Reveal.left;
        $scope.up = Reveal.up;
        $scope.down = Reveal.down;
        $scope.right = Reveal.right;
        $scope.circel = function($gesture){
            if($gesture.radius > 100){
                Reveal.toggleOverview();
            }

        }

    });


