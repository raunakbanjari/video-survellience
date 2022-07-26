stats = "";
video = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(480 , 380);
    canvas.center();

}

function start(){
    objectDetector = ml5.objectDetector('cocoSSD' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}
function draw(){
    image(video , 0 , 0 , 480 , 380);

    if(stats != ""){
        objectDetector.detect(video , got_results);
        

        for(i = 0 ; i < objects.length ; i++){
            console.log(objects);
            document.getElementById("no_of_objects").innerHTML = "Number of Objects Detected : " + objects.length;
        document.getElementById("status").innerHTML = "Objects Detected!"
        percent = floor(objects[i].confidence * 100);
        fill('red');
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
        stroke('red');
        noFill();
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

}
function modelLoaded(){
    console.log("model loaded");
    stats = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function stop_video(){
    video.stop();
}
function pause(){
    video.pause();
}
function got_results(error , results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
