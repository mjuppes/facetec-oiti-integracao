import{UI}from"./UIFunctions";export const SampleAppUtilities=function(){function e(e){document.getElementById("status").innerHTML=e}function t(){document.querySelectorAll("#controls > button").forEach((function(e){e.removeAttribute("disabled")}))}function n(){UI(".wrapping-box-container").fadeIn(800),o()&&UI("#custom-logo-container").fadeIn(800),UI("#controls").fadeIn(800,(()=>{t()}))}function o(){let e=!!/Android|iPhone|iPad|iPod|IEMobile|Mobile|mobile/i.test(navigator.userAgent||"");return!e||-1===navigator.userAgent.indexOf("CrOS")&&-1===navigator.userAgent.indexOf("Chromebook")||(e=!1),!!(window.screen.width<window.screen.height||e)}return{displayStatus:e,fadeOutMainUIAndPrepareForSession:function(){document.querySelectorAll("#controls > button").forEach((function(e){e.setAttribute("disabled","true")})),o()&&UI("#custom-logo-container").fadeOut(800),UI("#controls").fadeOut(800),UI(".wrapping-box-container").fadeOut(800)},enableControlButtons:t,generateUUId:function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))},formatUIForDevice:function(){o()&&(document.querySelectorAll("#controls > button").forEach((function(e){"big-button"===e.className?(e.style.height="40px",e.style.fontSize="18px"):"medium-button"===e.className&&(e.style.height="30px",e.style.fontSize="14px"),e.style.width="220px"})),document.getElementById("controls").style.height="auto",document.getElementById("controls").style.borderColor="transparent",document.getElementById("status").style.backgroundColor="transparent",document.getElementById("status").style.fontSize="12px",document.getElementById("status").style.position="inherit",document.getElementById("status").style.width="90%",document.getElementById("status").style.margin="20px auto 0",document.getElementById("status").style.left="unset",document.getElementById("status").style.bottom="unset",document.getElementById("custom-logo-container").parentNode.insertBefore(document.getElementById("custom-logo-container"),document.getElementById("custom-logo-container").parentNode.firstChild),document.getElementById("custom-logo-container").style.margin="0px 0px 20px 0px",document.querySelector("#custom-logo-container img").style.height="40px",document.getElementsByClassName("wrapping-box-container")[0].style.top="50%",document.getElementsByClassName("wrapping-box-container")[0].style.left="50%",document.getElementsByClassName("wrapping-box-container")[0].style.transform="translate(-50%, -50%)")},handleErrorGettingServerSessionToken:function(){n(),e("Session could not be started due to an unexpected issue during the network request.")},showMainUI:n,isLikelyMobileDevice:o,UI}}();