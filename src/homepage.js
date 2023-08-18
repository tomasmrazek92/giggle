import { initSwipers, swipers } from './utils/globalFunctions';

// Sample data for swiperInstances, specific to this page
const swiperInstances = [
  ['.hp-story_modal-wrap', '.hp-story_modal-slide', 'hp-modal', { slidesPerView: 1 }, 'all'],
  ['.hp-story', '.hp-cards', 'experience-cards', { slidesPerView: 1 }, 'mobile'],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);

// Modal
$('.hp-story_item').on('click', function () {
  let index = $(this).index();
  swipers['hp-modal']['hp-modal_0']['swiperInstance'].slideTo(index);
  $('.hp-story_modal').stop().fadeIn();
});

$('#closeModal').on('click', function () {
  $('.hp-story_modal').stop().fadeOut();
});
