(function () {
  var docs = document.querySelectorAll(".legal-doc");
  var links = document.querySelectorAll(".lang-switch a");
  if (!docs.length) return;
  var titles = {};
  docs.forEach(function (d) {
    titles[d.dataset.lang] = d.querySelector("h1").textContent + " — LightSeal";
  });

  function pick() {
    var hash = location.hash.slice(1);
    if (titles[hash]) return hash;
    try {
      var saved = localStorage.getItem("lightseal-lang");
      if (titles[saved]) return saved;
    } catch (e) {}
    var langs = navigator.languages || [navigator.language || ""];
    return langs.some(function (l) { return /^zh/i.test(l); }) ? "zh" : "en";
  }

  function show(lang) {
    docs.forEach(function (d) { d.hidden = d.dataset.lang !== lang; });
    links.forEach(function (a) { a.setAttribute("aria-current", String(a.dataset.lang === lang)); });
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.title = titles[lang];
  }

  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      try { localStorage.setItem("lightseal-lang", a.dataset.lang); } catch (err) {}
      history.replaceState(null, "", "#" + a.dataset.lang);
      show(a.dataset.lang);
      window.scrollTo(0, 0);
    });
  });
  window.addEventListener("hashchange", function () { show(pick()); });
  show(pick());
})();
