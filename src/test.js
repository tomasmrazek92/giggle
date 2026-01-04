gsap.registerPlugin(SplitText, ScrollTrigger);

const checkDesktop = () => $(window).width() > 991;

function toggleStates(container, hide = true) {
  const card = container.find('[data-anim="card"]');
  const base = container.find('[data-anim="base"]');
  const item = container.find('[data-anim="item"]');
  const bubble = container.find('[data-anim="chat-bubble"]');
  const avatarImg = container.find('[data-anim="chat-avatar"] img');
  const avatarSvg = container.find('[data-anim="chat-avatar"] svg');
  const metaDiv = container.find('[data-anim="chat-meta"] > div');

  if (card.length) {
    gsap.killTweensOf(card);
    gsap.set(card, { autoAlpha: hide ? 0 : 1 });
  }
  if (base.length) {
    gsap.killTweensOf(base);
    gsap.set(base, { scale: hide ? 0.8 : 1, autoAlpha: hide ? 0 : 1 });
  }
  if (item.length) {
    gsap.killTweensOf(item);
    gsap.set(item, { autoAlpha: hide ? 0 : 1 });
  }
  if (bubble.length) {
    gsap.killTweensOf(bubble);
    gsap.set(bubble, { scale: hide ? 0.7 : 1, autoAlpha: hide ? 0 : 1 });
  }
  if (avatarImg.length) {
    gsap.killTweensOf(avatarImg);
    gsap.set(avatarImg, { scale: hide ? 0 : 1 });
  }
  if (avatarSvg.length) {
    gsap.killTweensOf(avatarSvg);
    gsap.set(avatarSvg, { scale: hide ? 0 : 1 });
  }
  if (metaDiv.length) {
    gsap.killTweensOf(metaDiv);
    gsap.set(metaDiv, { y: hide ? '0.1em' : 0, autoAlpha: hide ? 0 : 1 });
  }
}

if (checkDesktop()) {
  $('.tabs-container').each(function () {
    toggleStates($(this), true);
  });
}

const tlTemplate = (trigger, start = 'top center') =>
  gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: start,
      once: true,
    },
  });

function typeText(element, duration = 0.3, delay = 0) {
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

function revealChatBoxAnim(el) {
  let tl = gsap.timeline();

  el.each(function (index) {
    let $this = $(this);
    let bubble = $this.find('[data-anim="chat-bubble"]');
    let avatar = $this.find('[data-anim="chat-avatar"]');
    let meta = $this.find('[data-anim="chat-meta"]');
    let text = $this.find('[data-anim="chat-text"]');

    if (bubble.length) tl.to(bubble, { scale: 1, autoAlpha: 1, duration: 0.4 }, '>');
    if (avatar.find('img').length) tl.to(avatar.find('img'), { scale: 1, duration: 0.3 }, '<0.15');
    if (avatar.find('svg').length) tl.to(avatar.find('svg'), { scale: 1, duration: 0.3 }, '<');
    if (meta.children('div').length)
      tl.to(meta.children('div'), { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.3 }, '<0.1');
    if (text.length) tl.add(typeText(text), '<0.1');
  });

  return tl;
}

function animateTabContent(content) {
  let trigger = $(content);
  let tl = gsap.timeline();

  let elements = trigger
    .find('[data-anim]')
    .toArray()
    .sort((a, b) => {
      let typeA = $(a).data('anim');
      let typeB = $(b).data('anim');

      let order = { card: 1, base: 2 };
      let priorityA = order[typeA] || 999;
      let priorityB = order[typeB] || 999;

      if (priorityA !== priorityB) return priorityA - priorityB;

      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

  elements.forEach((el) => {
    let $el = $(el);
    let animType = $el.data('anim');

    if (animType === 'card') {
      gsap.set($el, { autoAlpha: 1 });
    } else if (animType === 'base') {
      tl.to($el, { scale: 1, autoAlpha: 1, duration: 0.4 }, '>');
    } else if (animType === 'item') {
      tl.to($el, { autoAlpha: 1, duration: 0.4 }, '>');
    } else if (animType === 'chat') {
      tl.add(revealChatBoxAnim($el));
    }
  });

  return tl;
}

$('.tabs-container').each(function () {
  const container = $(this);
  const tabs = container.find('.custom-tab');
  const tabContents = container.find('.tab-content');

  let currentIndex = 0;
  let isDesktop = false;
  let mobileScrollTriggers = [];

  function showTab(index) {
    tabs.removeClass('is-active');
    tabs.eq(index).addClass('is-active');

    tabContents.hide();
    tabContents.eq(index).show();

    toggleStates(tabContents.eq(index), true);
    animateTabContent(tabContents.eq(index));

    const details = tabContents.eq(index).find('.tab-content_details');

    if (details.length) {
      gsap.fromTo(
        [details],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    }
  }

  function setupMobileScrollTriggers() {
    mobileScrollTriggers.forEach((st) => st.kill());
    mobileScrollTriggers = [];

    tabContents.each(function () {
      const content = $(this);
      toggleStates(content, true);

      const st = ScrollTrigger.create({
        trigger: content,
        start: 'top 70%',
        once: true,
        onEnter: () => animateTabContent(content),
      });

      mobileScrollTriggers.push(st);
    });
  }

  function killMobileScrollTriggers() {
    mobileScrollTriggers.forEach((st) => st.kill());
    mobileScrollTriggers = [];
  }

  tabs.on('click', function () {
    if (!checkDesktop()) return;

    const clickedIndex = $(this).index();
    if (clickedIndex === currentIndex) return;

    currentIndex = clickedIndex;
    showTab(currentIndex);
  });

  let resizeTimeout;
  $(window).on('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const nowDesktop = checkDesktop();

      if (nowDesktop && !isDesktop) {
        isDesktop = true;
        killMobileScrollTriggers();

        // Reset all tab contents to hidden state for desktop
        tabContents.each(function () {
          toggleStates($(this), true);
        });

        showTab(currentIndex);
      } else if (!nowDesktop && isDesktop) {
        isDesktop = false;
        tabs.addClass('is-active');
        tabContents.show();

        // Reset all content to visible state for mobile
        tabContents.each(function () {
          toggleStates($(this), false);
        });

        setupMobileScrollTriggers();
      }
    }, 300);
  });

  isDesktop = checkDesktop();

  if (isDesktop) {
    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      once: true,
      onEnter: () => showTab(0),
    });
  } else {
    tabs.addClass('is-active');
    tabContents.show();
    setupMobileScrollTriggers();
  }
});
