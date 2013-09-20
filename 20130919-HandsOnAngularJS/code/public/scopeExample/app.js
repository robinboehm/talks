var app = angular.module('scopes', []);


app.controller('AppCtrl', function ($scope) {
    $scope.frameworks = [
        {
            name: "AngularJS",
            tags: ["JavaScript", "MVVM","Google"]
        },
        {
            name: "Ember",
            tags: ["JavaScript", "MVVM"]
        },
        {
            name: "Knockout",
            tags: ["JavaScript", "MVC"]
        }
    ];

    $scope.selectedFramework = $scope.frameworks[0];

    $scope.handleClick = function(framework){
        console.log($scope.frameworks);
        console.log($scope.selectedFramework);
        console.log(framework);

        $scope.selectedFramework=framework;

    }
});

app.controller('HeadCtrl', function ($scope) {
    //$scope.title = $scope.site.title;
});

app.controller('DetailsCtrl', function ($scope) {
    //$scope.title = $scope.site.title;
});

app.controller('ListCtrl', function ($scope) {


});

app.controller('FooterCtrl', function ($scope) {

});

