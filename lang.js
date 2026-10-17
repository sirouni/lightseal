(function () {
  var KEY = "lightseal-lang";
  var inZh = /\/zh\//.test(location.pathname);
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("[data-set-lang]");
    if (!link) return;
    try { localStorage.setItem(KEY, link.getAttribute("data-set-lang")); } catch (e) {}
  });

  if (inZh) return;
  var page = location.pathname.split("/").pop() || "index.html";
  // Older links pointed at the Chinese half of a bilingual page with #zh.
  var legacyZh = location.hash === "#zh";
  var first = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  if (legacyZh || saved === "zh" || (!saved && /^zh/i.test(first))) {
    location.replace("zh/" + page + location.search + (legacyZh ? "" : location.hash));
  }
})();
