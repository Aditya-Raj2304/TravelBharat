/* TravelBharat: data lookup, filters and page logic.
   The page markup lives in the HTML files (including <template> blocks for cards and tiles).
   This script only fills that markup with data from data.js. Text is always set with
   textContent, never innerHTML, so content cannot inject markup. */
(function () {
  "use strict";

  var D = window.TB;
  var UI = window.TBUI || { reveal: function () {} };
  var page = document.body.getAttribute("data-page");
  var GALLERY_SIZE = 3;

  /* ---------- small helpers ---------- */
  function $(id) {
    return document.getElementById(id);
  }
  function esc(s) {
    return encodeURIComponent(String(s));
  }
  function norm(s) {
    return String(s || "").toLowerCase();
  }
  function param(name) {
    return new URLSearchParams(location.search).get(name) || "";
  }
  function plural(n, one, many) {
    return n + " " + (n === 1 ? one : many);
  }
  function unique(list) {
    return Array.from(new Set(list));
  }

  function clone(templateId) {
    return $(templateId).content.firstElementChild.cloneNode(true);
  }
  function field(root, name, text) {
    var node = root.querySelector('[data-f="' + name + '"]');
    if (node) node.textContent = text;
  }
  function fill(host, nodes) {
    host.textContent = "";
    nodes.forEach(function (n) {
      n.setAttribute("data-reveal", "");
      host.appendChild(n);
    });
    UI.reveal(host);
  }
  function setImage(img, src, alt, fallback) {
    img.alt = alt || "";
    img.classList.remove("is-missing");
    /* if the detail-page photo is missing, try the card/tile photo before giving up */
    img.onerror = function () {
      img.onerror = null;
      if (fallback) img.src = fallback;
    };
    img.onload = function () {
      img.classList.remove("is-missing");
    };
    img.src = src;
  }

  /* ---------- image paths (names are explained in IMAGES.md) ---------- */
  function imgPath(folder, name) {
    return D.images.base + "/" + folder + "/" + name + "." + D.images.ext;
  }
  function destImage(slug, n) {
    return imgPath("destinations", n > 1 ? slug + "-" + n : slug);
  }
  function stateImage(slug) {
    return imgPath("states", slug);
  }
  /* photos shown after clicking a state or destination live in their own folders */
  function stateDetailImage(slug) {
    return imgPath("state-detail", slug);
  }
  function destDetailImage(slug, n) {
    return imgPath("destination-detail", n > 1 ? slug + "-" + n : slug);
  }

  /* ---------- data (invalid records are skipped, not fatal) ---------- */
  var states = [],
    dests = [],
    stateBySlug = {},
    destBySlug = {};
  (D.states || []).forEach(function (s) {
    if (!s || !s.slug || !s.name || stateBySlug[s.slug]) {
      console.warn("Skipped invalid state:", s);
      return;
    }
    stateBySlug[s.slug] = s;
    states.push(s);
  });
  (D.destinations || []).forEach(function (d) {
    if (
      !d ||
      !d.slug ||
      !d.name ||
      !stateBySlug[d.state] ||
      destBySlug[d.slug]
    ) {
      console.warn("Skipped invalid destination:", d);
      return;
    }
    destBySlug[d.slug] = d;
    dests.push(d);
  });

  function stateName(slug) {
    return stateBySlug[slug] ? stateBySlug[slug].name : "";
  }
  function destsIn(slug) {
    return dests.filter(function (d) {
      return d.state === slug;
    });
  }
  function searchText(d) {
    return norm(
      [
        d.name,
        d.city,
        d.category,
        stateName(d.state),
        d.short,
        (d.highlights || []).join(" "),
      ].join(" "),
    );
  }

  /* ---------- builders (clone a template from the page, then fill it) ---------- */
  function destinationCard(d) {
    var card = clone("tpl-destination");
    card.href = "destination.html?d=" + esc(d.slug);
    setImage(
      card.querySelector("img"),
      destImage(d.slug, 1),
      d.name + ", " + stateName(d.state),
    );
    field(card, "tag1", d.category || "Travel");
    field(card, "tag2", stateName(d.state));
    field(card, "title", d.name);
    field(card, "meta", (d.city ? d.city + ", " : "") + stateName(d.state));
    field(card, "text", d.short || "");
    var n = (d.highlights || []).length;
    field(card, "count", n ? plural(n, "highlight", "highlights") : "");
    return card;
  }

  function stateTile(s) {
    var tile = clone("tpl-state");
    tile.href = "state.html?s=" + esc(s.slug);
    setImage(tile.querySelector("img"), stateImage(s.slug), "");
    field(tile, "name", s.name);
    field(
      tile,
      "meta",
      s.type +
        " · " +
        plural(destsIn(s.slug).length, "destination", "destinations"),
    );
    return tile;
  }

  function showNotFound() {
    var view = $("view"),
      nf = $("not-found");
    if (view) view.hidden = true;
    if (nf) nf.hidden = false;
    document.title = "Not found | TravelBharat";
  }

  function fillStats() {
    var counts = {
      states: states.length,
      destinations: dests.length,
      cities: unique(
        dests
          .map(function (d) {
            return d.city;
          })
          .filter(Boolean),
      ).length,
      categories: (D.categories || []).length,
      regions: unique(
        states.map(function (s) {
          return s.region;
        }),
      ).length,
    };
    [].forEach.call(document.querySelectorAll("[data-stat]"), function (el) {
      var key = el.getAttribute("data-stat");
      if (key in counts) el.textContent = counts[key];
    });
  }

  /* ---------- pages ---------- */
  var pages = {};

  pages.home = function () {
    fillStats();
    fill($("state-strip"), states.map(stateTile));
    var featured = dests.filter(function (d) {
      return d.featured;
    });
    var rest = dests.filter(function (d) {
      return !d.featured;
    });
    fill($("featured"), featured.concat(rest).slice(0, 6).map(destinationCard));
  };

  pages.about = function () {
    fillStats();
  };

  pages.states = function () {
    var q = $("state-q"),
      region = $("state-region"),
      grid = $("state-grid"),
      count = $("state-count"),
      empty = $("state-empty");
    unique(
      states.map(function (s) {
        return s.region;
      }),
    ).forEach(function (r) {
      var o = document.createElement("option");
      o.value = r;
      o.textContent = r;
      region.appendChild(o);
    });
    function run() {
      var text = norm(q.value.trim());
      var out = states.filter(function (s) {
        return (
          (!region.value || s.region === region.value) &&
          (!text ||
            norm(s.name + " " + s.region + " " + s.type).indexOf(text) > -1)
        );
      });
      count.textContent = plural(out.length, "result", "results");
      empty.hidden = out.length > 0;
      fill(grid, out.map(stateTile));
    }
    function reset() {
      q.value = "";
      region.value = "";
      run();
    }
    q.addEventListener("input", run);
    region.addEventListener("change", run);
    $("state-clear").addEventListener("click", reset);
    run();
  };

  pages.state = function () {
    var s = stateBySlug[param("s")];
    if (!s) return showNotFound();
    document.title = s.name + " | TravelBharat";

    setImage($("s-img"), stateDetailImage(s.slug), "", stateImage(s.slug));
    $("s-name").textContent = s.name;
    $("s-crumb").textContent = s.name;
    $("s-short").textContent = s.short || "";
    $("s-type").textContent = s.type + " · " + s.region;
    $("s-about-title").textContent = "About " + s.name;
    $("s-lead").textContent = s.short || "";
    $("s-dest-title").textContent = "Places to visit in " + s.name;

    if ((s.highlights || []).length) {
      var list = $("s-highlights");
      s.highlights.forEach(function (h) {
        var li = document.createElement("li");
        li.textContent = h;
        list.appendChild(li);
      });
      $("s-highlights-wrap").hidden = false;
    }

    var list2 = destsIn(s.slug);
    $("s-dests-empty").hidden = list2.length > 0;
    fill($("s-dests"), list2.map(destinationCard));

    var sameRegion = states.filter(function (x) {
      return x.slug !== s.slug && x.region === s.region;
    });
    var others = states.filter(function (x) {
      return x.slug !== s.slug && x.region !== s.region;
    });
    fill($("s-related"), sameRegion.concat(others).slice(0, 4).map(stateTile));
  };

  pages.destinations = function () {
    var f = {
      q: $("f-q"),
      state: $("f-state"),
      city: $("f-city"),
      cat: $("f-cat"),
    };
    var grid = $("dest-grid"),
      count = $("dest-count"),
      empty = $("dest-empty");

    function addOptions(select, items) {
      items.forEach(function (it) {
        var o = document.createElement("option");
        o.value = it[0];
        o.textContent = it[1];
        select.appendChild(o);
      });
    }
    addOptions(
      f.state,
      states.map(function (s) {
        return [s.slug, s.name];
      }),
    );
    addOptions(
      f.cat,
      (D.categories || []).map(function (c) {
        return [c.name, c.name];
      }),
    );

    /* city list depends on the chosen state */
    function updateCities() {
      var keep = f.city.value;
      var pool = dests.filter(function (d) {
        return !f.state.value || d.state === f.state.value;
      });
      var cities = unique(
        pool
          .map(function (d) {
            return d.city;
          })
          .filter(Boolean),
      ).sort();
      f.city.textContent = "";
      addOptions(
        f.city,
        [["", "All cities"]].concat(
          cities.map(function (c) {
            return [c, c];
          }),
        ),
      );
      f.city.value = cities.indexOf(keep) > -1 ? keep : "";
    }
    function syncUrl() {
      var p = new URLSearchParams();
      if (f.q.value.trim()) p.set("q", f.q.value.trim());
      if (f.state.value) p.set("state", f.state.value);
      if (f.city.value) p.set("city", f.city.value);
      if (f.cat.value) p.set("cat", f.cat.value);
      history.replaceState(
        null,
        "",
        location.pathname + (p.toString() ? "?" + p : ""),
      );
    }
    function run() {
      var text = norm(f.q.value.trim());
      var out = dests.filter(function (d) {
        return (
          (!f.state.value || d.state === f.state.value) &&
          (!f.city.value || d.city === f.city.value) &&
          (!f.cat.value || d.category === f.cat.value) &&
          (!text || searchText(d).indexOf(text) > -1)
        );
      });
      count.textContent =
        plural(out.length, "destination", "destinations") + " found";
      empty.hidden = out.length > 0;
      fill(grid, out.map(destinationCard));
      syncUrl();
    }
    function reset() {
      f.q.value = "";
      f.state.value = "";
      f.cat.value = "";
      updateCities();
      f.city.value = "";
      run();
    }

    /* start from the URL (?q=, ?state=, ?city=, ?cat=) */
    addOptions(f.city, [["", "All cities"]]);
    f.q.value = param("q");
    f.state.value = stateBySlug[param("state")] ? param("state") : "";
    updateCities();
    f.city.value = [].some.call(f.city.options, function (o) {
      return o.value === param("city");
    })
      ? param("city")
      : "";
    f.cat.value = [].some.call(f.cat.options, function (o) {
      return o.value === param("cat");
    })
      ? param("cat")
      : "";

    f.q.addEventListener("input", run);
    f.state.addEventListener("change", function () {
      updateCities();
      run();
    });
    f.city.addEventListener("change", run);
    f.cat.addEventListener("change", run);
    $("f-clear").addEventListener("click", reset);
    $("dest-empty-clear").addEventListener("click", reset);
    run();
  };

  pages.destination = function () {
    var d = destBySlug[param("d")];
    if (!d) return showNotFound();
    var st = stateBySlug[d.state];
    document.title = d.name + " | TravelBharat";

    setImage($("d-img"), destDetailImage(d.slug, 1), "", destImage(d.slug, 1));
    $("d-name").textContent = d.name;
    $("d-crumb").textContent = d.name;
    var crumb = $("d-crumb-state");
    crumb.textContent = st.name;
    crumb.href = "state.html?s=" + esc(st.slug);
    $("d-where").textContent =
      (d.city ? d.city + ", " : "") +
      st.name +
      (d.category ? " · " + d.category : "");
    $("d-about-title").textContent = "About " + d.name;
    $("d-full").textContent = d.full || d.short || "";

    /* optional sections only appear when data exists */
    if ((d.highlights || []).length) {
      d.highlights.forEach(function (h) {
        var li = document.createElement("li");
        li.textContent = h;
        $("d-highlights").appendChild(li);
      });
      $("d-hl-wrap").hidden = false;
    }
    if (d.best) {
      $("d-best").textContent = d.best;
      $("d-best-wrap").hidden = false;
    }
    if ((d.tips || []).length) {
      d.tips.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        $("d-tips").appendChild(li);
      });
      $("d-tips-wrap").hidden = false;
    }
    $("d-map").href =
      d.map ||
      "https://www.google.com/maps/search/?api=1&query=" +
        esc(d.name + ", " + st.name + ", India");

    /* gallery + lightbox */
    var photos = [];
    for (var i = 1; i <= GALLERY_SIZE; i++)
      photos.push({
        src: destDetailImage(d.slug, i),
        fallback: destImage(d.slug, i),
        alt: d.name + ", photo " + i + " of " + GALLERY_SIZE,
      });
    var lb = $("lightbox"),
      lbImg = $("lb-img"),
      lbCaption = $("lb-caption"),
      current = 0,
      opener = null;
    function show(i) {
      current = (i + photos.length) % photos.length;
      lbImg.classList.remove("is-missing");
      setImage(
        lbImg,
        photos[current].src,
        photos[current].alt,
        photos[current].fallback,
      );
      lbCaption.textContent =
        d.name + " · " + (current + 1) + " / " + photos.length;
    }
    function close() {
      lb.hidden = true;
      if (opener) opener.focus();
    }
    var gallery = $("d-gallery");
    photos.forEach(function (p, i) {
      var item = clone("tpl-gallery-item");
      var btn = item.querySelector("button");
      btn.setAttribute(
        "aria-label",
        "Open photo " + (i + 1) + " of " + photos.length + " of " + d.name,
      );
      setImage(item.querySelector("img"), p.src, p.alt, p.fallback);
      btn.addEventListener("click", function () {
        opener = btn;
        show(i);
        lb.hidden = false;
        $("lb-close").focus();
      });
      gallery.appendChild(item);
    });
    $("lb-close").addEventListener("click", close);
    $("lb-prev").addEventListener("click", function () {
      show(current - 1);
    });
    $("lb-next").addEventListener("click", function () {
      show(current + 1);
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    var related = (d.related || [])
      .map(function (slug) {
        return destBySlug[slug];
      })
      .filter(Boolean);
    if (related.length) {
      fill($("d-related"), related.map(destinationCard));
      $("d-related-wrap").hidden = false;
    }
  };

  /* ---------- boot ---------- */
  try {
    if (pages[page]) pages[page]();
  } catch (err) {
    console.error(err);
    if ($("not-found")) showNotFound();
  }
})();
