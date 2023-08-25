var $grid = $('.blog-articles_list');
var isoOptions = {
  // your isotope options...
  itemSelector: '.blog-articles_item',
  masonry: {
    columnWidth: '.blog-articles_item',
    gutter: 40,
  },
};

function checkViewport() {
  var windowWidth = $(window).width();

  if (windowWidth >= 992) {
    // Enable Isotope if it's not already enabled
    if (!$grid.data('isotope')) {
      $grid.isotope(isoOptions);
    }
  } else {
    // Destroy Isotope if it's enabled
    if ($grid.data('isotope')) {
      $grid.isotope('destroy');
    }
  }
}

// Execute on load
checkViewport();

// Bind the function to the window resize event
$(window).resize(checkViewport);

// Handle Filter and Load More
function handleRenderItems(instance) {
  instance.on('renderitems', (renderedItems) => {
    if ($grid.data('isotope')) {
      $grid.isotope('addItems', renderedItems); // Inform Isotope about the new items
      $grid.isotope('reloadItems');
      setTimeout(() => {
        $grid.isotope(isoOptions);
        $grid.isotope('layout'); // Re-layout the grid
      }, 100);
    }
  });
}

window.fsAttributes = window.fsAttributes || [];

// For Filters
window.fsAttributes.push([
  'cmsfilter',
  (filterInstances) => {
    handleRenderItems(filterInstances[0].listInstance);
  },
]);

// For CMS Load
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    handleRenderItems(listInstances[0]);
  },
]);
