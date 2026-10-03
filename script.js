(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var STORAGE_KEY = 'lartkm-lang';
  var root = document.documentElement;
  var langButtons = document.querySelectorAll('[data-lang-set]');

  function setLang(lang, save) {
    if (lang !== 'pt' && lang !== 'en') lang = DEFAULT_LANG;
    root.dataset.lang = lang;
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    langButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.langSet === lang));
    });
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.langSet, true); });
  });

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  setLang(saved || DEFAULT_LANG, false);

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMenu(!isOpen);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        setMenu(false);
      }
    });

    var mediaQuery = window.matchMedia('(min-width: 768px)');
    var handleViewportChange = function (e) {
      if (e.matches) setMenu(false);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleViewportChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleViewportChange);
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setMenu(false);
    });
  }
})();

document.addEventListener("DOMContentLoaded", () => {

    const policyQuestions = document.querySelectorAll(".policy-question");

    policyQuestions.forEach((question) => {

        question.addEventListener("click", () => {

            const currentItem = question.closest(".policy-item");

            if (!currentItem) return;

            const isCurrentlyOpen = currentItem.classList.contains("open");

            document.querySelectorAll(".policy-item.open").forEach((item) => {
                if (item !== currentItem) {
                    item.classList.remove("open");
                }
            });

            currentItem.classList.toggle("open", !isCurrentlyOpen);

        });

    });

    const languageButtons = document.querySelectorAll(
        ".policy-lang-btn"
    );

    languageButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const language = button.dataset.policyLanguage;

            if (!language) return;

            document.body.classList.toggle(
                "policy-language-pt",
                language === "pt"
            );

            languageButtons.forEach((btn) => {
                btn.classList.toggle(
                    "active",
                    btn.dataset.policyLanguage === language
                );
            });

            document.querySelectorAll("[data-policy-en][data-policy-pt]").forEach((el) => {
                el.textContent = language === "pt" ? el.dataset.policyPt : el.dataset.policyEn;
            });

        });

    });

});