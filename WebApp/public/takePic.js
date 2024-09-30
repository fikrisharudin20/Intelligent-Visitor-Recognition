// const cameraVideoStream = document.getElementById('camera-stream');
// const shutterButton = document.getElementById('shutter');
// const canvas = document.getElementById('canvas');

// // Function to get query parameter by name
// function getQueryParam(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
// }

// // Get the username from the query parameter
// const username = getQueryParam('username');

// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ video: true })) {
//     navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//             cameraVideoStream.srcObject = stream;
//             cameraVideoStream.play();
//         });
// }

// let width = window.innerWidth;
// let height = 0;
// let streaming = false;

// cameraVideoStream.addEventListener(
//     "canplay",
//     (ev) => {
//         if (!streaming) {
//             height = cameraVideoStream.videoHeight / (cameraVideoStream.videoWidth / width);

//             canvas.setAttribute("width", width);
//             canvas.setAttribute("height", height);
//             cameraVideoStream.setAttribute("width", width);
//             cameraVideoStream.setAttribute("height", height);
//             streaming = true;
//         }
//     },
//     false
// );

// // Capture snapshots using HTML Canvas
// function captureImage() {
//     const canvasContext = canvas.getContext('2d');
//     canvas.width = width;
//     canvas.height = height;
//     canvasContext.drawImage(cameraVideoStream, 0, 0, width, height);

//     // Convert captured data to image (base64)
//     const data = canvas.toDataURL('image/png');

//     // Send the image data to the server with the username as a query parameter
//     fetch(`/upload?username=${encodeURIComponent(username)}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ image: data })
//     })
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.error('Error:', error));
// }

// // Add click listener to shutter button to capture image
// shutterButton.addEventListener('click', () => captureImage());

// document.addEventListener('DOMContentLoaded', function() {
//     const cameraVideoStream = document.getElementById('camera-stream');
//     const shutterButton = document.getElementById('shutter');
//     const canvas = document.getElementById('canvas');

//     // Function to get query parameter by name
//     function getQueryParam(name) {
//         const urlParams = new URLSearchParams(window.location.search);
//         return urlParams.get(name);
//     }

//     // Get the username from the query parameter
//     const username = getQueryParam('username');

//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then((stream) => {
//                 cameraVideoStream.srcObject = stream;
//                 cameraVideoStream.play();
//             })
//             .catch((err) => {
//                 console.error('Error accessing media devices.', err);
//             });
//     } else {
//         console.error('getUserMedia not supported on your browser!');
//     }

//     let width = window.innerWidth;
//     let height = 0;
//     let streaming = false;

//     cameraVideoStream.addEventListener('canplay', (ev) => {
//         if (!streaming) {
//             height = cameraVideoStream.videoHeight / (cameraVideoStream.videoWidth / width);

//             canvas.setAttribute('width', width);
//             canvas.setAttribute('height', height);
//             cameraVideoStream.setAttribute('width', width);
//             cameraVideoStream.setAttribute('height', height);
//             streaming = true;
//         }
//     }, false);

//     // Capture snapshots using HTML Canvas
//     function captureImage() {
//         const canvasContext = canvas.getContext('2d');
//         canvas.width = width;
//         canvas.height = height;
//         canvasContext.drawImage(cameraVideoStream, 0, 0, width, height);

//         // Convert captured data to image (base64)
//         const data = canvas.toDataURL('image/png');

//         // Send the image data to the server with the username as a query parameter
//         fetch(`/upload?username=${encodeURIComponent(username)}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ image: data })
//         })
//         .then(response => response.text())
//         .then(result => {
//             console.log(result);
//             // Replace the current history entry with the Thank You page
//             history.replaceState(null, '', '/thankYou.html');
//             // Redirect to the Thank You page
//             window.location.href = '/thankYou.html';
//         })
//         .catch(error => console.error('Error:', error));
//     }

//     // Add click listener to shutter button to capture image
//     shutterButton.addEventListener('click', () => captureImage());
// });

document.addEventListener('DOMContentLoaded', function() {
    const cameraVideoStream = document.getElementById('camera-stream');
    const shutterButton = document.getElementById('shutter');
    const canvas = document.getElementById('canvas');

    // Function to get query parameter by name
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the username from the query parameter
    const username = getQueryParam('username');

    // Function to start the video stream
    function startVideoStream() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
                .then((stream) => {
                    cameraVideoStream.srcObject = stream;
                    cameraVideoStream.play();
                })
                .catch((err) => {
                    console.error('Error accessing media devices.', err);
                });
        } else {
            console.error('getUserMedia not supported on your browser!');
        }
    }

    // Start the video stream
    startVideoStream();

    let width = window.innerWidth;
    let height = 0;
    let streaming = false;

    cameraVideoStream.addEventListener('canplay', (ev) => {
        if (!streaming) {
            height = cameraVideoStream.videoHeight / (cameraVideoStream.videoWidth / width);

            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            cameraVideoStream.setAttribute('width', width);
            cameraVideoStream.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    // Capture snapshots using HTML Canvas
    function captureImage() {
        const canvasContext = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        canvasContext.drawImage(cameraVideoStream, 0, 0, width, height);

        // Convert captured data to image (base64)
        const data = canvas.toDataURL('image/png');

        // Send the image data to the server with the username as a query parameter
        fetch(`/upload?username=${encodeURIComponent(username)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: data })
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            // Replace the current history entry with the Thank You page
            history.replaceState(null, '', '/thankYou.html');
            // Redirect to the Thank You page
            window.location.href = '/thankYou.html';
        })
        .catch(error => console.error('Error:', error));
    }

    // Add click listener to shutter button to capture image
    shutterButton.addEventListener('click', () => captureImage());
});