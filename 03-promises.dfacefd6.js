function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=o.parcelRequire3b75;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){n[e]=o},o.parcelRequire3b75=r);var i=r("eWCmQ");const l={form:document.querySelector("form"),button:document.querySelector("form > button")},{amount:u,delay:a,step:d}=l.form.elements;function f(e,o){const t=Math.random()>.3;return new Promise(((n,r)=>{setTimeout((()=>{t?n({position:e,delay:o}):r({position:e,delay:o})}),o)}))}l.button.addEventListener("click",(function(o){o.preventDefault();let t=Number(a.value),n=0;for(let o=0;o<Number(u.value);o++)n+=1,f(n,t).then((({position:o,delay:t})=>e(i).Notify.success(`Fulfilled promise ${o} in ${t}ms`))).catch((({position:o,delay:t})=>e(i).Notify.failure(`Rejected promise ${o} in ${t}ms`))),t+=Number(d.value)}));
//# sourceMappingURL=03-promises.dfacefd6.js.map
