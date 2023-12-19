"use strict";(()=>{var c=(t,e)=>{$(`input[name=${t}]`).val(e)};var u=t=>{let e=localStorage.getItem(t);try{return JSON.parse(e)}catch{return e}},p=(t,e)=>{let a=typeof e=="object"?JSON.stringify(e):e;localStorage.setItem(t,a)};var h="hotel",F=(t,e)=>{let a="",n="";t.address_components.forEach(o=>{let s=o.types[0],l=e.address_components[s];if(l){let r=o[l];s==="route"?a=r:s==="street_number"?n=r:c(s,r)}}),c("hotel-address",`${n} ${a}`)},V=t=>{if(!t.types)return;let e=t.types.join(", ");c("place_types",e)},R=(t,e)=>{Object.keys(e).forEach(a=>{if(a==="address_components")return;let n=t[a];n&&c(a,n)})},g=t=>{if(!t)return;let e={name:"",international_phone_number:"",website:"",place_id:"",url:"",rating:"",user_ratings_total:"",address_components:{street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",country:"short_name",postal_code:"short_name"}};F(t,e),V(t),R(t,e)},v=()=>{let t=u(h);t&&(g(t),c("hotel-name",u("hotel-value")));let e={},a=!1;$('input[name="hotel-name"]').each(function(){let n=new google.maps.places.Autocomplete(this,e),o=$(this);n.addListener("place_changed",function(){console.log("place-changed"),a=!0;let s=n.getPlace(),l=o.val();f(o,!1,$(o).attr("base-text")),g(s),p("hotel-value",l),p(h,s),c("hotel-name",u("hotel-value"))}),o.on("change",function(){if(!a){let s=o.val();$('input[type="hidden"]').val(""),$('input[name="name"]').val(s)}a=!1})})};function k(t){let a=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($(t).val());return f($(t),!a,"Please fill correct email address."),a}function E(t){let e=!0;return e=T(t),e}function T(t){return!0}function O(t){let e,a=$(t).siblings(".select2"),n=$(t).siblings(".nice-select");a?e=a.find(".select2-selection--single"):n?e=$(n):e=$(t);let o=!0;return $(t).val()===""?(validArr.push(selectVal),$(e).addClass("is-invalid"),o=!1):$(e).removeClass("is-invalid"),o}function P(t){let e=!1,a=$(t).attr("name");return $(`input[name='${a}']:checked`).length>0?e=!0:$(t).addClass("is-invalid"),f($(t),!0),e}function A(t){return f($(t),!1),!0}function b(t){let e=window.location.pathname.includes("/en")?"Please select a business location from the search results.":"Bitte w\xE4hlen Sie einen Unternehmensstandort aus den Suchergebnissen aus.";return $(t).attr("name")==="hotel-name"&&f($(t),!0,e),f($(t),!0),!1}var y=t=>{let e=t,a=!0;if($(e).prop("required"))if($(e).val())if($(e).is('[type="email"]'))a=k(e);else if($(e).attr("name")==="hotel-name"){var n=$(e).val();n.length>=3&&n[0]!==" "?a=E(e):a=b(e)}else $(e).is("select")?a=O(e):$(e).is('[type="checkbox"], [type="radio"]')?a=P(e):a=A(e);else a=b(e);return a?f($(e),!1):$(e).addClass("error"),a},f=(t,e,a)=>{let n=$(t).closest(".form-field-wrapper, [field-wrapper]").find(".field-validation, [field-validation]");$(t).closest(".form-field, [form-field]").toggleClass("error",e),n.toggle(e),a&&n.text(a)};var _=(t,o,a)=>{var n=$(t),o=$(o);Object.keys(a).forEach(function(s){var l=a[s],r=n.find('input[name="'+s.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+'"]');r.length===0&&(r=n.find('select[name="'+s.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+'"]'));var d=r.val();Array.isArray(l)||(l=[l]),l.forEach(function(m){var i=o.find("input[name="+m.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+"]");i.val(d),["phone","mobilephone","email"].includes(m)&&(i.get(0).focus(),i.get(0).blur())})})},j=t=>{let e=!1;var a=t.find("input[name=mobilephone]").parent().siblings(".hs-error-msgs").find(".hs-error-msg").text(),n=$('input[name="cellphone"]').closest("[field-wrapper]").find("[field-validation]");a?(e=!0,n.text(a),n.show()):n.hide();var o=t.find("input[name=email]").closest(".hs-fieldtype-text").find(".hs-error-msgs").find(".hs-error-msg").text(),s=$('input[name="email"]').closest(".form-field-wrapper, [field-wrapper]").find(".field-validation, [field-validation]");return o?(s.text(o),s.show(),e=!0):s.hide(),e};function w(t){S(t)}function x(){return new Promise(function(t){S=t})}var I=t=>{let e=$('[data-form="submit-btn"]'),a=e.text(),n,o=0,s=[".","..","..."],l=()=>{let i=`Submitting${s[o]}`;e.text(i),o=(o+1)%s.length},r=()=>{e.addClass("disabled")},d=()=>{e.removeClass("disabled").text(a)};r();let m=setInterval(l,500);setTimeout(()=>{n=j(t),n?(clearInterval(m),d()):(t.find("input[type=submit]").trigger("click"),setTimeout(()=>{clearInterval(m),d()},3e3))},3e3)},S;$(document).ready(()=>{v();let t=$("#demo-form"),e,a,n=window.location.href,o=n.includes("https://start.giggle.tips/"),s=n.includes("https://hotel.giggle.tips/"),l=window.location.pathname.includes("/en");o?a=l?"a11bc6c9-2078-4d9f-a48f-423b9a14d849":"15d2b3b0-0cf0-4219-aab3-eb433ad8c58f":s&&(a=l?"63e8d382-d758-406b-91ad-6ee8aa2b2f93":"b52a0567-ff57-44e8-882c-018c0174fd5c"),hbspt.forms.create({region:"eu1",portalId:"25736014",formId:a,target:"#hbst-form",onFormReady:w}),x().then(function(d){e=$(d)});let r={name:["company","new_form_hotel_name"],international_phone_number:["phone"],"hotel-address":["address"],locality:["city"],administrative_area_level_1:["state","0-2/state"],postal_code:["zip"],country:["country"],"first-name":"firstname","last-name":"lastname",cellphone:"mobilephone",email:"email",website:"website",url:"google_places_url",place_types:["industry"]};$("[data-form=submit-btn]").on("click",function(d){let m=$(this);d.preventDefault();let i=!0;t.find(":input:visible, select").each(function(){let C=y($(this));i=i&&C}),i&&(c("page_url",window.location.pathname),_(t,e,r),I(e))})});})();
