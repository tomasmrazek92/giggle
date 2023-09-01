export const setInputElementValue = (elementName, value) => {
  $(`input[name=${elementName}]`).val(value);
};

// --- Scroll Disabler
let menuOpen = false;
let scrollPosition;

export const disableScroll = () => {
  if (!menuOpen) {
    scrollPosition = $(window).scrollTop();
    console.log(scrollPosition);
    $('html, body').scrollTop(0).addClass('overflow-hidden');
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
  menuOpen = !menuOpen;
};
