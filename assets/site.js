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
  // Rotating quotes (placeholder content on the home page). Pauses on hover and focus,
  // has a pause button, and does not auto-rotate when the visitor prefers reduced motion.
  document.querySelectorAll(".quote-rotator").forEach(function (root) {
    var slides = root.querySelectorAll(".qr-slide");
    if (slides.length < 2) return;
    var live = root.querySelector(".qr-slides");
    var controls = root.querySelector(".qr-controls");
    var toggle = root.querySelector(".qr-toggle");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var index = 0, timer = null, userPaused = reduce.matches, hovering = false, focused = false;
    root.classList.add("qr-ready");
    if (controls) controls.hidden = false;
    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle("is-active", n === index); });
    }
    function running() { return !userPaused && !hovering && !focused; }
    function sync() {
      clearInterval(timer); timer = null;
      if (live) live.setAttribute("aria-live", running() ? "off" : "polite");
      if (running()) timer = setInterval(function () { show(index + 1); }, 7000);
      if (toggle) {
        toggle.textContent = userPaused ? "Play" : "Pause";
        toggle.setAttribute("aria-label", userPaused ? "Play quotes" : "Pause quotes");
      }
    }
    root.querySelector(".qr-prev").addEventListener("click", function () { show(index - 1); });
    root.querySelector(".qr-next").addEventListener("click", function () { show(index + 1); });
    if (toggle) toggle.addEventListener("click", function () { userPaused = !userPaused; sync(); });
    root.addEventListener("mouseenter", function () { hovering = true; sync(); });
    root.addEventListener("mouseleave", function () { hovering = false; sync(); });
    root.addEventListener("focusin", function () { focused = true; sync(); });
    root.addEventListener("focusout", function (e) { if (!root.contains(e.relatedTarget)) { focused = false; sync(); } });
    show(0); sync();
  });
})();
