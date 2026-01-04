let swipers = {};
let windowWidth = window.innerWidth;
let uniqueIdCounter = 0;

export const createResponsiveSwiper = (
  componentSelector,
  swiperSelector,
  classSelector,
  options,
  mode
) => {
  const mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');
  const desktop = window.matchMedia('(min-width: 992px)');

  let elements = $(componentSelector);

  if (elements.length === 0) {
    return;
  }

  elements.each(function () {
    // Generate a unique key for this instance
    let uniqueKey = classSelector + '_' + uniqueIdCounter;

    const arrows = '.swiper-arrow';
    const pagination = '.swiper-navigation';

    $(this).find(swiperSelector).addClass(uniqueKey);
    $(this).find(arrows).addClass(uniqueKey);
    $(this).find(pagination).addClass(uniqueKey);

    let swiperOptions = Object.assign({}, options, {
      navigation: {
        prevEl: `${arrows}.prev.${uniqueKey}`,
        nextEl: `${arrows}.next.${uniqueKey}`,
      },
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
    });

    if (!options.pagination) {
      swiperOptions.pagination = {
        el: `${pagination}.${uniqueKey}`,
        type: 'bullets',
        bulletActiveClass: 'w-active',
        bulletClass: 'w-slider-dot',
      };
    }

    swipers[classSelector] = swipers[classSelector] || {};
    swipers[classSelector][uniqueKey] = swipers[classSelector][uniqueKey] || {};

    let existingInstance = swipers[classSelector] ? swipers[classSelector][uniqueKey] : null;

    let shouldInitDesktop = mode === 'desktop' && desktop.matches;
    let shouldInitMobile = mode === 'mobile' && mobile.matches;
    let shouldInitAll = mode === 'all';

    let existingSwiper =
      swipers[classSelector] && swipers[classSelector][uniqueKey]
        ? swipers[classSelector][uniqueKey].swiperInstance
        : null;
    let existingMode =
      swipers[classSelector] && swipers[classSelector][uniqueKey]
        ? swipers[classSelector][uniqueKey].mode
        : null;

    if (shouldInitDesktop || shouldInitMobile || shouldInitAll) {
      if (!existingSwiper) {
        // Initialize new instance
        let swiper = new Swiper(`${swiperSelector}.${uniqueKey}`, swiperOptions);

        swipers[classSelector][uniqueKey] = {
          swiperInstance: swiper,
          mode: shouldInitDesktop ? 'desktop' : shouldInitMobile ? 'mobile' : 'all',
          initialized: true, // set the initialized flag to true
        };

        console.log('Swiper initialized for', componentSelector, 'with uniqueKey', uniqueKey);
      }
    } else if (existingSwiper) {
      // If none of the init conditions are true and an existing swiper instance is found, destroy it
      existingSwiper.destroy(true, true);
      delete swipers[classSelector][uniqueKey];
      console.log('Swiper destroyed for', componentSelector, 'with uniqueKey', uniqueKey);
    }

    // Increment the uniqueIdCounter after processing each element
    uniqueIdCounter++;
  });
};

// Function to initialize swipers from an array of instances
export const runSwipers = (swiperInstances) => {
  swiperInstances.forEach((instance) => {
    createResponsiveSwiper(...instance);
  });
};

export const initSwipers = (swiperInstances) => {
  // Load
  window.addEventListener('load', function () {
    console.log('Window Loaded');
    runSwipers(swiperInstances);
  });

  // Resize
  window.addEventListener('resize', function () {
    if (window.innerWidth !== windowWidth) {
      windowWidth = window.innerWidth;
      uniqueIdCounter = 0; // Reset the uniqueIdCounter
      runSwipers(swiperInstances);
    }
  });
};

// Swipers
export { swipers };
