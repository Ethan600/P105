Webcam.set({
    width: 500,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_face' src = '" + data_uri + "'>";
    });
}

console.log("ml5's version is," + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/b28UdKQoO/model.json", face_recognition_model_loaded);

function face_recognition_model_loaded(){
    console.log("Model loaded successfully");
}

function recognize(){
    img = document.getElementById("captured_face");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }

    else{
        document.getElementById("face_name").innerHTML = result[0].label;
        document.getElementById("face_accuracy").innerHTML = result[0].confidence.toFixed(2);
    }
}