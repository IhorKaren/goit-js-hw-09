function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var l=r("7Y9D8");const u={form:document.querySelector(".form"),delayEl:document.querySelector('[name="delay"]'),stepEl:document.querySelector('[name="step"]'),amountEl:document.querySelector('[name="amount"]')};let i=null,a=0;u.form.addEventListener("submit",(function(t){t.preventDefault(),i=setInterval((()=>{if(a===Number(u.amountEl.value))return clearInterval(i),void(a=0);var t,o;a+=1,(t=a,o=Number(u.delayEl.value)+(a-1)*Number(u.stepEl.value),new Promise(((e,n)=>{setTimeout((()=>{Math.random()>.3?e({position:t,delay:o}):n({position:t,delay:o})}),o)}))).then((({position:t,delay:o})=>{e(l).Notify.success(`Fulfilled promise ${t} in ${o}ms`)})).catch((({position:t,delay:o})=>{e(l).Notify.failure(`Rejected promise ${t} in ${o}ms`)}))}),Number(u.stepEl.value))}));
//# sourceMappingURL=03-promises.a4d459f0.js.map
