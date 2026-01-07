import { initGlobalParallax } from './utils/parallax';

$(document).ready(function () {
  initGlobalParallax();

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
