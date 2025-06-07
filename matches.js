document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".interactive-video");

    // Play video on hover (muted)
    video.addEventListener("mouseenter", () => {
        video.play();
    });

    // Pause video when mouse leaves
    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0; // Reset to the beginning
    });

    // Play video with audio on click
    video.addEventListener("click", () => {
        if (video.muted) {
            video.muted = false; // Unmute the video
        }
        video.play(); // Play the video
    });
});