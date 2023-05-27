let $spacer = document.querySelector('.spacer');
let $video = document.querySelector('.video');

// The height of the spacer element
let spacerHeight = $spacer.clientHeight;
// the height of the viewport
let viewportHeight = document.documentElement.getBoundingClientRect().height

// We can get the total scrollable height be subtracting the spacer element's height by the viewport height
let scrollableHeight = spacerHeight - viewportHeight;
// Get the full duration of the video
let videoDuration;
// Keep track the video's playtime

// The scroll event handler



let seeking = false;

$video.addEventListener('seeking', function () {
    seeking = true;
});

$video.addEventListener('seeked', function () {
    seeking = false;
});

function tick(lastKnownScrollPosition) {

    if (!seeking) $video.currentTime = (lastKnownScrollPosition / scrollableHeight) * videoDuration;
}

let ticking = false;

window.addEventListener('scroll', function (e) {
    const lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            tick(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});
// Do stuff when the video is ready to play
$video.addEventListener('loadeddata', function handleLoadedData(event) {
        // Get the full video duration
        videoDuration = $video.duration;
        // Do stuff when user scrolls
    }
);

