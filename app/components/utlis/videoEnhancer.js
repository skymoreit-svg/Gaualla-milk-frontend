/**
 * Enhances all HTML5 video elements inside a container:
 * - Makes them autoplay, muted, loop, and playsinline (without controls)
 * - Adds a custom play/pause button overlay like the "Our Story" video page.
 */
export const enhanceVideos = (container) => {
  if (!container) return;
  const videos = container.querySelectorAll("video");
  
  videos.forEach((video) => {
    // If it's already enhanced, skip it
    if (video.dataset.enhanced === "true") return;
    video.dataset.enhanced = "true";

    // Set properties for autoplay, muted, loop, playsinline
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.removeAttribute("controls");
    
    // Ensure the video plays
    video.play().catch((err) => {
      console.log("Autoplay was prevented initially:", err);
    });

    // Ensure the video is wrapped in a container that has positioning
    let wrapper = video.parentElement;
    
    // If parent is not already a wrapper we can style, wrap it
    if (!wrapper || !wrapper.classList.contains("quill-video-container")) {
      wrapper = document.createElement("div");
      wrapper.className = "quill-video-container my-4";
      if (video.parentNode) {
        video.parentNode.insertBefore(wrapper, video);
        wrapper.appendChild(video);
      }
    }
    
    // Configure wrapper styles
    wrapper.style.position = "relative";
    wrapper.style.display = "block";
    wrapper.style.width = "100%";
    wrapper.style.overflow = "hidden";
    wrapper.classList.add("group"); // For CSS hover targeting if needed
    
    // Create the custom play/pause button overlay
    const button = document.createElement("button");
    button.type = "button";
    button.ariaLabel = "Pause video";
    button.className = "custom-video-play-btn";
    
    // Style the button like the one on About page:
    // circular white/80 button, centered, transition
    button.style.position = "absolute";
    button.style.left = "50%";
    button.style.top = "50%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.zIndex = "10";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.borderRadius = "50%";
    button.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.transition = "all 0.3s ease";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.outline = "none";
    button.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
    
    // Add hover styles using JS events
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "rgba(255, 255, 255, 1)";
      button.style.transform = "translate(-50%, -50%) scale(1.05)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      button.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // SVG icons
    const playSvg = `<svg style="width: 28px; height: 28px; color: black; margin-left: 3px;" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>`;
    const pauseSvg = `<svg style="width: 28px; height: 28px; color: black;" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>`;
    
    // Function to update the button display and visibility state
    const updateButtonState = (playing) => {
      button.innerHTML = playing ? pauseSvg : playSvg;
      button.ariaLabel = playing ? "Pause video" : "Play video";
      
      if (playing) {
        // When playing: hide button by default, show it when user hovers on container
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
      } else {
        // When paused: always show it so user can click to play
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      }
    };

    // Initialize state
    updateButtonState(!video.paused);

    // Track real play/pause events from video (in case browser autoplay blocking triggers it)
    video.addEventListener("play", () => updateButtonState(true));
    video.addEventListener("pause", () => updateButtonState(false));

    // Show/hide button on hover of the video wrapper if it's playing
    wrapper.addEventListener("mouseenter", () => {
      if (!video.paused) {
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      }
    });

    wrapper.addEventListener("mouseleave", () => {
      if (!video.paused) {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
      }
    });
    
    // Toggle play/pause logic
    const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (video.paused) {
        video.play().then(() => {
          updateButtonState(true);
        }).catch((err) => {
          console.error("Error playing video:", err);
        });
      } else {
        video.pause();
        updateButtonState(false);
      }
    };
    
    button.addEventListener("click", handleToggle);
    // Also allow clicking the video itself to play/pause
    video.addEventListener("click", handleToggle);
    
    wrapper.appendChild(button);
  });
};
