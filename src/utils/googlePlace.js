import { toggleValidationMsg } from '$utils/formValidations';
import { setInputElementValue } from '$utils/globals';
import { getItem, setItem } from '$utils/localStorage';

const restaurantObject = 'hotel';

const setAddressComponents = (googlePlace, componentForm) => {
  let route = '';
  let streetNumber = '';

  googlePlace.address_components.forEach((component) => {
    const addressType = component.types[0];
    const type = componentForm.address_components[addressType];

    if (type) {
      const val = component[type];
      if (addressType === 'route') route = val;
      else if (addressType === 'street_number') streetNumber = val;
      else setInputElementValue(addressType, val);
    }
  });

  setInputElementValue('hotel-address', `${streetNumber} ${route}`);
};

const setTypes = (googlePlace) => {
  if (!googlePlace.types) return;
  const typesAsString = googlePlace.types.join(', ');
  setInputElementValue('place_types', typesAsString);
};

const setOtherComponents = (googlePlace, componentForm) => {
  Object.keys(componentForm).forEach((key) => {
    if (key === 'address_components') return;
    const value = googlePlace[key];
    if (value) setInputElementValue(key, value);
  });
};

const setGooglePlaceDataToForm = (googlePlace) => {
  if (!googlePlace) return;

  const componentForm = {
    name: '',
    international_phone_number: '',
    website: '',
    place_id: '',
    url: '',
    rating: '',
    user_ratings_total: '',
    address_components: {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'short_name',
      postal_code: 'short_name',
    },
  };

  setAddressComponents(googlePlace, componentForm);
  setTypes(googlePlace);
  setOtherComponents(googlePlace, componentForm);
};

const checkIfRestaurant = () => {
  const placeObject = JSON.parse(localStorage.getItem(restaurantObject));
  const placeTypes = placeObject ? placeObject.types : '';

  const validTypes = [
    'country',
    'continent',
    'locality',
    'town_square',
    'street_address',
    'street_number',
    'natural_feature',
  ];

  for (let i = 0; i < validTypes.length; i++) {
    if (placeTypes.includes(validTypes[i])) {
      return false;
    }
  }

  return true;
};

const initGooglePlaceAutocomplete = () => {
  const hasForm = $('input[name="name"]').length > 0 || $('input[name="place_id"]').length > 0;

  const googlePlaceFromStorage = getItem(restaurantObject);
  if (googlePlaceFromStorage && hasForm) {
    setGooglePlaceDataToForm(googlePlaceFromStorage);
    setInputElementValue('hotel-name', getItem('hotel-value'));
  }

  let autocompleteService;
  let placesService;
  let placeId;
  let selectedIndex = -1;
  let currentPredictions = [];

  const gpaOptions = {};

  $('input[name="hotel-name"]').each(function () {
    const $input = $(this);
    const $predictionsList = $('.predictions-container');
    const redirect = $input.attr('data-redirect');

    if (!$predictionsList.length) return;

    const shouldRedirect = redirect && redirect !== '';

    function redirectToGrader(placeId) {
      if (!shouldRedirect || !placeId) return;

      let redirectUrl = `${redirect}?placeid=${placeId}`;

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

      window.location.href = redirectUrl;
    }

    function initializeServices() {
      if (window.google && window.google.maps) {
        autocompleteService = new google.maps.places.AutocompleteService();
        placesService = new google.maps.places.PlacesService(document.createElement('div'));
      }
    }

    function handleInput(query) {
      console.log(query);
      placeId = null;
      selectedIndex = -1;

      if (query.length > 0 && autocompleteService) {
        const searchConfig = { input: query };

        autocompleteService.getPlacePredictions(searchConfig, (predictions, status) => {
          console.log(predictions);
          displayPredictions(predictions, status);

          if (predictions && predictions.length > 0) {
            setTimeout(() => {
              if (
                $predictionsList.is(':visible') &&
                $predictionsList.find('.prediction-item').length > 0
              ) {
                highlightPrediction(0);
              }
            }, 50);
          }
        });
      } else {
        $predictionsList.html('').addClass('hidden');
      }
    }

    function displayPredictions(predictions, status) {
      $predictionsList.html('');
      currentPredictions = [];

      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        predictions &&
        predictions.length > 0
      ) {
        currentPredictions = predictions;

        predictions.forEach((prediction, index) => {
          const secondaryText = prediction.structured_formatting.secondary_text;
          const secondarySpan = secondaryText
            ? `<span class="secondarytext p13 text-color-content-tertiary">${secondaryText}</span>`
            : '';

          const $predictionItem = $(`
            <div class="prediction-item" data-place-id="${prediction.place_id}" data-index="${index}">
              <span class="main-text p13">${prediction.structured_formatting.main_text}</span>
              ${secondarySpan}
            </div>
          `);

          $predictionsList.append($predictionItem);
        });

        $predictionsList.removeClass('hidden');
      } else {
        $predictionsList.addClass('hidden');
      }
    }

    function highlightPrediction(index) {
      const $items = $predictionsList.find('.prediction-item');
      if ($items.length === 0) return;

      if (index >= $items.length) {
        index = 0;
      } else if (index < 0) {
        index = $items.length - 1;
      }

      $items.removeClass('selected');
      const $selected = $items.eq(index).addClass('selected');
      selectedIndex = index;
      placeId = $selected.data('place-id');
    }

    function selectPrediction(index) {
      const $items = $predictionsList.find('.prediction-item');
      if ($items.length === 0) return;

      if (index >= $items.length) {
        index = 0;
      } else if (index < 0) {
        index = $items.length - 1;
      }

      $items.removeClass('selected');
      const $selected = $items.eq(index).addClass('selected');
      selectedIndex = index;
      placeId = $selected.data('place-id');
    }

    function handlePlaceSelection(selectedPlaceId) {
      if (selectedPlaceId && placesService) {
        placesService.getDetails({ placeId: selectedPlaceId }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            $input.val(place.name);
            $predictionsList.addClass('hidden');
            toggleValidationMsg($input, false);

            if (hasForm) {
              setGooglePlaceDataToForm(place);
              setItem('hotel-value', place.name);
              setItem(restaurantObject, place);
            }

            if (shouldRedirect) {
              redirectToGrader(selectedPlaceId);
            }
          }
        });
      }
    }

    function handleEnterKey() {
      const $selected = $predictionsList.find('.prediction-item.selected');
      if ($selected.length) {
        placeId = $selected.data('place-id');
        handlePlaceSelection(placeId);
        return true;
      }
      return false;
    }

    let debounceTimer;

    $input.on('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleInput($(this).val());
      }, 300);
    });

    $input.on('keydown', function (e) {
      const keyCode = e.which;

      if (keyCode === 13 && placeId) {
        e.preventDefault();
        handlePlaceSelection(placeId);
        return false;
      }

      if (!$predictionsList.hasClass('hidden')) {
        switch (keyCode) {
          case 38:
            e.preventDefault();
            selectPrediction(selectedIndex - 1);
            break;
          case 40:
            e.preventDefault();
            selectPrediction(selectedIndex + 1);
            break;
          case 13:
            e.preventDefault();
            handleEnterKey();
            break;
          case 27:
            e.preventDefault();
            $predictionsList.addClass('hidden');
            break;
          case 9:
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

    $predictionsList.on('click', '.prediction-item', function () {
      placeId = $(this).data('place-id');
      toggleValidationMsg($input, false);
      handlePlaceSelection(placeId);
    });

    $predictionsList.on('mouseenter', '.prediction-item', function () {
      selectedIndex = parseInt($(this).data('index'), 10);
      $predictionsList.find('.prediction-item').removeClass('selected');
      $(this).addClass('selected');
    });

    $(document).on('click', function (event) {
      if (!$(event.target).closest($predictionsList).length && !$(event.target).is($input)) {
        $predictionsList.addClass('hidden');
      }
    });

    $('[data-redirect-button]').on('click', function (e) {
      if (placeId) {
        redirectToGrader(placeId);
      } else {
        toggleValidationMsg($input, true);
      }
    });

    $input.on('change', function () {
      const plainTextValue = $input.val();
      if (!placeId && hasForm) {
        localStorage.removeItem('hotel-value');
        localStorage.removeItem(restaurantObject);
        $('input[type="hidden"]').val('');
        $('input[name="name"]').val(plainTextValue);
      }
    });

    initializeServices();
  });
};

export {
  checkIfRestaurant,
  initGooglePlaceAutocomplete,
  restaurantObject,
  setGooglePlaceDataToForm,
};
