
let images = [];
let xSensitivity = 0.5;

fetch("assets/frames.tar").then(response => {
    return response.arrayBuffer();
})
    .then(buffer => untar(buffer))
    .then(files => {
        files.forEach((file) => {
            let img = new Image();
            img.src = URL.createObjectURL(new Blob([file.buffer]));
            images.push(img);

        });
    });

let div = document.querySelector(".flipbook");


let frame = () => {
    if(images.length === 0){
        window.requestAnimationFrame(frame);
        return;
    }
    let img = images[currentFrame];
    div.style.backgroundImage = `url(${img.src})`;
    
    
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

let currentFrame = 0;

div.onmousedown = function(e) {
    document.onmousemove = function(e) {

        var delta = Math.ceil(e.movementX) / window.outerWidth;
         currentFrame -= (delta * images.length) * xSensitivity;
         currentFrame = Math.round(Math.max(0, Math.min(images.length - 1, currentFrame)));
    }


    document.onmouseup = function() {
        document.onmousemove = null; // remove mousemove to stop tracking
    }
};