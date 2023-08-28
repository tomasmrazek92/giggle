import { initSwipers, swipers } from './utils/globalFunctions';

// --- Swipers
const swiperInstances = [
  ['.hp-reviews', '.hp-reviews_wrap', 'reviews', { slidesPerView: 1, spaceBetween: 48 }, 'mobile'],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);
