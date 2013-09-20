var controller = new Leap.Controller({enableGestures: true});


var circleCondition = false;

controller.on('frame', function(frame){
    if(frame.hands.length===2){
        circleCondition = true;
    }
    else{
        circleCondition = false;
    }
    if(frame.hands.length>=1){
        //console.log(frame.hands[0].sphereCenter);
    }
});
controller.on('gesture', function (gesture){
    if(!circleCondition && gesture.type === 'swipe'){
        handleSwipe(gesture);
    }
    else if(circleCondition && gesture.type === 'circle'){
        handleCircle(gesture);
    }
    else{
        if(!circleCondition && gesture.type === 'screenTap'){
            // Focus for usage

        }
        //console.log(gesture);
    }

});

function handleSwipe (swipe){
    var startFrameID;
    if(!timeoutActive && swipe.state === 'stop'){
        var directionHorizontal = swipe.direction[0];
        var left = directionHorizontal>.3;
        var right = -directionHorizontal>.3;

        //console.log("left/right",left,right,swipe.direction[0]);
        var up = swipe.direction[1]>.5;
        var down =  -swipe.direction[1]>.5;

        //console.log("up/down",up,down,swipe.direction[1]);

        if (left){
            Reveal.left();
        }else if(right){
            Reveal.right();
        }
        else if(up){
            Reveal.down();
        }
        else if(down){
            Reveal.up();
        }
        timeOut(650);
    }
}

function handleCircle (circle){
    var startFrameID;
    if(!timeoutActive && circle.state === 'stop'){
        Reveal.toggleOverview();
        timeOut(1000);
    }
}

var timeoutActive = false;
function timeOut(ms){
    timeoutActive = true;
    setTimeout(function(){
        timeoutActive = false;
    },ms)

}

controller.connect();