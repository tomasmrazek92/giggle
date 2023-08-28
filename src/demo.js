import { validateInput } from '$utils/formValidations';
import { setInputElementValue } from '$utils/globals';
import { initGooglePlaceAutocomplete } from '$utils/googlePlace';
import {
  fillHubSpot,
  handleHubspotForm,
  onFormReadyCallback,
  waitForFormReady,
} from '$utils/hubspotLogic';

$(document).ready(() => {
  // --- Preload Data from Google API ---
  initGooglePlaceAutocomplete();
  /* Custom Select
  $('.nice-select li').on('click', function () {
    $('.nice-select .current').css('color', 'white');
  });
  */

  // -- Forms
  let wfForm = $('#demo-form');
  let hsForm;

  /* Handle Submit
  const successSubmit = () => {
    gtag('event', 'ecap', {
      event_category: 'lead',
      event_label: 'ecap',
      value: 1,
    });
    window.location.href = 'https://www.owner.com/funnel-demo-requested';
  };
  */

  // Initialize the HubSpot form
  hbspt.forms.create({
    region: 'eu1',
    portalId: '25736014',
    formId: '15d2b3b0-0cf0-4219-aab3-eb433ad8c58f',
    target: '#hbst-form',
    onFormReady: onFormReadyCallback,
  });

  // Call the waitForFormReady function
  waitForFormReady().then(function (form) {
    hsForm = $(form);
  });

  // -- Inputs
  const inputMapping = {
    name: ['company', 'new_form_hotel_name'],
    international_phone_number: ['phone'],
    'hotel-address': ['address'],
    locality: ['city'],
    administrative_area_level_1: ['state', '0-2/state'],
    postal_code: ['zip'],
    country: ['country'],
    'first-name': 'firstname',
    'last-name': 'lastname',
    cellphone: 'mobilephone',
    email: 'email',
    website: 'website',
    url: 'google_places_url',
    place_types: ['industry'],
    // ...
  };

  // Submit Action
  $('[data-form=submit-btn]').on('click', function (e) {
    let button = $(this);

    e.preventDefault();

    let isValid = true;

    wfForm.find(':input:visible, select').each(function () {
      let validate = validateInput($(this));
      isValid = isValid && validate;
    });

    if (isValid) {
      setInputElementValue('page_url', window.location.pathname);
      fillHubSpot(wfForm, hsForm, inputMapping);
      handleHubspotForm(hsForm);
    }
  });
});
