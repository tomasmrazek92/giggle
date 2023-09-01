"use strict";(()=>{var c=(t,e)=>{$(`input[name=${t}]`).val(e)};var m=t=>{let e=localStorage.getItem(t);try{return JSON.parse(e)}catch{return e}},p=(t,e)=>{let o=typeof e=="object"?JSON.stringify(e):e;localStorage.setItem(t,o)};var h="hotel",C=(t,e)=>{let o="",a="";t.address_components.forEach(r=>{let l=r.types[0],s=e.address_components[l];if(s){let i=r[s];l==="route"?o=i:l==="street_number"?a=i:c(l,i)}}),c("hotel-address",`${a} ${o}`)},F=t=>{if(!t.types)return;let e=t.types.join(", ");c("place_types",e)},R=(t,e)=>{Object.keys(e).forEach(o=>{if(o==="address_components")return;let a=t[o];a&&c(o,a)})},v=t=>{if(!t)return;let e={name:"",international_phone_number:"",website:"",place_id:"",url:"",rating:"",user_ratings_total:"",address_components:{street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",country:"short_name",postal_code:"short_name"}};C(t,e),F(t),R(t,e)},b=()=>{let t=m(h);t&&(v(t),c("hotel-name",m("hotel-value")));let e={};$('input[name="hotel-name"]').each(function(){let o=new google.maps.places.Autocomplete(this,e),a=$(this);o.addListener("place_changed",function(){console.log("place-changed");let r=o.getPlace(),l=a.val();n(a,!1,$(a).attr("base-text")),v(r),p("hotel-value",l),p(h,r),c("hotel-name",m("hotel-value"))})})},y=()=>{let t=JSON.parse(localStorage.getItem(h)),e=["bar","cafe","bakery","food","restaurant"];for(let o=0;o<e.length;o++)if(t.types.includes(e[o]))return!0;return!0};function k(t){let o=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($(t).val());return n($(t),!o,"Please fill correct email address."),o}function E(t){let e=!0;return e=O(t),e}var g=!1;function O(t){if(g)return g=!1,!0;let e=y();return e?n($(t),!1):n($(t),!0,"Are you sure this is correct? Please update your entry to a recognized hotel."),g=!0,e}function T(t){let e,o=$(t).siblings(".select2"),a=$(t).siblings(".nice-select");o?e=o.find(".select2-selection--single"):a?e=$(a):e=$(t);let r=!0;return $(t).val()===""?(validArr.push(selectVal),$(e).addClass("is-invalid"),r=!1):$(e).removeClass("is-invalid"),r}function P(t){let e=!1,o=$(t).attr("name");return $(`input[name='${o}']:checked`).length>0?e=!0:$(t).addClass("is-invalid"),n($(t),!0),e}function A(t){return n($(t),!1),!0}function j(t){return $(t).attr("name")==="hotel-name"&&n($(t),!0,"Please select a business location from the search results."),n($(t),!0),!1}var _=t=>{let e=t,o=!0;return $(e).prop("required")&&($(e).val()?$(e).is('[type="email"]')?o=k(e):$(e).attr("name")==="hotel-name"?o=E(e):$(e).is("select")?o=T(e):$(e).is('[type="checkbox"], [type="radio"]')?o=P(e):o=A(e):o=j(e)),o?n($(e),!1):$(e).addClass("error"),o},n=(t,e,o)=>{let a=$(t).closest(".form-field-wrapper, [field-wrapper]").find(".field-validation, [field-validation]");$(t).closest(".form-field, [form-field]").toggleClass("error",e),a.toggle(e),o&&a.text(o)};var x=(t,r,o)=>{var a=$(t),r=$(r);Object.keys(o).forEach(function(l){var s=o[l],i=a.find('input[name="'+l.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+'"]');i.length===0&&(i=a.find('select[name="'+l.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+'"]'));var u=i.val();Array.isArray(s)||(s=[s]),s.forEach(function(f){var d=r.find("input[name="+f.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+"]");d.val(u),["phone","mobilephone","email"].includes(f)&&(d.get(0).focus(),d.get(0).blur())})})},G=t=>{let e=!1;var o=t.find("input[name=mobilephone]").parent().siblings(".hs-error-msgs").find(".hs-error-msg").text(),a=$('input[name="cellphone"]').closest("[field-wrapper]").find("[field-validation]");o?(e=!0,a.text(o),a.show()):a.hide();var r=t.find("input[name=email]").closest(".hs-fieldtype-text").find(".hs-error-msgs").find(".hs-error-msg").text(),l=$('input[name="email"]').closest(".form-field-wrapper, [field-wrapper]").find(".field-validation, [field-validation]");return r?(l.text(r),l.show(),e=!0):l.hide(),e};function w(t){V(t)}function I(){return new Promise(function(t){V=t})}var S=t=>{let e=$('[data-form="submit-btn"]'),o=e.text(),a,r=0,l=[".","..","..."],s=()=>{let d=`Submitting${l[r]}`;e.text(d),r=(r+1)%l.length},i=()=>{e.addClass("disabled")},u=()=>{e.removeClass("disabled").text(o)};i();let f=setInterval(s,500);setTimeout(()=>{a=G(t),clearInterval(f),u(),a||t.find("input[type=submit]").trigger("click")},3e3)},V;$(document).ready(()=>{b();let t=$("#demo-form"),e;hbspt.forms.create({region:"eu1",portalId:"25736014",formId:"15d2b3b0-0cf0-4219-aab3-eb433ad8c58f",target:"#hbst-form",onFormReady:w}),I().then(function(a){e=$(a)});let o={name:["company","new_form_hotel_name"],international_phone_number:["phone"],"hotel-address":["address"],locality:["city"],administrative_area_level_1:["state","0-2/state"],postal_code:["zip"],country:["country"],"first-name":"firstname","last-name":"lastname",cellphone:"mobilephone",email:"email",website:"website",url:"google_places_url",place_types:["industry"]};$("[data-form=submit-btn]").on("click",function(a){let r=$(this);a.preventDefault();let l=!0;t.find(":input:visible, select").each(function(){let s=_($(this));l=l&&s}),l&&(c("page_url",window.location.pathname),x(t,e,o),S(e))})});})();
