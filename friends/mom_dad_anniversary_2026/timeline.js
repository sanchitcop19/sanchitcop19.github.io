/* ============================================================
   Timeline behaviour.
   All content comes from data.js and is inserted as text, never
   as markup, so a stray character in a caption can't break the
   page or inject anything.
   ============================================================ */

(function () {
  "use strict";

  var DATA = window.BIRTHDAY || {};
  var MOMENTS = Array.isArray(DATA.moments) ? DATA.moments : [];
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) { return document.getElementById(id); }

  function setText(id, value, fallback) {
    var el = $(id);
    if (el) el.textContent = value || fallback || "";
  }

  /* ── Hero + closing copy ─────────────────────────────────── */

  var name = (DATA.name || "").trim() || "Mom & Dad";
  var wedding = parseDate(DATA.weddingDate);
  var isPlaceholder = !wedding;

  /* "YYYY-MM-DD" → local midnight on that day, or null. */
  function parseDate(value) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec((value || "").trim());
    if (!m) return null;
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    return isNaN(d.getTime()) ? null : d;
  }

  function ordinal(n) {
    var tens = n % 100;
    if (tens >= 11 && tens <= 13) return n + "th";
    return n + ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th");
  }

  /* Whole years since the wedding, counting the anniversary day itself. */
  function fullYears(from, to) {
    var years = to.getFullYear() - from.getFullYear();
    var anniversary = new Date(to.getFullYear(), from.getMonth(), from.getDate());
    return to < anniversary ? years - 1 : years;
  }

  var eyebrow = DATA.eyebrow;
  var subtitle = DATA.subtitle;
  if (wedding) {
    /* Round to the nearest anniversary, so the page reads right whether it's
       opened a few days early or a few weeks late. */
    var nearest = Math.round((Date.now() - wedding.getTime()) / (365.2425 * 864e5));
    if (!eyebrow) eyebrow = nearest > 0 ? "Happy " + ordinal(nearest) + " Anniversary ♥" : "Happy Anniversary ♥";
    if (!subtitle) {
      subtitle = "Married " + wedding.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }
  }

  setText("hero-eyebrow", eyebrow, "Happy Anniversary ♥");
  setText("hero-name", name);
  setText("hero-sub", subtitle);
  setText("hero-note", DATA.note);
  setText("poem-label", DATA.poemLabel, "A few words, for you two");
  document.title = "Happy Anniversary, " + name;

  /* ── Together-for counter ────────────────────────────────── */

  (function together() {
    var box = $("together");
    if (!box || !wedding) return;
    box.hidden = false;

    var els = { years: $("t-years"), days: $("t-days"), hours: $("t-hours"), seconds: $("t-seconds") };
    var beat = $("t-beat");
    var fmt = function (n) { return Math.floor(n).toLocaleString("en-US"); };

    function totals() {
      var now = new Date();
      var ms = now.getTime() - wedding.getTime();
      return {
        years: Math.max(0, fullYears(wedding, now)),
        days: Math.max(0, ms / 864e5),
        hours: Math.max(0, ms / 36e5),
        seconds: Math.max(0, ms / 1e3)
      };
    }

    function paint(t, k) {
      Object.keys(els).forEach(function (key) {
        if (els[key]) els[key].textContent = fmt(t[key] * k);
      });
    }

    function tick() {
      paint(totals(), 1);
      if (beat && !reduced) {
        beat.classList.remove("is-beating");
        void beat.offsetWidth;
        beat.classList.add("is-beating");
      }
    }

    function live() {
      tick();
      /* Land each tick on the second boundary so it never drifts. */
      window.setTimeout(live, 1000 - (Date.now() % 1000));
    }

    if (reduced) { live(); return; }

    /* Count up from zero once, then hand over to the live tick. */
    var start = null, duration = 1800;
    function rollUp(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      paint(totals(), 1 - Math.pow(1 - p, 3));
      if (p < 1) window.requestAnimationFrame(rollUp); else live();
    }
    window.setTimeout(function () { window.requestAnimationFrame(rollUp); }, 450);
  })();

  /* ── Poem ──────────────────────────────────────────────── */

  var poem = Array.isArray(DATA.poem) ? DATA.poem.filter(Boolean) : [];
  var poemSection = $("poem");
  var poemAccessible = $("poem-accessible");
  var poemMeasure = $("poem-measure");
  var poemTyped = $("poem-typed");

  if (poem.length && poemSection && poemAccessible && poemMeasure && poemTyped) {
    var fullPoem = poem.join("\n\n");
    poemAccessible.textContent = poem.join(" ");
    poemMeasure.textContent = fullPoem;

    function showCompletePoem() {
      poemTyped.textContent = fullPoem;
      poemTyped.classList.remove("is-typing");
      poemTyped.classList.add("is-complete");
    }

    function typePoem() {
      if (poemTyped.classList.contains("is-typing") || poemTyped.classList.contains("is-complete")) return;

      poemTyped.classList.add("is-typing");
      var index = 0;
      var characterTimes = [];
      var elapsed = 0;

      for (var i = 0; i < fullPoem.length; i += 1) {
        characterTimes.push(elapsed);
        var character = fullPoem.charAt(i);
        elapsed += character === "." ? 400 : character === "\n" ? 180 : 24;
      }

      /* Wall-clock time lets the animation catch up after a background tab is
         throttled instead of resuming one character at a time. */
      var startedAt = Date.now();

      function paintTypedCharacters() {
        var timeSinceStart = Date.now() - startedAt;

        while (index < fullPoem.length && characterTimes[index] <= timeSinceStart) {
          index += 1;
        }

        poemTyped.textContent = fullPoem.slice(0, index);

        if (index < fullPoem.length) {
          var untilNextCharacter = Math.max(0, characterTimes[index] - timeSinceStart);
          window.setTimeout(paintTypedCharacters, Math.min(32, untilNextCharacter));
        } else {
          poemTyped.classList.remove("is-typing");
          poemTyped.classList.add("is-complete");
        }
      }

      paintTypedCharacters();
    }

    if (reduced || !("IntersectionObserver" in window)) {
      showCompletePoem();
    } else {
      var poemObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          typePoem();
          poemObserver.disconnect();
        }
      }, { rootMargin: "0px 0px -18% 0px", threshold: 0.2 });

      poemObserver.observe(poemSection);
    }
  } else if (poemSection) {
    poemSection.hidden = true;
  }

  var closing = DATA.closing || {};
  setText("closing-title", closing.title, "Happy Anniversary ♥");
  setText("closing-body", closing.body);
  setText("closing-signoff", closing.signoff);

  /* ── Build the timeline ──────────────────────────────────── */

  var list = $("timeline-list");
  var photoMoments = [];

  function buildMoment(m, i) {
    var li = document.createElement("li");
    li.className = "moment " + (i % 2 === 0 ? "left" : "right");

    var node = document.createElement("span");
    node.className = "node";
    li.appendChild(node);

    if (m.date) {
      var date = document.createElement("span");
      date.className = "date";
      date.textContent = m.date;
      li.appendChild(date);
    }

    if (m.title) {
      var h3 = document.createElement("h3");
      h3.className = "moment-title";
      h3.textContent = m.title;
      li.appendChild(h3);
    }

    if (m.caption) {
      var p = document.createElement("p");
      p.className = "caption";
      p.textContent = m.caption;
      li.appendChild(p);
    }

    if (!m.photo) {
      li.classList.add("no-photo");
      return li;
    }

    var index = photoMoments.length;
    photoMoments.push(m);

    var frame = document.createElement("button");
    frame.type = "button";
    frame.className = "frame is-loading";
    frame.setAttribute("aria-label", "Open photo" + (m.title ? ": " + m.title : ""));
    frame.dataset.index = String(index);

    var img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = m.alt || m.title || "A photo of you two";
    img.addEventListener("load", function () {
      frame.classList.remove("is-loading");
      img.classList.add("is-loaded");
    });
    img.addEventListener("error", function () {
      frame.classList.remove("is-loading");
      frame.classList.add("is-broken");
      frame.disabled = true;
      frame.dataset.broken = "Couldn't find " + m.photo + " — check the filename in data.js.";
      img.remove();
    });
    img.src = m.photo;

    frame.appendChild(img);
    li.appendChild(frame);
    return li;
  }

  if (MOMENTS.length) {
    var frag = document.createDocumentFragment();
    MOMENTS.forEach(function (m, i) { frag.appendChild(buildMoment(m, i)); });
    list.appendChild(frag);
  } else {
    var empty = document.createElement("div");
    empty.className = "empty";
    var eh = document.createElement("h2");
    eh.textContent = "The story starts here";
    var ep = document.createElement("p");
    ep.textContent = "Photos and memories are on their way. Check back in a moment.";
    empty.appendChild(eh);
    empty.appendChild(ep);
    list.appendChild(empty);
    var spine = document.querySelector(".spine");
    if (spine) spine.style.display = "none";
  }

  /* The setup panel only shows until the wedding date and a first moment are in. */
  if (isPlaceholder || !MOMENTS.length) {
    var setup = $("setup");
    if (setup) setup.hidden = false;
  }

  /* ── Reveal on scroll ────────────────────────────────────── */

  var revealables = [].slice.call(document.querySelectorAll(".moment"));
  var closingEl = $("closing");
  if (closingEl) revealables.push(closingEl);

  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    /* Anything already at or above the fold on first paint — a reload that
       restored the scroll position, or a #hash link — is revealed straight
       away so it can never be stranded at zero opacity. */
    revealables.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    });
  }

  /* ── Spine fill tracks scroll position ───────────────────── */

  var spineEl = document.querySelector(".spine");
  var fillEl = $("spine-fill");
  var ticking = false;

  function paintSpine() {
    ticking = false;
    if (!spineEl || !fillEl || !MOMENTS.length) return;
    var r = spineEl.getBoundingClientRect();
    if (r.height <= 0) return;
    var marker = window.innerHeight * 0.58;
    var progress = (marker - r.top) / r.height;
    progress = Math.max(0, Math.min(1, progress));
    fillEl.style.height = (progress * 100).toFixed(2) + "%";
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(paintSpine);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  paintSpine();

  /* ── Lightbox ────────────────────────────────────────────── */

  var lb = $("lightbox");
  var lbImg = $("lb-img");
  var lbPrev = $("lb-prev");
  var lbNext = $("lb-next");
  var lbClose = $("lb-close");
  var current = 0;
  var lastFocused = null;

  function show(index) {
    if (!photoMoments.length) return;
    current = (index + photoMoments.length) % photoMoments.length;
    var m = photoMoments[current];
    lbImg.src = m.photo;
    lbImg.alt = m.alt || m.title || "A photo of you two";
    setText("lb-date", m.date);
    setText("lb-title", m.title);
    setText("lb-text", m.caption);
    var solo = photoMoments.length < 2;
    lbPrev.hidden = solo;
    lbNext.hidden = solo;
  }

  function openLightbox(index, trigger) {
    lastFocused = trigger || null;
    show(index);
    lb.hidden = false;
    document.body.classList.add("lb-locked");
    void lb.offsetWidth;            /* commit layout so the fade actually runs */
    lb.classList.add("is-open");
    lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove("is-open");
    document.body.classList.remove("lb-locked");
    window.setTimeout(function () {
      lb.hidden = true;
      lbImg.removeAttribute("src");
    }, reduced ? 0 : 320);
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", function (e) {
    var frame = e.target.closest ? e.target.closest(".frame") : null;
    if (frame && !frame.classList.contains("is-broken")) {
      openLightbox(parseInt(frame.dataset.index, 10) || 0, frame);
    }
  });

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { show(current - 1); });
  lbNext.addEventListener("click", function () { show(current + 1); });

  /* Click the backdrop (but not the photo or the buttons) to dismiss. */
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lb-figure")) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape")     { closeLightbox(); }
    if (e.key === "ArrowLeft")  { show(current - 1); }
    if (e.key === "ArrowRight") { show(current + 1); }
    if (e.key === "Tab") {
      /* Keep focus inside the dialog while it's open. */
      var focusables = [lbClose, lbPrev, lbNext].filter(function (el) { return !el.hidden; });
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Swipe between photos on touch devices. */
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 55) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ── Drifting bokeh behind everything ────────────────────── */

  (function bokeh() {
    var canvas = $("bokeh");
    if (!canvas || reduced) { if (canvas) canvas.style.display = "none"; return; }

    var ctx = canvas.getContext("2d");
    var dots = [];
    var w = 0, h = 0, dpr = 1, raf = null;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      var count = Math.min(46, Math.round((w * h) / 26000));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.7 + Math.random() * 2.3,
          a: 0.06 + Math.random() * 0.24,
          vy: -(0.06 + Math.random() * 0.22),
          vx: (Math.random() - 0.5) * 0.09,
          warm: Math.random() > 0.62,
          heart: Math.random() > 0.8
        });
      }
    }

    /* A small heart centred on (x, y), s wide. */
    function heart(x, y, s) {
      var t = y - s * 0.3;
      ctx.moveTo(x, t + s * 0.3);
      ctx.bezierCurveTo(x, t, x - s * 0.5, t, x - s * 0.5, t + s * 0.3);
      ctx.bezierCurveTo(x - s * 0.5, t + s * 0.6, x, t + s * 0.8, x, t + s);
      ctx.bezierCurveTo(x, t + s * 0.8, x + s * 0.5, t + s * 0.6, x + s * 0.5, t + s * 0.3);
      ctx.bezierCurveTo(x + s * 0.5, t, x, t, x, t + s * 0.3);
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.y += d.vy;
        d.x += d.vx;
        if (d.y < -8) { d.y = h + 8; d.x = Math.random() * w; }
        if (d.x < -8) d.x = w + 8;
        if (d.x > w + 8) d.x = -8;
        ctx.fillStyle = d.warm
          ? "rgba(242, 167, 181, " + d.a + ")"
          : "rgba(226, 184, 115, " + d.a + ")";
        ctx.beginPath();
        if (d.heart) {
          heart(d.x, d.y, d.r * 2.4);
        } else {
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      raf = window.requestAnimationFrame(frame);
    }

    function start() { if (raf === null) frame(); }
    function stop()  { if (raf !== null) { window.cancelAnimationFrame(raf); raf = null; } }

    size(); seed(); start();

    window.addEventListener("resize", function () { size(); seed(); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
  })();

})();
