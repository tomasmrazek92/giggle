import { initGooglePlaceAutocomplete } from '$utils/googlePlace';
gsap.registerPlugin(SplitText, ScrollTrigger);

function initGlobalParallax() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: '(max-width:479px)',
      isMobileLandscape: '(max-width:767px)',
      isTablet: '(max-width:991px)',
      isDesktop: '(min-width:992px)',
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions;

      const ctx = gsap.context(() => {
        document.querySelectorAll('[data-parallax="trigger"]').forEach((trigger) => {
          // Check if this trigger has to be disabled on smaller breakpoints
          const disable = trigger.getAttribute('data-parallax-disable');
          if (
            (disable === 'mobile' && isMobile) ||
            (disable === 'mobileLandscape' && isMobileLandscape) ||
            (disable === 'tablet' && isTablet)
          ) {
            return;
          }

          // Optional: you can target an element inside a trigger if necessary
          const target = trigger.querySelector('[data-parallax="target"]') || trigger;

          // Get the direction value to decide between xPercent or yPercent tween
          const direction = trigger.getAttribute('data-parallax-direction') || 'vertical';
          const prop = direction === 'horizontal' ? 'xPercent' : 'yPercent';

          // Get the scrub value, our default is 'true' because that feels nice with Lenis
          const scrubAttr = trigger.getAttribute('data-parallax-scrub');
          const scrub = scrubAttr ? parseFloat(scrubAttr) : true;

          // Get the start position in %
          const startAttr = trigger.getAttribute('data-parallax-start');
          const startVal = startAttr !== null ? parseFloat(startAttr) : 20;

          // Get the end position in %
          const endAttr = trigger.getAttribute('data-parallax-end');
          const endVal = endAttr !== null ? parseFloat(endAttr) : -20;

          // Get the start value of the ScrollTrigger
          const scrollStartRaw = trigger.getAttribute('data-parallax-scroll-start') || 'top bottom';
          const scrollStart = scrollStartRaw;

          console.log(scrollStart);

          // Get the end value of the ScrollTrigger
          const scrollEndRaw = trigger.getAttribute('data-parallax-scroll-end') || 'bottom top';
          const scrollEnd = scrollEndRaw;

          gsap.fromTo(
            target,
            { [prop]: startVal },
            {
              [prop]: endVal,
              ease: 'none',
              scrollTrigger: {
                trigger,
                start: scrollStart,
                end: scrollEnd,
                scrub,
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }
  );
}

function initLoopingCards() {
  let animation;

  function init() {
    const wrapper = $('[data-card-carousel="wrapper"]');
    const items = $('[data-card-carousel="item"]');

    if (animation) {
      animation.kill();
      gsap.killTweensOf(wrapper);
      gsap.killTweensOf('[data-card-carousel="item"]');
    }

    wrapper.find('[data-card-carousel="item"]:gt(' + (items.length - 1) + ')').remove();

    items.clone().appendTo(wrapper);

    const allItems = wrapper.find('[data-card-carousel="item"]');
    gsap.set(allItems, { scale: 1, opacity: 1 });

    const itemHeight = items.first().outerHeight(true);
    const gap = parseFloat(wrapper.css('grid-row-gap')) || parseFloat(wrapper.css('row-gap')) || 0;
    const moveDistance = itemHeight + gap;
    const totalItems = items.length;
    const duration = 3;
    let currentIndex = 0;

    gsap.set(wrapper, { y: 0 });

    function animateCarousel() {
      const targetItem = allItems.eq(currentIndex);

      animation = gsap.timeline({
        onComplete: function () {
          const currentY = gsap.getProperty(wrapper[0], 'y');

          if (Math.abs(currentY) >= moveDistance * totalItems) {
            gsap.set(wrapper, { y: 0 });
            gsap.set(allItems, { scale: 1, opacity: 1 });
            currentIndex = 0;
          } else {
            currentIndex++;
          }

          gsap.delayedCall(duration, animateCarousel);
        },
      });

      animation.to(
        wrapper,
        {
          y: `-=${moveDistance}`,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        0
      );

      animation.to(
        targetItem,
        {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        0
      );
    }

    gsap.delayedCall(duration, animateCarousel);
  }

  init();

  let resizeTimer;
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 250);
  });
}

function initTranslateLines() {
  gsap.to('[data-translate]', {
    ease: 'none',
    scrollTrigger: {
      trigger: '[data-translate]',
      start: 'top center',
      once: true,
      onEnter: () => {
        $('[data-translate] .hp-data_card6_visual-line').each(function (index) {
          var $el = $(this);
          setTimeout(function () {
            $el.addClass('is-active');
          }, index * 50);
        });
      },
    },
  });
}

function animateCustomCards() {
  $('[data-anim="card-7"]').each(function () {
    let content = $(this).find('[data-anim-7="content"]');

    let tl = gsap.timeline({ scrollTrigger: { trigger: $(this) }, start: 'center bottom' });
    tl.from($(this), { autoAlpha: 0, y: '4em', immediateRender: true });
    tl.from(content, { autoAlpha: 0, immediateRender: true });
  });
  $('[data-anim="card-8"]').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
      },
    });

    let heads = $(this).find('.hp-data_card8_item-top');
    let headsIcon = $(this).find('.hp-data_card8_visual-icon');
    let headsLine = $(this).find('.hp-data_card8_visual-line');
    let cards = $(this).find('.hp-data_card8_visual-card');
    let rows = $(this).find('.hp-data_card8_card-inner');

    gsap.set(heads, { opacity: 0, scale: 0.8 });
    gsap.set(headsIcon, { scale: 0, rotation: -180 });
    gsap.set(headsLine, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(rows, { opacity: 0, x: -20 });

    cards.each(function () {
      let originalColor = $(this).css('border-color');
      $(this).data('original-border', originalColor);
      gsap.set(this, { borderColor: 'rgba(0,0,0,0)' });

      let overlay = $(this).find('.hp-data_card8-overlay');
      if (overlay.length) {
        gsap.set(overlay, { opacity: 0 });
      }
    });

    heads.each(function (index) {
      let head = $(this);
      let icon = headsIcon.eq(index);
      let line = headsLine.eq(index);
      let card = cards.eq(index);
      let cardRows = card.find('.hp-data_card8_card-inner');
      let overlay = card.find('.hp-data_card8-overlay');

      let startTime = index * 0.5;

      tl.to(
        head,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        startTime
      )
        .to(
          icon,
          {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'back.out(2)',
          },
          startTime + 0.2
        )
        .to(
          line,
          {
            scaleY: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          startTime + 0.3
        )
        .to(
          cardRows.toArray(),
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out',
          },
          startTime + 0.4
        );

      if (overlay.length) {
        tl.to(
          overlay[0],
          {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          startTime + 0.5
        );
      }

      tl.to(
        card[0],
        {
          borderColor: card.data('original-border'),
          duration: 0.4,
          ease: 'power3.out',
        },
        startTime + 0.55
      );
    });
  });
  $('[data-anim="card-9"]').each(function () {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

    const $card = $(this);
    const dots = ['#dot-1', '#dot-2', '#dot-3', '#dot-4', '#dot-5'];
    const lines = ['#line-1', '#line-2', '#line-3', '#line-4', '#line-5'];

    dots.forEach((dot, i) => {
      const $dot = $card.find(dot);
      const $line = $card.find(lines[i]);

      gsap.set($dot[0], { scale: 0 });

      const tl = gsap.timeline({
        repeat: -1,
        delay: gsap.utils.random(0, 4),
        scrollTrigger: {
          trigger: $card[0],
          start: 'center bottom',
          toggleActions: 'play pause play pause',
        },
      });

      tl.to($dot[0], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
        .to(
          $dot[0],
          {
            motionPath: {
              path: $line[0],
              align: $line[0],
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 0,
            },
            duration: 3,
            ease: 'none',
          },
          '<'
        )
        .to($dot[0], {
          scale: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
    });
  });
  $('[data-anim="card-10"]').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
        onEnter: () => {
          setTimeout(() => {
            $(this).find('.hp-data_card12-toggle').eq(1).addClass('is-active');
          }, 500);
          setTimeout(() => {
            $(this).find('.hp-data_card12-toggle').eq(2).addClass('is-active');
            $(this)
              .find('.hp-data_card12-toggle')
              .on('click', function () {
                $(this).toggleClass('is-active');
              });
          }, 1000);
        },
      },
    });
  });
  $('[data-anim="card-11"]').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
      repeat: -1,
      repeatDelay: 2,
    });

    let chat = $(this).find('.hp-ai_chat');
    let bubble = chat.find('#chat');
    let star = chat.find('#star');

    tl.from(chat, { scale: 0, autoAlpha: 0, rotate: 30, immediateRender: true, ease: 'back.out' });
    tl.from(
      bubble,
      {
        scale: 0,
        immediateRender: true,
        transformOrigin: 'right center',
        ease: 'back.out',
      },
      '<0.3'
    );
    tl.from(
      star,
      {
        scale: 0,
        immediateRender: true,
        transformOrigin: 'right center',
        ease: 'back.out',
      },
      '<0.3'
    );
  });
  $('[data-anim="card-12"]').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    let row = $(this).find('.hp-ai_item-card_col');
    let tool = $(this).find('.hp-ai_item-card_tool');

    tl.to(row, {
      xPercent: (i) => (i === 0 ? -25 : 25),
    });
    tl.fromTo(
      tool,
      { rotate: (i) => (i === 0 ? -10 : 10) },
      {
        rotate: (i) => (i === 0 ? 10 : -10),
      },
      '<'
    );
  });
  $('[data-anim="card-13"]').each(function () {
    function typeText(element, duration = 0.5, delay = 0) {
      const split = new SplitText(element, {
        type: 'words',
        linesClass: 'split-line',
      });

      if (split.words.length) {
        gsap.set(split.words, {
          opacity: 0,
        });

        return gsap.to(split.words, {
          opacity: 1,
          duration: duration,
          delay: delay,
          stagger: {
            amount: duration,
            ease: 'power2.Inout',
          },
          ease: 'power2.out',
        });
      }
    }

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
    });

    let bubble = $(this).find('[data-anim="chat-bubble"]');
    let icon = $(this).find('[data-anim="chat-icon"]');
    let loading = $(this).find('[data-anim="chat-loading"]');

    gsap.set(bubble, { autoAlpha: 0, xPercent: 5 });
    gsap.set(icon, { autoAlpha: 0, scale: 0 });

    tl.to(icon, { scale: 1, autoAlpha: 1 });
    tl.to(bubble.eq(0), { xPercent: 0, autoAlpha: 1 });
    tl.add(typeText(bubble.eq(0).find('p')));
    tl.to(bubble.eq(1), { xPercent: 0, autoAlpha: 1 });
    tl.to(loading, { autoAlpha: 0 }, '+=0.5');
    tl.add(typeText(bubble.eq(1).find('p')));
  });
}

function initGooglePlace() {
  $(document).ready(function () {
    initGooglePlaces('#predictions-name', '.predictions-container');
  });

  function initGooglePlaces(inputSelector, predictionsSelector) {
    let autocompleteService;
    let placesService;
    let placeId;
    let selectedIndex = -1;
    let currentPredictions = [];

    const $input = $(inputSelector);
    const $predictionsList = $(predictionsSelector);

    if (!$input.length) return;

    // Get place types from data attribute and clean up any quotes
    const placeTypes = $input
      .data('place-types')
      .split(',')
      .map((type) => type.trim().replace(/['"]/g, ''));

    const countryRestrict = $input.data('country-restrict');

    function redirectToGrader(placeId) {
      if (placeId) {
        let redirectUrl = `/?placeid=${placeId}`;

        let utmParams;
        try {
          utmParams = JSON.parse(sessionStorage.getItem('utmWebParams'));
        } catch (e) {
          utmParams = null;
        }

        if (utmParams && typeof utmParams === 'object') {
          const paramStrings = [];

          for (const key in utmParams) {
            if (utmParams.hasOwnProperty(key)) {
              paramStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(utmParams[key])}`);
            }
          }

          if (paramStrings.length > 0) {
            redirectUrl += `&${paramStrings.join('&')}`;
          }
        }

        if (!redirectUrl.includes('lp=') && window.location.pathname === '/') {
          redirectUrl;
        }

        window.open(redirectUrl);
      }
    }

    // Initialize Google Places services
    function initializeServices() {
      if (window.google && window.google.maps) {
        autocompleteService = new google.maps.places.AutocompleteService();
        placesService = new google.maps.places.PlacesService(document.createElement('div'));
      } else {
        console.error('Google Maps API not loaded');
      }
    }

    // Handle input changes
    function handleInput(query) {
      placeId = null;
      selectedIndex = -1;

      if (query.length > 0 && autocompleteService) {
        const searchConfig = {
          input: query,
          types: placeTypes,
        };

        if (countryRestrict) {
          searchConfig.componentRestrictions = { country: countryRestrict };
        }

        autocompleteService.getPlacePredictions(searchConfig, (predictions, status) => {
          displayPredictions(predictions, status);

          // Preselect first option if available (but don't scroll yet)
          if (predictions && predictions.length > 0) {
            // Use a slight delay to ensure the DOM is fully rendered
            setTimeout(() => {
              if (
                $predictionsList.is(':visible') &&
                $predictionsList.find('.prediction-item').length > 0
              ) {
                // Just mark the first item as selected without scrolling
                highlightPrediction(0);
              }
            }, 50); // Small delay for DOM rendering
          }
        });
      } else {
        $predictionsList.html('').addClass('hidden');
      }
    }

    // Display predictions
    function displayPredictions(predictions, status) {
      $predictionsList.html('');
      currentPredictions = [];

      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        predictions &&
        predictions.length > 0
      ) {
        // Store current predictions for reference
        currentPredictions = predictions;

        predictions.forEach((prediction, index) => {
          const $predictionItem = $(`
          <div class="prediction-item" data-place-id="${prediction.place_id}" data-index="${index}">
            <span class="main-text p13">${prediction.structured_formatting.main_text}</span>
            <span class="secondarytext p13 text-color-content-tertiary">${prediction.structured_formatting.secondary_text}</span>
          </div>
        `);

          $predictionsList.append($predictionItem);
        });

        $predictionsList.removeClass('hidden');
      } else {
        $predictionsList.addClass('hidden');
      }
    }

    // Highlight a prediction without scrolling
    function highlightPrediction(index) {
      const $items = $predictionsList.find('.prediction-item');

      if ($items.length === 0) return;

      // Handle boundary cases with proper wrapping
      if (index >= $items.length) {
        index = 0;
      } else if (index < 0) {
        index = $items.length - 1;
      }

      // Remove selection from all items
      $items.removeClass('selected');

      // Add selection to the current item (without scrolling)
      const $selected = $items.eq(index).addClass('selected');
      selectedIndex = index;
      placeId = $selected.data('place-id');
    }

    // Select a prediction by index with scrolling
    function selectPrediction(index) {
      const $items = $predictionsList.find('.prediction-item');

      if ($items.length === 0) return;

      // Handle boundary cases with proper wrapping
      if (index >= $items.length) {
        index = 0;
      } else if (index < 0) {
        index = $items.length - 1;
      }

      // Remove selection from all items
      $items.removeClass('selected');

      // Add selection to the current item
      const $selected = $items.eq(index).addClass('selected');
      selectedIndex = index;
      placeId = $selected.data('place-id');

      // Wait for next frame to ensure DOM is updated before scrolling
    }

    // Handle place selection
    function handlePlaceSelection(placeId) {
      if (placeId && placesService) {
        placesService.getDetails({ placeId: placeId }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Trigger a custom event with the selected place
            $input.trigger('placeSelected', [place]);

            // Update input with selected place name
            $input.val(place.name);

            // Hide predictions
            $predictionsList.addClass('hidden');

            toggleValidationMsg($input, false);
          }
        });
      }
    }

    function handleEnterKey() {
      const $selected = $predictionsList.find('.prediction-item.selected');

      if ($selected.length) {
        placeId = $selected.data('place-id');
        handlePlaceSelection(placeId);
        redirectToGrader(placeId);
        return true;
      }
      return false;
    }

    // Event listeners
    let debounceTimer;

    // Input event for text changes
    $input.on('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleInput($(this).val());
      }, 300);
    });

    $input.on('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleInput($(this).val());
      }, 300);
    });

    // Key navigation
    $input.on('keydown', function (e) {
      const keyCode = e.which;

      // Handle Enter key regardless of dropdown state
      if (keyCode === 13 && placeId) {
        e.preventDefault();
        redirectToGrader(placeId);
        return false;
      }

      // Only process other keys when predictions are visible
      if (!$predictionsList.hasClass('hidden')) {
        switch (keyCode) {
          case 38: // Up arrow
            e.preventDefault();
            selectPrediction(selectedIndex - 1);
            break;
          case 40: // Down arrow
            e.preventDefault();
            selectPrediction(selectedIndex + 1);
            break;
          case 13: // Enter (with visible dropdown)
            e.preventDefault();
            handleEnterKey();
            break;
          case 27: // Escape
            e.preventDefault();
            $predictionsList.addClass('hidden');
            break;
          case 9: // Tab
            if (selectedIndex >= 0) {
              e.preventDefault();
              const $selected = $predictionsList.find('.prediction-item.selected');
              if ($selected.length) {
                placeId = $selected.data('place-id');
                handlePlaceSelection(placeId);
              }
            }
            break;
        }
      }
    });

    // Click event for prediction items
    $predictionsList.on('click', '.prediction-item', function () {
      placeId = $(this).data('place-id');
      toggleValidationMsg($input, false);
      handlePlaceSelection(placeId);
      redirectToGrader(placeId);
    });

    // Update selected item on mouse hover
    $predictionsList.on('mouseenter', '.prediction-item', function () {
      selectedIndex = parseInt($(this).data('index'), 10);
      $predictionsList.find('.prediction-item').removeClass('selected');
      $(this).addClass('selected');
    });

    // Close predictions when clicking outside
    $(document).on('click', function (event) {
      if (!$(event.target).closest(predictionsSelector).length && !$(event.target).is($input)) {
        $predictionsList.addClass('hidden');
        $input.val('');
      }
    });

    // Submit button click handlers
    $('.hp-grader_btn-submit').on('click', function (e) {
      if (placeId) {
        redirectToGrader(placeId);
      } else {
        toggleValidationMsg($input, true);
      }
    });

    // Initialize services
    initializeServices();
  }
}

// --- Preload Data from Google API ---
initGooglePlaceAutocomplete();

initLoopingCards();
initGlobalParallax();
initTranslateLines();
animateCustomCards();
initGooglePlace();
