!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=null;t.addEventListener("click",(function(){d=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled","disabled"),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(d),e.setAttribute("disabled","disabled"),t.removeAttribute("disabled")})),e.setAttribute("disabled","disabled")}();
//# sourceMappingURL=01-color-switcher.03f8ff03.js.map
