(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Mobile menu */
    var menuBtn = document.getElementById("menu-toggle");
    var mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", function () {
        var isOpen = mobileMenu.classList.toggle("flex");
        mobileMenu.classList.toggle("hidden");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.getElementById("icon-menu-open").classList.toggle("hidden");
        document.getElementById("icon-menu-close").classList.toggle("hidden");
      });
      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("flex");
          menuBtn.setAttribute("aria-expanded", "false");
          document.getElementById("icon-menu-open").classList.remove("hidden");
          document.getElementById("icon-menu-close").classList.add("hidden");
        });
      });
    }

    /* Sticky header shadow */
    var header = document.getElementById("site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("shadow-soft", window.scrollY > 8);
        header.classList.toggle("bg-white/95", window.scrollY > 8);
        header.classList.toggle("bg-white/80", window.scrollY <= 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Scroll reveal */
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("in-view");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.animationDelay = entry.target.getAttribute("data-delay") || "0ms";
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    }

    /* Image reveal (scale-in + curtain wipe on scroll) */
    var imgRevealEls = document.querySelectorAll("[data-img-reveal]");
    if (imgRevealEls.length) {
      if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        imgRevealEls.forEach(function (el) {
          el.classList.add("img-in-view");
        });
      } else {
        var imgIo = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("img-in-view");
                imgIo.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
        imgRevealEls.forEach(function (el) {
          imgIo.observe(el);
        });
      }
    }

    /* Hero headline word-by-word reveal */
    var heroHeadline = document.querySelector("[data-word-reveal]");
    if (heroHeadline && !prefersReducedMotion) {
      var words = heroHeadline.textContent.trim().split(/\s+/);
      heroHeadline.innerHTML = words
        .map(function (word, i) {
          return '<span class="word-reveal" style="animation-delay:' + i * 55 + 'ms">' + word + "</span>";
        })
        .join(" ");
    }

    /* Animated stat counters */
    var counters = document.querySelectorAll("[data-counter]");
    if (counters.length) {
      var animateCounter = function (el) {
        var target = parseFloat(el.getAttribute("data-counter"));
        var suffix = el.getAttribute("data-suffix") || "";
        var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
        if (prefersReducedMotion) {
          el.textContent = target.toFixed(decimals) + suffix;
          return;
        }
        var duration = 1400;
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      };
      var counterIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) {
        counterIo.observe(el);
      });
    }

    /* Back to top */
    var backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      var toggleBackToTop = function () {
        backToTop.classList.toggle("opacity-0", window.scrollY < 480);
        backToTop.classList.toggle("pointer-events-none", window.scrollY < 480);
        backToTop.classList.toggle("opacity-100", window.scrollY >= 480);
      };
      toggleBackToTop();
      window.addEventListener("scroll", toggleBackToTop, { passive: true });
      backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    }

    /* Product photo galleries */
    document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
      var main = gallery.querySelector("[data-gallery-main]");
      var thumbs = gallery.querySelectorAll("[data-gallery-thumb]");
      thumbs.forEach(function (thumb) {
        thumb.addEventListener("click", function () {
          if (main) main.src = thumb.getAttribute("data-src");
          thumbs.forEach(function (t) {
            t.classList.remove("ring-2", "ring-primary-600", "opacity-100");
            t.classList.add("opacity-60");
          });
          thumb.classList.remove("opacity-60");
          thumb.classList.add("ring-2", "ring-primary-600", "opacity-100");
        });
      });
    });

    /* Category filter (products page) */
    var filterButtons = document.querySelectorAll("[data-filter]");
    if (filterButtons.length) {
      var filterItems = document.querySelectorAll("[data-category]");
      filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          filterButtons.forEach(function (b) {
            b.setAttribute("data-active", "false");
          });
          btn.setAttribute("data-active", "true");
          var filter = btn.getAttribute("data-filter");
          filterItems.forEach(function (item) {
            var show = filter === "all" || item.getAttribute("data-category") === filter;
            item.classList.toggle("hidden", !show);
          });
        });
      });
    }

    /* Current year */
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* FAQ accordion */
    document.querySelectorAll("[data-accordion-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (panel) {
          panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
        }
        var icon = trigger.querySelector("[data-accordion-icon]");
        if (icon) icon.classList.toggle("rotate-45", !expanded);
      });
    });

    /* Contact form: front-end only placeholder.
       TODO(client): wire `action` up to a real email/CRM endpoint (e.g. Formspree,
       a serverless function, or an SMTP relay) before launch. */
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var successEl = document.getElementById("form-success");
        contactForm.reset();
        contactForm.classList.add("hidden");
        if (successEl) successEl.classList.remove("hidden");
      });
    }
  });
})();
