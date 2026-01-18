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

  let hbstID;

  const isGermanPath = window.location.pathname.includes('/de');

  hbstID = isGermanPath
    ? '63e8d382-d758-406b-91ad-6ee8aa2b2f93' // DE
    : 'b52a0567-ff57-44e8-882c-018c0174fd5c'; // EN

  // console.log(hbstID);

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
    voucher_code: 'voucher_code',
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
