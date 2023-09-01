import { initSwipers, swipers } from './utils/globalFunctions';
import { disableScroll } from './utils/globals';
gsap.registerPlugin(Flip);

$(document).ready(function () {
  // --- Animations
  // Section 1
  $('[animation-type="1"]').each(function () {
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
        rotation: 45,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
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

  // Section 2
  $('[animation-type="2"]').each(function () {
    const platforms = $('.hp-feature2_logo');

    let main = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
      defaults: {
        ease: Expo.easeOut,
      },
    });

    main.fromTo(platforms, { opacity: 0 }, { opacity: 1, stagger: 0.2 });

    const currentDuration = main.duration();

    // Iterate through platforms
    platforms.each(function (index) {
      var self = $(this);
      const state = Flip.getState($(this));

      $(this).addClass('moved');
      const flip = Flip.from(state, {
        duration: 0.5,
        opacity: 1,
        ease: 'power1.inOut',
        absolute: true,
        onComplete: function () {
          self.css({ opacity: '1', transform: 'none' });
        },
      });

      // Add each flip animation to the main timeline
      main.add(flip, currentDuration + index * 0.2); // The second parameter can be the position in the timeline
    });
  });

  // Section 3
  $('[animation-type="3"]').each(function () {
    let cards = $('.hp-feature3_card');
    let cards2rows = $('.hp-feature3_card-row');
    let cardsIcon = $('.hp-feature3_card-icon');
    let main = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
      defaults: {
        ease: Expo.easeOut,
      },
    });

    const animateCounter = ($element) => {
      let tweens = [];

      $($element).each(function () {
        const Cont = { val: 1 };
        const originalText = $(this).text();
        const targetValue = parseFloat(originalText);
        const decimalPlaces = (originalText.split('.')[1] || []).length;

        if (!isNaN(targetValue)) {
          $(this).css('visibility', 'hidden');

          const onUpdate = () => {
            let formattedValue;

            if (Math.abs(targetValue - Cont.val) <= 0.01) {
              formattedValue = parseFloat(targetValue.toFixed(decimalPlaces));
            } else {
              formattedValue = parseFloat(Cont.val.toFixed(decimalPlaces));
            }

            $(this).text(formattedValue);
          };

          const tween = TweenLite.to(Cont, 1.5, {
            val: targetValue,
            onUpdate: onUpdate,
            onStart: () => $(this).css('visibility', 'visible'),
          });

          tweens.push(tween);
        }
      });

      return tweens;
    };

    main.fromTo(cards, { opacity: 0 }, { opacity: 1, stagger: 0.2 });

    main.fromTo(cards2rows, { opacity: 0, x: '-2em' }, { opacity: 1, x: '0em', stagger: 0.15 });
    main.fromTo(
      cardsIcon,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.1 },
      '<0.3'
    );

    $('[data-counter]').each(function (index) {
      const tweens = animateCounter($(this));
      tweens.forEach((tween, tIndex) => {
        main.add(tween, '<');
      });
    });

    let mainParallax = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top bottom',
        end: 'bottom top',
        markers: true,
        scrub: 1,
      },
    });

    mainParallax.fromTo(
      cards,
      {
        y: '10em',
      },
      {
        y: '-10em',
      }
    );
  });

  // Section 4
  $('[animation-type="4"]').each(function () {
    let mainParallax = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top bottom',
        end: 'bottom top',
        markers: true,
        scrub: 1,
      },
    });

    mainParallax.fromTo(
      $('.hp-integrations_col:nth-child(even)'),
      {
        y: '0em',
      },
      {
        y: '4em',
      }
    );
    mainParallax.fromTo(
      $('.hp-integrations_col:nth-child(odd)'),
      {
        y: '4em',
      },
      {
        y: '-4em',
      },
      '<'
    );
  });

  // --- Swipers
  const swiperInstances = [
    [
      '.hp-story_modal-wrap',
      '.hp-story_modal-slide',
      'hp-modal',
      {
        slidesPerView: 1,
        spaceBetween: 48,
        on: {
          slideChange: () => {
            let index = swipers['hp-modal']['hp-modal_0']['swiperInstance'].realIndex;
            let video = $('.hp-story_modal-slide')
              .find('.swiper-slide')
              .eq(index)
              .find('.modal-card_visual-phone-inner')
              .find('.w-embed');

            $('.hp-story_modal-slide')
              .find('.swiper-slide')
              .find('.modal-card_visual-phone-inner')
              .find('.w-embed')
              .not(video)
              .each(function () {
                $(this).find('video')[0].pause();
              });
            if (!video.hasClass('w-condition-invisible')) {
              video.find('video')[0].currentTime = 0;
              video.find('video')[0].play();
            }
          },
        },
      },
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

        if (!video.hasClass('w-condition-invisible')) {
          video.find('video')[0].play();
        }
      });
  });

  $('#closeModal').on('click', function () {
    $('.hp-story_modal').stop().fadeOut();
    disableScroll();
  });
});
