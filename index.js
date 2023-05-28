let $spacer = document.querySelector('.spacer');
let $video = document.querySelector('.video');

// The height of the spacer element
let spacerHeight = $spacer.clientHeight;
// the height of the viewport
let viewportHeight = document.documentElement.getBoundingClientRect().height


let pageFrames  = [0,132,242,411,655];


let frameVelocity = 0;
let dragSensitivity = 5;
let maxDragVelocity = 5;
let gravityStrength = 0.01;
let frameCount = 1;

let videoDuration = 1;

let currentFrame = 0;

let seeking = false;


$video.addEventListener('loadeddata', function handleLoadedData(event) {
        // Get the full video duration
        videoDuration = $video.duration;
        frameCount =  Math.ceil($video.duration * 29.97);
        $video.currentTime = 0;
        // Do stuff when user scrolls
    }
);

$video.addEventListener('seeking', function () {
    seeking = true;
});

$video.addEventListener('seeked', function () {
    seeking = false;
    setTimeout(function () {
        beginTick(0)
    },30);
});


let ticking = false;
let startpos, startval;

window.onmousedown = function(e) {
    startpos = e.clientX;
    startval = currentFrame;
    if (isNaN(startval)) startval = 0;
    document.onmousemove = function(e) {
        if(ticking){
            return;
        }
        var delta = Math.ceil(e.clientX - startpos) / window.outerWidth;
        handleInput(delta);
        //beginTick(delta);
    }

    
    document.onmouseup = function() {
        document.onmousemove = null; // remove mousemove to stop tracking
    }
};


function tick() {

    
    if (!seeking) $video.currentTime = (currentFrame / frameCount) * videoDuration;
    
}
function  beginTick(delta){
    if(ticking){
        return;
    }
    
    ticking = true;

    console.log(frameVelocity);
    frameVelocity += ((nearestPageIndex(currentFrame) - currentFrame) ) * gravityStrength;
    frameVelocity *= 0.96;
    const newFrame = currentFrame + frameVelocity;
    currentFrame = Math.round(Math.max(0, Math.min(frameCount, newFrame)));
    if(isNaN(currentFrame)){
        currentFrame = 0;
    }

    window.requestAnimationFrame(function () {
        tick();
        ticking = false;
    });
}
function handleInput(delta){
    const inputValue =  -delta * dragSensitivity;
    frameVelocity += Math.max(-maxDragVelocity, Math.min(maxDragVelocity, inputValue));
}


function nearestPageIndex(currentPage){
    return pageFrames.reduce(function(prev, curr) {
        return (Math.abs(curr - currentPage) < Math.abs(prev - currentPage) ? curr : prev);
    }
    );
}

