angular.module("rboehmAngularSlides", ['angular-leap'])
    .directive('section',function(){
        return{
            restrict: 'E',
            scope:true
        }
    });