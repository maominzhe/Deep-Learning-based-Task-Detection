var video=document.querySelector("#videoElement");

navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia
    ||navigator.mozGetUser||navigator.msGetUser||navigator.oGetUserMedia;

if (navigator.getUserMedia) {
        navigator.getUserMedia({video:true},handleVideo,videoError);
}
function handleVideo(stream){
        video.srcObject=stream;
        video.play();
}

function videoError(e) {

}