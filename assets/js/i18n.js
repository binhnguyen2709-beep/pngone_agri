(function () {
  "use strict";
  var STORAGE_KEY = "pngone-lang";
  var SUPPORTED = ["en", "vi"];

  function getInitialLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(browser) !== -1 ? browser : "en";
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var value = el.getAttribute("data-" + lang);
      if (value === null) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    ["placeholder", "alt", "title", "aria-label"].forEach(function (attr) {
      document.querySelectorAll("[data-" + lang + "-" + attr + "]").forEach(function (el) {
        el.setAttribute(attr, el.getAttribute("data-" + lang + "-" + attr));
      });
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.setAttribute("data-active", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    window.__pngoneLang = lang;
    document.dispatchEvent(new CustomEvent("pngone:langchange", { detail: { lang: lang } }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = getInitialLang();
    applyLang(lang);
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  });
})();
