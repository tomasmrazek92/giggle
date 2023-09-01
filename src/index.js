import { initSwipers, swipers } from './utils/globalFunctions';
import { disableScroll } from './utils/globals';

// GSAP Fix
gsap.registerPlugin(ScrollTrigger);
$('img').each(function () {
  $(this).removeAttr('loading');
  ScrollTrigger.refresh();
});

// --- Swipers
const swiperInstances = [
  ['.hp-reviews', '.hp-reviews_wrap', 'reviews', { slidesPerView: 1, spaceBetween: 48 }, 'mobile'],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);

ScrollTrigger.matchMedia({
  // large
  '(min-width: 992px)': function () {
    // Patterns Paralaxx
    $('.pattern-block').each(function () {
      let mainParallax = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      mainParallax.fromTo(
        $(this).find('.pattern-block_inner'),
        {
          y: '5vh',
        },
        {
          y: '0vh',
        }
      );
    });
  },
});

// Video Modal
const vimeoboxes = $('[vimeo-btn]');
const modal = $('.vimeo-modal');

const videoPlay = () => {
  const initializePlayer = (vimeoLink) => {
    let video = modal.find('video');

    // Update the source URL of the video element
    video.attr('src', vimeoLink);
    video[0].load();

    var playPromise = video[0].play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Video playback started successfully
        })
        .catch((error) => {
          // Failed to start video playback
        });
    }
  };

  if (vimeoboxes.length > 0) {
    vimeoboxes.on('click', function () {
      const vimeoLink = $(this).attr('vimeo-url');
      if (vimeoLink) {
        modal.fadeIn('fast', function () {
          disableScroll();
          initializePlayer(vimeoLink);
        });
      }
    });
  }
};

videoPlay();

$('[vimeo-close]').on('click', function () {
  modal.find('video')[0].pause();
  modal.find('video')[0].currentTime = 0;
  modal.stop().fadeOut();
  disableScroll();
});
