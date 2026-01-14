import { initSwipers, swipers } from './utils/globalFunctions';
import { disableScroll } from './utils/globals';

// GSAP Fix
gsap.registerPlugin(ScrollTrigger, InertiaPlugin);
$('img').each(function () {
  $(this).removeAttr('loading');
  ScrollTrigger.refresh();
});

// -- Navbar Anim
$('.navbar').each(function () {
  let mainParallax = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
});
$('.navbar_menu-button').on('click', function () {
  disableScroll();
});

// --- Swipers
const swiperInstances = [
  [
    '.slider-wrapper.is-hp',
    '.swiper.swiper-hp',
    'hero',
    {
      slidesPerView: 1,
      loopAdditionalSlides: 3,
      centeredSlides: true,
      spaceBetween: 48,
      on: {
        afterInit: (swiper) => {
          $('.swiper-slide.hp-slide').clone().appendTo('.swiper-wrapper.is-hp');
          swiper.update();
        },
      },
      loop: true,
    },
    'all',
  ],
  [
    '.hp-data_card.is-13',
    '.hp-data_card-slider',
    'data-card',
    {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 0,
      pagination: {
        el: '.hp-data_card-slider-pagination',
        type: 'bullets',
        bulletClass: 'hp-data_card-slider-dot',
        bulletActiveClass: 'is-active',
        clickable: true,
      },
    },
    'all',
  ],
  [
    '.hp-qaa_wrap',
    '.swiper.swiper-qaa',
    'questions',
    {
      slidesPerView: 'auto',
      breakpoints: {
        0: {
          spaceBetween: 16,
        },
        480: {
          spaceBetween: 32,
        },
        992: {
          spaceBetween: 64,
        },
      },
    },
    'all',
  ],
  [
    '.clients-wrap',
    '.hp-reviews_wrap',
    'questions',
    {
      slidesPerView: 'auto',
      breakpoints: {
        0: {
          spaceBetween: 16,
        },
        480: {
          spaceBetween: 32,
        },
        992: {
          spaceBetween: 64,
        },
      },
    },
    'mobile',
  ],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);

// --- Momentum Hover
function initMomentumBasedHover() {
  // If this device can’t hover with a fine pointer, stop here
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  // Configuration (tweak these for feel)
  const xyMultiplier = 5; // multiplies pointer velocity for x/y movement
  const rotationMultiplier = 2; // multiplies normalized torque for rotation speed
  const inertiaResistance = 500; // higher = stops sooner

  // Pre-build clamp functions for performance
  const clampXY = gsap.utils.clamp(-1080, 1080);
  const clampRot = gsap.utils.clamp(-60, 60);

  // Initialize each root container
  document.querySelectorAll('[data-momentum-hover-init]').forEach((root) => {
    let prevX = 0,
      prevY = 0;
    let velX = 0,
      velY = 0;
    let rafId = null;

    // Track pointer velocity (throttled to RAF)
    root.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        velX = e.clientX - prevX;
        velY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        rafId = null;
      });
    });

    // Attach hover inertia to each child element
    root.querySelectorAll('[data-momentum-hover-element]').forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        const target = el.querySelector('[data-momentum-hover-target]');
        if (!target) return;

        // Compute offset from center to pointer
        const { left, top, width, height } = target.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Compute raw torque (px²/frame)
        const rawTorque = offsetX * velY - offsetY * velX;

        // Normalize torque so rotation ∝ pointer speed (deg/sec)
        const leverDist = Math.hypot(offsetX, offsetY) || 1;
        const angularForce = rawTorque / leverDist;

        // Calculate and clamp velocities
        const velocityX = clampXY(velX * xyMultiplier);
        const velocityY = clampXY(velY * xyMultiplier);
        const rotationVelocity = clampRot(angularForce * rotationMultiplier);

        // Apply GSAP inertia tween
        gsap.to(target, {
          inertia: {
            x: { velocity: velocityX, end: 0 },
            y: { velocity: velocityY, end: 0 },
            rotation: { velocity: rotationVelocity, end: 0 },
            resistance: inertiaResistance,
          },
        });
      });
    });
  });
}

initMomentumBasedHover();
