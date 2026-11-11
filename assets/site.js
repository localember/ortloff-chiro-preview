(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }
  document.querySelectorAll(".nav-parent > button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var parent = btn.parentElement;
      var opening = !parent.classList.contains("is-open");
      document.querySelectorAll(".nav-parent.is-open").forEach(function (el) {
        if (el !== parent) el.classList.remove("is-open");
      });
      parent.classList.toggle("is-open", opening);
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-parent") && !e.target.closest(".nav-toggle")) {
      document.querySelectorAll(".nav-parent.is-open").forEach(function (el) {
        el.classList.remove("is-open");
      });
    }
  });
  document.querySelectorAll("form.js-contact").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "This is a design preview. The form is not sending messages yet.";
      }
    });
  });
})();
