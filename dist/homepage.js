"use strict";(()=>{var s={},T=window.innerWidth,y=0,P=(e,o,a,l,r)=>{let h=window.matchMedia("(min-width: 0px) and (max-width: 991px)"),d=window.matchMedia("(min-width: 992px)"),n=$(e);if(n.length===0){console.log("No elements found for selector",e);return}n.each(function(){let t=a+"_"+y,i=".swiper-arrow",m=".swiper-navigation";$(this).find(o).addClass(t),$(this).find(i).addClass(t),$(this).find(m).addClass(t);let p=Object.assign({},l,{navigation:{prevEl:`${i}.prev.${t}`,nextEl:`${i}.next.${t}`},pagination:{el:`${m}.${t}`,type:"bullets",bulletActiveClass:"w-active",bulletClass:"w-slider-dot"}});s[a]=s[a]||{},s[a][t]=s[a][t]||{};let c=s[a]?s[a][t]:null,u=r==="desktop"&&d.matches,w=r==="mobile"&&h.matches,f=r==="all",g=s[a]&&s[a][t]?s[a][t].swiperInstance:null,E=s[a]&&s[a][t]?s[a][t].mode:null;if(u||w||f){if(!g){let I=new Swiper(`${o}.${t}`,p);s[a][t]={swiperInstance:I,mode:u?"desktop":w?"mobile":"all",initialized:!0},console.log("Swiper initialized for",e,"with uniqueKey",t)}}else g&&(g.destroy(!0,!0),delete s[a][t],console.log("Swiper destroyed for",e,"with uniqueKey",t));y++})},_=e=>{e.forEach(o=>{P(...o)})},C=e=>{window.addEventListener("load",function(){console.log("Window Loaded"),_(e)}),window.addEventListener("resize",function(){window.innerWidth!==T&&(T=window.innerWidth,y=0,_(e))})};var v=!1,b,x=()=>{v?$("html, body").scrollTop(b).removeClass("overflow-hidden"):(b=$(window).scrollTop(),console.log(b),$("html, body").scrollTop(0).addClass("overflow-hidden")),v=!v};gsap.registerPlugin(Flip);var k=[[".hp-story_modal-wrap",".hp-story_modal-slide","hp-modal",{slidesPerView:1,spaceBetween:48,on:{slideChange:()=>{let e=s["hp-modal"]["hp-modal_0"].swiperInstance.realIndex,o=$(".hp-story_modal-slide").find(".swiper-slide").eq(e).find(".modal-card_visual-phone-inner").find(".w-embed");$(".hp-story_modal-slide").find(".swiper-slide").find(".modal-card_visual-phone-inner").find(".w-embed").not(o).each(function(){$(this).find("video")[0].pause()}),o.hasClass("w-condition-invisible")||(o.find("video")[0].currentTime=0,o.find("video")[0].play())}}},"all"],[".hp-story",".hp-cards","experience-cards",{slidesPerView:1},"mobile"],[".qa-videos_wrap",".qa-videos_slider","qa-videos",{slidesPerView:"auto",spaceBetween:64,centeredSlides:!0,loop:!0,mousewheel:{enabled:!0,forceToAxis:!0}},"all"],[".section_hp-dashboard",".hp-dashboard_slider","dashboard-slier",{slidesPerView:1},"mobile"]];C(k);$('[animation-type="1"]').each(function(){let e=$(this).find(".hp-feature1_visual-img"),o=$(this).find(".hp-feature1_cursor"),a=$(this).find(".hp-feature1_overlay"),l=$(this).find(".hp-feature1_text"),r=$(this).find(".hp-feature1_profile"),h=$(this).find(".hp-feature1_team"),d=$(this).find(".hp-feature1_team-title"),n=$(this).find(".hp-feature1_team-row"),t=$(this).find(".hp-feature1_hover-cursor"),i=gsap.timeline({repeat:-1,scrollTrigger:{trigger:$(this),start:"center bottom"},defaults:{ease:Expo.easeOut}}),m=new SplitType([l,d],{types:"words, chars"}),p=c=>{i.to($(c).find(".char"),{visibility:"visible",stagger:.02})};i.to($(this),{opacity:1}),i.fromTo(e,{x:"30em",scale:.8,opacity:"0"},{scale:1,opacity:1}),i.fromTo(o,{scale:.8,rotation:45,opacity:0},{scale:1,rotation:0,opacity:1}),i.to(e,{x:0}),i.to(o,{scale:.5,opacity:0,onComplete:()=>{let c=Flip.getState(e,{props:"border-radius"});$(e).removeClass("start"),Flip.from(c,{duration:.5,ease:"power1.inOut",absolute:!0})}},"<=0.5"),i.fromTo(a,{opacity:0},{opacity:1},"+=0.5"),i.add(p(l)),i.fromTo(h,{x:"-5em",opacity:0},{x:0,opacity:1}),i.add(p(d)),i.fromTo(n,{x:"-5em",opacity:0},{x:0,opacity:1,stagger:.15}),i.fromTo(t,{scale:.8,opacity:0},{scale:1,opacity:1}),i.fromTo(n.filter(":last-child"),{backgroundColor:"rgba(232, 233, 236, 0)"},{backgroundColor:"rgba(232, 233, 236, 1)"}),i.fromTo(t,{scale:1},{scale:.8}),i.fromTo(r,{scale:.8,opacity:0},{scale:1,opacity:1},"<0.2"),i.to(t,{display:"none"},"<"),i.to(n.filter(":last-child"),{backgroundColor:"rgba(232, 233, 236, 0)"},"<"),i.to($(this),{opacity:0,onComplete:()=>{$(e).addClass("start")}},"<=2")});$('[animation-type="2"]').each(function(){let e=$(".hp-feature2_logo"),o=gsap.timeline({scrollTrigger:{trigger:$(this),start:"center bottom"},defaults:{ease:Expo.easeOut}});o.fromTo(e,{opacity:0},{opacity:1,stagger:.2});let a=o.duration();e.each(function(l){var r=$(this);let h=Flip.getState($(this)),d=gsap.utils.random(["1","2","3"]);$(this).addClass("moved");let n=Flip.from(h,{duration:.5,opacity:1,ease:"power1.inOut",absolute:!0,onComplete:function(){r.css({opacity:"1",transform:"none"}),r.addClass("float"+d)}});o.add(n,a+l*.2)})});$('[animation-type="3"]').each(function(){let e=$(".hp-feature3_card"),o=$(".hp-feature3_card-row"),a=$(".hp-feature3_card-icon"),l=gsap.timeline({scrollTrigger:{trigger:$(this),start:"center bottom"},defaults:{ease:Expo.easeOut}}),r=d=>{let n=[];return $(d).each(function(){let t={val:1},i=$(this).text(),m=i.split(" ").join(""),p=parseFloat(m),c=(i.split(".")[1]||[]).length;if(!isNaN(p)){$(this).css("visibility","hidden");let u=()=>{let f;Math.abs(p-t.val)<=.01?f=parseFloat(p.toFixed(c)):f=parseFloat(t.val.toFixed(c)),$(this).text(f)},w=TweenLite.to(t,1.5,{val:p,onUpdate:u,onStart:()=>$(this).css("visibility","visible")});n.push(w)}}),n};l.fromTo(e,{opacity:0},{opacity:1,stagger:.2}),l.fromTo(o,{opacity:0,x:"-2em"},{opacity:1,x:"0em",stagger:.15}),l.fromTo(a,{opacity:0,scale:.8},{opacity:1,scale:1,stagger:.1},"<0.3"),$("[data-counter]").each(function(d){r($(this)).forEach((t,i)=>{l.add(t,"<")})}),gsap.timeline({scrollTrigger:{trigger:$(this),start:"top bottom",end:"bottom top",scrub:1}}).fromTo(e,{y:"10em"},{y:"-10em"})});$('[animation-type="4"]').each(function(){let e=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top bottom",end:"bottom top",scrub:1}});e.fromTo($(".hp-integrations_col:nth-child(even)"),{y:"0em"},{y:"4em"}),e.fromTo($(".hp-integrations_col:nth-child(odd)"),{y:"4em"},{y:"-4em"},"<")});$(".hp-story_item").on("click",function(){let e=$(this).index();s["hp-modal"]["hp-modal_0"].swiperInstance.slideTo(e),$(".hp-story_modal").stop().fadeIn("fast",function(){x();let o=$(".hp-story_modal-slide").find(".swiper-slide").eq(e).find(".modal-card_visual-phone-inner").find(".w-embed");o.hasClass("w-condition-invisible")||o.find("video")[0].play()})});$("#closeModal").on("click",function(){console.log("Click"),$(".hp-story_modal").stop().fadeOut(),x()});})();
