manoix = 0;
manoiy = 0;
manodx = 0;
manody = 0;
resultadomd = 0;
resultadomi = 0;
musica = "";

function preload(){
    musica = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloded);
    posenet.on('pose', gotposes);
}

function draw(){
    image(video, 0, 0, 600, 450);
    fill("#4672FD");
    stroke("#4672FD");
    if(resultadomd > 0.2){
        circle(manodx, manody, 20);
        if(manody >0 && manody<= 100){
            document.getElementById("texto_velocidad").innerHTML = "Velocidad = 0.5x";
            musica.rate(0.5);
        }else if(manody >90 && manody<= 180){
            document.getElementById("texto_velocidad").innerHTML = "Velocidad = 1x";
            musica.rate(1);
        }else if(manody >180 && manody<= 270){
            document.getElementById("texto_velocidad").innerHTML = "Velocidad = 1.5x";
            musica.rate(1.5);
        }else if(manody >270 && manody<= 360){
            document.getElementById("texto_velocidad").innerHTML = "Velocidad = 2x";
            musica.rate(2);
        }else if(manody >360){
            document.getElementById("texto_velocidad").innerHTML = "Velocidad = 2.5x";
            musica.rate(2.5);
        }
    }
    if(resultadomi > 0.2){
        circle(manoix, manoiy, 20);
        numizquierday = Number(manoiy);
        nuevamanoiy = floor(numizquierday * 2);
        izquierdadivision = nuevamanoiy/1000;
        document.getElementById("texto_volumen").innerHTML = "Volumen = "+izquierdadivision;
        musica.setVolume(izquierdadivision);
    }
}


function modelloded(){
    console.log("El modelo se esta iniciando");
}

function gotposes(resoults){
    console.log(resoults);
    if(resoults.length > 0){
        resultadomd = resoults[0].pose.keypoints[10].score;
        resultadomi = resoults[0].pose.keypoints[9].score;
        console.log(resultadomd, resultadomi);
        manodx = resoults[0].pose.rightWrist.x;
        manody = resoults[0].pose.rightWrist.y;
        console.log(manodx, manody);
        manoix = resoults[0].pose.leftWrist.x;
        manoiy = resoults[0].pose.leftWrist.y;
        console.log(manoix, manoiy);
    }
}

function playing(){
    musica.play();
    musica.setVolume(1);
    musica.rate(1);
}


function detener(){
    musica.stop();
}