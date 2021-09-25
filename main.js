resultarray = [];
function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(600,370);
    canvas.center();
    video.hide();
}

function start(){
    object = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "detecting objects";
}

function modelloaded(){
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video, 0, 0, 600, 370);
    if(status != ""){
        object.detect(video, gotresults);
        for(i=0; i< resultarray.length; i++){
            document.getElementById("status").innerHTML = "objects detected";
            document.getElementById("number").innerHTML = "number of objects detected =" + resultarray.length;
            noFill();
            stroke(random(255), random(255), random(255));
            rect(resultarray[i].x, resultarray[i].y, resultarray[i].width, resultarray[i].height);
            confid = floor(resultarray[i].confidence * 100);
            text(resultarray[i].label +" "+confid+"%", resultarray[i].x + 15, resultarray[i].y + 15);
        }
    }
}

function gotresults(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        resultarray = result;
    }
}