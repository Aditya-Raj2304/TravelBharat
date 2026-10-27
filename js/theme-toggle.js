/* Theme toggle. Loaded in <head> so the saved theme is applied before first paint.
   Dark is the default; the visitor's choice is remembered in localStorage. */
(function () {
  var KEY = "tb-theme";
  var root = document.documentElement;

  function saved() {
    try { var s = localStorage.getItem(KEY); return s === "light" || s === "dark" ? s : null; } catch (e) { return null; }
  }
  function apply(theme) { root.setAttribute("data-theme", theme); }

  root.classList.remove("no-js");
  root.classList.add("js");
  apply(saved() || "dark");

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    function label() {
      btn.setAttribute("aria-label", root.getAttribute("data-theme") === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    label();
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
  });
})();
