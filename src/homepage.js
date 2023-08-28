import { initSwipers, swipers } from './utils/globalFunctions';
gsap.registerPlugin(ScrollTrigger, Flip);

// --- Animations
// Section 1
$('.hp-feature_visual').each(function () {
  let visual1Img = $(this).find('.hp-feature1_visual-img');
  let visualCursor = $(this).find('.hp-feature1_cursor');
  let visualOverlay = $(this).find('.hp-feature1_overlay');
  let titleText = $(this).find('.hp-feature1_text');
  let visualProfile = $(this).find('.hp-feature1_profile');
  let teamCard = $(this).find('.hp-feature1_team');
  let teamTitle = $(this).find('.hp-feature1_team-title');
  let teamRow = $(this).find('.hp-feature1_team-row');
  let teamCursor = $(this).find('.hp-feature1_hover-cursor');

  let main = gsap.timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: $(this),
      start: 'center bottom',
    },
    defaults: {
      ease: Expo.easeOut,
    },
  });

  const text = new SplitType([titleText, teamTitle], { types: 'words, chars' });

  const revealText = (parent) => {
    main.to($(parent).find('.char'), {
      visibility: 'visible',
      stagger: 0.02,
    });
  };

  // Init Reveal
  main.to($(this), {
    opacity: 1,
  });

  // Reveal Img
  main.fromTo(
    visual1Img,
    {
      x: '30em',
      scale: 0.8,
      opacity: '0',
    },
    {
      scale: 1,
      opacity: 1,
    }
  ),
    '<';

  // Reveal Cursor
  main.fromTo(
    visualCursor,
    {
      scale: 0.8,
      rotatation: 45,
      opacity: 0,
    },
    {
      scale: 1,
      rotatation: 0,
      opacity: 1,
    }
  );

  // Move Img back
  main.to(visual1Img, {
    x: 0,
  });

  // Hide Cursor
  main.to(
    visualCursor,
    {
      scale: 0.5,
      opacity: 0,
      onComplete: () => {
        const state = Flip.getState(visual1Img, { props: 'border-radius' });
        $(visual1Img).removeClass('start');

        // animate from the previous state to the current one:
        Flip.from(state, {
          duration: 0.5,
          ease: 'power1.inOut',
          absolute: true,
        });
      },
    },
    '<=0.5'
  );

  // Reveal Overlay
  main.fromTo(
    visualOverlay,
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    '+=0.5' // Delay for the Morph to finish;
  );

  // Reval Title
  main.add(revealText(titleText));

  // Reval Team Card
  main.fromTo(
    teamCard,
    { x: '-5em', opacity: 0 },
    {
      x: 0,
      opacity: 1,
    }
  );

  // Reveal Team Content
  main.add(revealText(teamTitle));
  main.fromTo(teamRow, { x: '-5em', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.15 });

  // Reveal Team Cursor
  main.fromTo(teamCursor, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 });

  // Reveal Hovered Item
  main.fromTo(
    teamRow.filter(':last-child'),
    { backgroundColor: 'rgba(232, 233, 236, 0)' },
    { backgroundColor: 'rgba(232, 233, 236, 1)' }
  );

  // Team Cursor Clicks
  main.fromTo(teamCursor, { scale: 1 }, { scale: 0.8 });

  // Profile Reveal
  main.fromTo(visualProfile, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 }, '<0.2');

  // Hide Cursor and remove the background
  main.to(teamCursor, { display: 'none' }, '<');
  main.to(teamRow.filter(':last-child'), { backgroundColor: 'rgba(232, 233, 236, 0)' }, '<');

  // Hide for restart
  main.to(
    $(this),
    {
      opacity: 0,
      onComplete: () => {
        $(visual1Img).addClass('start');
      },
    },
    '<=2'
  );
});

// --- Swipers
const swiperInstances = [
  [
    '.hp-story_modal-wrap',
    '.hp-story_modal-slide',
    'hp-modal',
    { slidesPerView: 1, spaceBetween: 48 },
    'all',
  ],
  ['.hp-story', '.hp-cards', 'experience-cards', { slidesPerView: 1 }, 'mobile'],
  [
    '.section_hp-partners',
    '.hp-reviews_wrap',
    'reviews',
    { slidesPerView: 1, spaceBetween: 48 },
    'mobile',
  ],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);

// --- Scroll Disabler
let menuOpen = false;
let scrollPosition;

const disableScroll = () => {
  if (!menuOpen) {
    scrollPosition = $(window).scrollTop();
    console.log(scrollPosition);
    $('html, body').scrollTop(0).addClass('overflow-hidden');
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
  menuOpen = !menuOpen;
};

// Modal
$('.hp-story_item').on('click', function () {
  let index = $(this).index();
  swipers['hp-modal']['hp-modal_0']['swiperInstance'].slideTo(index);
  $('.hp-story_modal')
    .stop()
    .fadeIn('fast', function () {
      disableScroll();
      let video = $('.hp-story_modal-slide')
        .find('.swiper-slide')
        .eq(index)
        .find('.modal-card_visual-phone-inner')
        .find('.w-embed');

      console.log(video.find('video')[0]);

      if (!video.hasClass('w-condition-invisible')) {
        video.find('video')[0].play();
      }
    });
});

$('#closeModal').on('click', function () {
  $('.hp-story_modal').stop().fadeOut();
  disableScroll();
});
