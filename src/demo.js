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

  // -- Forms
  let wfForm = $('#demo-form');
  let hsForm;

  let hbstID = window.location.pathname.includes('/en')
    ? 'a11bc6c9-2078-4d9f-a48f-423b9a14d849' // EN
    : '15d2b3b0-0cf0-4219-aab3-eb433ad8c58f'; // DE

  // Initialize the HubSpot form
  hbspt.forms.create({
    region: 'eu1',
    portalId: '25736014',
    formId: hbstID,
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
