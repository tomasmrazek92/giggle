"use strict";(()=>{var c=(t,e)=>{$(`input[name=${t}]`).val(e)};var u=t=>{let e=localStorage.getItem(t);try{return JSON.parse(e)}catch{return e}},p=(t,e)=>{let o=typeof e=="object"?JSON.stringify(e):e;localStorage.setItem(t,o)};var h="hotel",F=(t,e)=>{let o="",n="";t.address_components.forEach(a=>{let l=a.types[0],s=e.address_components[l];if(s){let r=a[s];l==="route"?o=r:l==="street_number"?n=r:c(l,r)}}),c("hotel-address",`${n} ${o}`)},V=t=>{if(!t.types)return;let e=t.types.join(", ");c("place_types",e)},R=(t,e)=>{Object.keys(e).forEach(o=>{if(o==="address_components")return;let n=t[o];n&&c(o,n)})},g=t=>{if(!t)return;let e={name:"",international_phone_number:"",website:"",place_id:"",url:"",rating:"",user_ratings_total:"",address_components:{street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",country:"short_name",postal_code:"short_name"}};F(t,e),V(t),R(t,e)},b=()=>{let t=u(h);t&&(g(t),c("hotel-name",u("hotel-value")));let e={},o=!1;$('input[name="hotel-name"]').each(function(){let n=new google.maps.places.Autocomplete(this,e),a=$(this);n.addListener("place_changed",function(){console.log("place-changed"),o=!0;let l=n.getPlace(),s=a.val();f(a,!1,$(a).attr("base-text")),g(l),p("hotel-value",s),p(h,l),c("hotel-name",u("hotel-value"))}),a.on("change",function(){if(!o){let l=a.val();$('input[type="hidden"]').val(""),$('input[name="name"]').val(l)}o=!1})})};function k(t){let o=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($(t).val());return f($(t),!o,"Please fill correct email address."),o}function E(t){let e=!0;return e=T(t),e}function T(t){return!0}function O(t){let e,o=$(t).siblings(".select2"),n=$(t).siblings(".nice-select");o?e=o.find(".select2-selection--single"):n?e=$(n):e=$(t);let a=!0;return $(t).val()===""?(validArr.push(selectVal),$(e).addClass("is-invalid"),a=!1):$(e).removeClass("is-invalid"),a}function P(t){let e=!1,o=$(t).attr("name");return $(`input[name='${o}']:checked`).length>0?e=!0:$(t).addClass("is-invalid"),f($(t),!0),e}function A(t){return f($(t),!1),!0}function v(t){let e=window.location.pathname.includes("/en")?"Please select a business location from the search results.":"Bitte w\xE4hlen Sie einen Unternehmensstandort aus den Suchergebnissen aus.";return $(t).attr("name")==="hotel-name"&&f($(t),!0,e),f($(t),!0),!1}var y=t=>{let e=t,o=!0;if($(e).prop("required"))if($(e).val())if($(e).is('[type="email"]'))o=k(e);else if($(e).attr("name")==="hotel-name"){var n=$(e).val();n.length>=3&&n[0]!==" "?o=E(e):o=v(e)}else $(e).is("select")?o=O(e):$(e).is('[type="checkbox"], [type="radio"]')?o=P(e):o=A(e);else o=v(e);return o?f($(e),!1):$(e).addClass("error"),o},f=(t,e,o)=>{let n=$(t).closest(".form-field-wrapper, [field-wrapper]").find(".field-validation, [field-validation]");$(t).closest(".form-field, [form-field]").toggleClass("error",e),n.toggle(e),o&&n.text(o)};var w=(t,a,o)=>{var n=$(t),a=$(a);Object.keys(o).forEach(function(l){var s=o[l],r=n.find('input[name="'+l.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+'"]');r.length===0&&(r=n.find('select[name="'+l.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+'"]'));var d=r.val();Array.isArray(s)||(s=[s]),s.forEach(function(m){var i=a.find("input[name="+m.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")+"]");i.val(d),["phone","mobilephone","email"].includes(m)&&(i.get(0).focus(),i.get(0).blur())})})},j=t=>{let e=!1;var o=t.find("input[name=mobilephone]").parent().siblings(".hs-error-msgs").find(".hs-error-msg").text(),n=$('input[name="cellphone"]').closest("[field-wrapper]").find("[field-validation]");o?(e=!0,n.text(o),n.show()):n.hide();var a=t.find("input[name=email]").closest(".hs-fieldtype-text").find(".hs-error-msgs").find(".hs-error-msg").text(),l=$('input[name="email"]').closest(".form-field-wrapper, [field-wrapper]").find(".field-validation, [field-validation]");return a?(l.text(a),l.show(),e=!0):l.hide(),e};function _(t){S(t)}function x(){return new Promise(function(t){S=t})}var I=t=>{let e=$('[data-form="submit-btn"]'),o=e.text(),n,a=0,l=[".","..","..."],s=()=>{let i=`Submitting${l[a]}`;e.text(i),a=(a+1)%l.length},r=()=>{e.addClass("disabled")},d=()=>{e.removeClass("disabled").text(o)};r();let m=setInterval(s,500);setTimeout(()=>{n=j(t),n?(clearInterval(m),d()):(t.find("input[type=submit]").trigger("click"),setTimeout(()=>{clearInterval(m),d()},3e3))},3e3)},S;$(document).ready(()=>{b();let t=$("#demo-form"),e,o,n=window.location.href,a=n.includes("https://start.giggle.tips/")||n.includes("https://giggle-lp-new.webflow.io/"),l=n.includes("https://hotel.giggle.tips/")||n.includes("https://giggle-new.webflow.io/;"),s=window.location.pathname.includes("/en");a?o=s?"a11bc6c9-2078-4d9f-a48f-423b9a14d849":"15d2b3b0-0cf0-4219-aab3-eb433ad8c58f":l&&(o=s?"b52a0567-ff57-44e8-882c-018c0174fd5c":"63e8d382-d758-406b-91ad-6ee8aa2b2f93"),console.log(o),hbspt.forms.create({region:"eu1",portalId:"25736014",formId:o,target:"#hbst-form",onFormReady:_}),x().then(function(d){e=$(d)});let r={name:["company","new_form_hotel_name"],international_phone_number:["phone"],"hotel-address":["address"],locality:["city"],administrative_area_level_1:["state","0-2/state"],postal_code:["zip"],country:["country"],"first-name":"firstname","last-name":"lastname",cellphone:"mobilephone",email:"email",website:"website",url:"google_places_url",place_types:["industry"]};$("[data-form=submit-btn]").on("click",function(d){let m=$(this);d.preventDefault();let i=!0;t.find(":input:visible, select").each(function(){let C=y($(this));i=i&&C}),i&&(c("page_url",window.location.pathname),w(t,e,r),I(e))})});})();
