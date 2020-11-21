const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt user to select media stream, then pass it to
// videoElement to play it

async function getStreamingMedia() {
  try {
    // screenCapture API
    const streamingMedia = await navigator.mediaDevices.getDisplayMedia();

    // Pass streamingMedia to videoElement
    videoElement.srcObject = streamingMedia;

    // Play video once finished loading
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log(`Apologies, an error has occurred!\n\n${error}`);
  }
}

button.addEventListener('click', async function () {
  // Disable button while loading
  button.disabled = true;

  // Start picture-in-picture mode
  await videoElement.requestPictureInPicture();

  // Enable button back
  button.disabled = false;
});

// Start app on load
getStreamingMedia();
