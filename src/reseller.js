import { initGlobalParallax } from './utils/parallax';
import { countries } from './utils/countries';
import { initModalBasic } from './modal';

$(document).ready(function () {
  initGlobalParallax();
  initModalBasic();

  function animateIcon(icons) {
    let paths = $(icons).find('path');
    gsap.to(paths, {
      scrollTrigger: {
        trigger: icons,
        start: 'center 80%',
      },
      duration: 2,
      ease: 'power3.inOut',
      drawSVG: 0,
    });
  }

  // init
  $('[data-hero-animation="wrap"]').each(function () {
    let graph = $(this).find('[data-hero-animation="graph"]');
    let card = $(this).find('[data-hero-animation="card"]');
    let stamp = $(this).find('[data-hero-animation="stamp"]');
    let avatar = $(this).find('[data-hero-animation="avatar"]');
    let icon = $(this).find('[data-hero-animation="icon"]');
    let stats = $(this).find('[data-hero-animation="stats"]');
    let shape = $(this).find('[data-hero-animation="shape"]');

    let tl = gsap.timeline();

    gsap.set([graph, card, stamp, avatar, icon, stats, shape], { autoAlpha: 0 });

    function animateGraph() {
      const path = graph.find('path');
      const circles = graph.find('circle');

      gsap.set(circles, {
        scale: 0,
        transformOrigin: 'center',
      });

      const tl = gsap.timeline();

      tl.to(graph, { autoAlpha: 1 });
      tl.from(path, {
        drawSVG: 0,
        duration: 3,
        ease: 'power2.out',
      }).to(
        '.lineCircle',
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        },
        '<1.2'
      );

      return tl;
    }

    tl.fromTo([card, shape], { scale: 0.8 }, { scale: 1, autoAlpha: 1 });
    tl.fromTo(
      [avatar, stamp, icon, stats],
      { scale: 0.5 },
      { scale: 1, autoAlpha: 1, stagger: 0.2 }
    );
    tl.add(animateGraph, '<');
  });

  $('[data-icon-draw]').each(function () {
    animateIcon($(this));
  });
});

// Country Selection
$(document).ready(function () {
  const selectElement = $('#country');

  function createCountryOptions(countries) {
    const priorityCountries = ['Germany', 'Austria', 'Switzerland'];

    const priority = countries
      .filter((country) => priorityCountries.includes(country.Name))
      .sort((a, b) => priorityCountries.indexOf(a.Name) - priorityCountries.indexOf(b.Name));

    const remaining = countries
      .filter((country) => !priorityCountries.includes(country.Name))
      .sort((a, b) => a.Name.localeCompare(b.Name));

    const sortedCountries = [...priority, ...remaining];

    return sortedCountries.map((country, index) => {
      const option = document.createElement('option');
      option.value = country.Name;
      option.textContent = country.Name;
      option.setAttribute('data-code', country.Code);
      if (country.Name === 'Germany') {
        option.selected = true;
      }
      return option;
    });
  }

  selectElement.empty();

  const countryOptions = createCountryOptions(countries);
  countryOptions.forEach((option) => selectElement.append(option));

  if (!selectElement.val()) {
    selectElement.val('Germany');
  }

  /*
  $('select').niceSelect();

  const countryNiceSelect = selectElement.next('.nice-select');
  if (countryNiceSelect.length) {
    countryNiceSelect.find('.current').text('Germany').css('color', 'white');
    countryNiceSelect.find('li[data-value="Germany"]').addClass('selected');
    countryNiceSelect.find('li[data-value=""]').remove();
  }

  $('.nice-select li').on('click', function () {
    var niceSelect = $(this).closest('.nice-select');
    niceSelect.find('.current').css('color', 'white');
    niceSelect.removeClass('open');
    niceSelect.find('.list').removeClass('open');
  });

  $(document).on('click', '.nice-select li', function () {
    var niceSelect = $(this).closest('.nice-select');
    setTimeout(function () {
      niceSelect.removeClass('open');
      niceSelect.find('.list').removeClass('open');
    }, 100);
  });
  */
});
