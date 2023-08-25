import { initSwipers, swipers } from './utils/globalFunctions';

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
