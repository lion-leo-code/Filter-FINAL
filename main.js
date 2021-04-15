maskX = 0;
maskY = 0;
glassX = 0;
glassY = 0;
function preload(){
    mask = loadImage('https://i.postimg.cc/1zpPfVbd/mask.png');
    glass = loadImage('https://i.postimg.cc/BnL5s0th/shieldglasses.png');
}
function setup(){
    canvas = createCanvas(700, 500);
    canvas.position(400, 225);
    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function take_snapshot(){
    save('myFilterImg.png');
}
function draw(){
    image(video, 0, 0, 700, 500);
    image(mask, maskX - 100, maskY - 60, 200, 200);
    image(glass, glassX - 72, glassY - 50, 230, 130);
}
function modelLoaded(){
    console.log("PoseNet Initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        maskX = results[0].pose.nose.x;
        maskY = results[0].pose.nose.y;
        console.log("mask x = " + maskX);
        console.log("mask y = " + maskY);

        glassX = results[0].pose.rightEye.x;
        glassY = results[0].pose.rightEye.y;
        console.log("glasses x = " + glassX);
        console.log("glasses y = " + glassY);
    }
}
