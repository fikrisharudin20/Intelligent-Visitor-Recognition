 // Access webcam

var video = null;
var canvas = null;
var captureButton = null;
var downloadLink = null;

 function startup() 
 { 
     video = document.getElementById('video');
     canvas = document.getElementById('canvas');
     captureButton = document.getElementById('capture');
     downloadLink = document.getElementById('downloadLink');

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    // Capture the photo
 captureButton.addEventListener('click', () => 
    {
     const context = canvas.getContext('2d');
     canvas.style.display = 'block';
     context.drawImage(video, 0, 0, canvas.width, canvas.height);

     // Convert canvas to a data URL
     const imageData = canvas.toDataURL('image/png');

     // Provide the image for download
     downloadLink.href = imageData;
     downloadLink.style.display = 'block';
 });
 
captureButton.addEventListener('click', () => 
    {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to Blob and send it to server
    canvas.toBlob((blob) => {
        console.log("test");
        const formData = new FormData();
        formData.append('photo', blob, 'photo.png');

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Response from server
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }, 'image/png');
});
 }


 

window.addEventListener('load', startup, false);