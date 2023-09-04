// Video Load function
const toggleSound = (button, videoElement) => {
  if (videoElement.muted) {
    videoElement.muted = false;
    button.querySelector('.video-mute-state').classList.add('hidden');
    button.querySelector('.video-sound-state').classList.remove('hidden');
  } else {
    videoElement.muted = true;
    button.querySelector('.video-mute-state').classList.remove('hidden');
    button.querySelector('.video-sound-state').classList.add('hidden');
  }
};

const loadVideos = () => {
  return new Promise((resolve) => {
    const videoBoxes = document.querySelectorAll('.video-box');

    videoBoxes.forEach((videoBox) => {
      const videoElement = videoBox.querySelector('video');
      const newSource = videoBox.getAttribute('data-video');

      if (videoElement && newSource) {
        const sourceElement = videoElement.querySelector('source');

        if (sourceElement) {
          sourceElement.setAttribute('src', newSource);
        } else {
          const newSourceElement = document.createElement('source');
          newSourceElement.setAttribute('src', newSource);
          newSourceElement.setAttribute('type', 'video/mp4');
          videoElement.appendChild(newSourceElement);
        }

        videoElement.load();
      }
    });

    resolve();
  });
};

// Video Autoplay function
const autoplayVideos = async () => {
  await loadVideos(); // Wait for the Video Load function to complete

  // Utility functions
  const findButtonWithinContainer = (container) => {
    return container ? container.querySelector('button') : null;
  };

  const triggerButtonClick = (button) => {
    button.click();
  };

  const b = (element, eventType, callback) => {
    element.addEventListener(eventType, callback);
    return () => {
      element.removeEventListener(eventType, callback);
    };
  };

  // Main function
  var U = () => {
    console.log('awake');
    let o = document.querySelectorAll('video');
    if (!o.length) return;

    let e = new Map(), // Track intersection observer status
      lastIntersectionState = new Map(); // Track last intersection state

    let i = new IntersectionObserver(
      (t) => {
        for (let { target: r, isIntersecting: n, intersectionRect, boundingClientRect } of t) {
          let videoContainer = r.closest('.w-background-video');
          let button = findButtonWithinContainer(videoContainer);
          let muteButton = videoContainer ? videoContainer.querySelector('.video-mute') : null;

          if (button) {
            let isPlaying = button.getAttribute('data-is-playing') === 'true';

            let isFullyInView =
              intersectionRect.width === boundingClientRect.width &&
              intersectionRect.height === boundingClientRect.height;

            let isFullyOutOfView = intersectionRect.width === 0 && intersectionRect.height === 0;

            if (isFullyInView && !isPlaying) {
              triggerButtonClick(button);
              button.setAttribute('data-is-playing', 'true');
            } else if (isFullyOutOfView && isPlaying) {
              triggerButtonClick(button);
              button.setAttribute('data-is-playing', 'false');
            }
          }
          // Initialize sound toggle
          if (muteButton && !videoContainer.getAttribute('data-sound-initialized')) {
            muteButton.addEventListener('click', () => toggleSound(muteButton, t));
            videoContainer.setAttribute('data-sound-initialized', 'true');
          }
        }
      },
      { threshold: [0, 1] }
    );

    for (let t of o) {
      t.autoplay = false;
      e.set(t, null);
      lastIntersectionState.set(t, null);
      i.observe(t);

      let videoContainer = t.closest('.w-background-video');
      let button = findButtonWithinContainer(videoContainer);
      if (button) {
        button.setAttribute('data-is-playing', 'false');
        button.addEventListener('click', () => {
          let isPlaying = button.getAttribute('data-is-playing') === 'true';
          button.setAttribute('data-is-playing', (!isPlaying).toString());
        });
      }
    }

    let s = b(document, 'visibilitychange', () => {
      for (let [t, r] of e) {
        let button = findButtonWithinContainer(t.parentElement);
        if (button) {
          let isPlaying = button.getAttribute('data-is-playing') === 'true';
          if ((document.hidden && isPlaying) || (!document.hidden && !isPlaying)) {
            triggerButtonClick(button);
            button.setAttribute('data-is-playing', (!document.hidden).toString());
          }
        }
      }
    });
  };

  // Initialize the function
  U();
};

// Execute the function
document.addEventListener('DOMContentLoaded', function () {
  autoplayVideos().catch((err) => console.error(err));
});
