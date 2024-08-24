function pauseVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
        console.log('Pausing video...');
        video.pause();
    } else {
        console.log('No video found or video already paused.');
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pauseVideo") {
        console.log('Pause video message received.');
        pauseVideo();
        sendResponse({ status: 'success' });
    }
    return true;  // Ensure asynchronous response
});
