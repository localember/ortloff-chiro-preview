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

  var hoverMq = window.matchMedia("(min-width: 980px) and (hover: hover)");
  var hoverTimer;

  function parentButton(parent) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i].tagName === "BUTTON") return children[i];
    }
    return null;
  }

  function setOpen(parent, open) {
    parent.classList.toggle("is-open", open);
    var btn = parentButton(parent);
    if (btn && btn.hasAttribute("aria-expanded")) {
      btn.setAttribute("aria-expanded", String(open));
    }
  }

  function closeAll(except) {
    document.querySelectorAll(".nav-parent.is-open").forEach(function (el) {
      if (el !== except) setOpen(el, false);
    });
  }

  document.querySelectorAll(".nav-parent").forEach(function (parent) {
    var btn = parentButton(parent);
    if (btn) {
      btn.addEventListener("click", function () {
        var opening = !parent.classList.contains("is-open");
        closeAll(parent);
        setOpen(parent, opening);
      });
    }
    parent.addEventListener("mouseenter", function () {
      if (!hoverMq.matches) return;
      clearTimeout(hoverTimer);
      closeAll(parent);
      setOpen(parent, true);
    });
    parent.addEventListener("mouseleave", function () {
      if (!hoverMq.matches) return;
      hoverTimer = setTimeout(function () {
        setOpen(parent, false);
      }, 250);
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-parent") && !e.target.closest(".nav-toggle")) {
      closeAll();
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
