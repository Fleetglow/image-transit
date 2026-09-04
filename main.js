// 交互与渲染逻辑——复刻自原 Next.js 版 components/site-shell.tsx
(function () {
  "use strict";

  var query = "";
  var sortKey = "rating";
  var sortDirection = "desc";

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function priceValue(price) {
    var values = String(price).match(/\d+(?:\.\d+)?/g) || [];
    return values.length ? Number(values[0]) : Number.POSITIVE_INFINITY;
  }

  // 复刻 renderNote：把 highlights 依次替换为带色 span/链接
  function renderNote(note, highlights) {
    if (!highlights || !highlights.length) return esc(note);
    var out = "";
    var rest = note;
    while (rest) {
      var matches = [];
      for (var i = 0; i < highlights.length; i++) {
        var index = rest.indexOf(highlights[i].text);
        if (index >= 0) matches.push({ highlight: highlights[i], index: index });
      }
      matches.sort(function (a, b) { return a.index - b.index; });
      if (!matches.length) { out += esc(rest); break; }
      var match = matches[0];
      var highlight = match.highlight;
      if (match.index) out += esc(rest.slice(0, match.index));
      var cls = "note-highlight " + highlight.color + (highlight.code ? " code" : "");
      var inner = esc(highlight.text);
      out += highlight.url
        ? '<a class="' + cls + '" href="' + esc(highlight.url) + '" target="_blank" rel="noreferrer">' + inner + "</a>"
        : '<span class="' + cls + '">' + inner + "</span>";
      rest = rest.slice(match.index + highlight.text.length);
    }
    return out;
  }

  function sortChannels(rows) {
    return rows.slice().sort(function (a, b) {
      if (sortKey === "rating") {
        var ratingResult = sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating;
        return ratingResult || priceValue(a.price) - priceValue(b.price) || a.name.localeCompare(b.name);
      }
      var priceResult = sortDirection === "asc" ? priceValue(a.price) - priceValue(b.price) : priceValue(b.price) - priceValue(a.price);
      return priceResult || b.rating - a.rating || a.name.localeCompare(b.name);
    });
  }

  function matchingChannels() {
    var lower = query.toLowerCase();
    return CHANNELS.filter(function (channel) {
      var text = (channel.name + " " + channel.note + " " + channel.url).toLowerCase();
      return !query || text.includes(lower);
    });
  }

  function channelRowHtml(channel) {
    return (
      '<tr>' +
      '<td><span class="channel-name">' + esc(channel.name) + '</span><a class="channel-url" href="' + esc(channel.url) + '" target="_blank" rel="noreferrer">' + esc(channel.url) + "</a></td>" +
      '<td><span class="rating">' + channel.rating + '.0 <span class="rating-bar"><span style="width:' + channel.rating * 10 + '%"></span></span></span></td>' +
      '<td class="price">' + esc(channel.price) + "</td>" +
      '<td class="note">' + renderNote(channel.note, channel.highlights) + "</td>" +
      "</tr>"
    );
  }

  function renderTable(tbodyId, emptyId, countId, billing) {
    var rows = sortChannels(matchingChannels().filter(function (channel) { return channel.billing === billing; }));
    var tbody = document.getElementById(tbodyId);
    tbody.innerHTML = rows.map(channelRowHtml).join("");
    document.getElementById(emptyId).hidden = rows.length !== 0;
    document.getElementById(countId).textContent = rows.length + " CHANNELS";
  }

  function sortLabel() {
    if (sortDirection === "asc") return "↑";
    return "↓";
  }

  function refreshSortButtons() {
    ["rating", "price"].forEach(function (key) {
      ["", "2"].forEach(function (suffix) {
        var button = document.getElementById("sort-" + key + suffix);
        var arrow = document.getElementById("arrow-" + key + suffix);
        if (!button || !arrow) return;
        if (sortKey === key) {
          button.classList.add("active");
          arrow.textContent = sortLabel();
        } else {
          button.classList.remove("active");
          arrow.textContent = "↕";
        }
      });
    });
  }

  function renderAll() {
    renderTable("rows-metered", "empty-metered", "count-metered", "按量计费");
    renderTable("rows-prepaid", "empty-prepaid", "count-prepaid", "按次计费");
    refreshSortButtons();
  }

  function toggleSort(nextKey) {
    if (sortKey === nextKey) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortKey = nextKey;
      sortDirection = nextKey === "rating" ? "desc" : "asc";
    }
    renderAll();
  }

  // 主题切换
  var themeIcon = document.getElementById("theme-icon");
  function isDark() {
    return document.documentElement.dataset.theme === "dark";
  }
  function syncThemeIcon() {
    themeIcon.src = isDark() ? "./icons/mode-light.svg" : "./icons/mode-dark.svg";
  }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    syncThemeIcon();
  });
  syncThemeIcon();

  // 搜索
  document.getElementById("search").addEventListener("input", function (event) {
    query = event.target.value.trim();
    renderAll();
  });

  // 排序按钮（两套 id，同一逻辑）
  ["", "2"].forEach(function (suffix) {
    document.getElementById("sort-rating" + suffix).addEventListener("click", function () { toggleSort("rating"); });
    document.getElementById("sort-price" + suffix).addEventListener("click", function () { toggleSort("price"); });
  });

  // 顶部统计
  document.getElementById("stat-total").textContent = CHANNELS.length;
  document.getElementById("stat-top").textContent = CHANNELS.filter(function (item) { return item.rating >= 8; }).length;

  // 生成平台
  document.getElementById("count-platforms").textContent = PLATFORMS.length + " TOOLS";
  document.getElementById("platform-grid").innerHTML = PLATFORMS.map(function (platform) {
    var links = platform.links.map(function (link) {
      return '<a href="' + esc(link.url) + '" target="_blank" rel="noreferrer">' + esc(link.label) + " ↗</a>";
    }).join("");
    return (
      '<article class="platform"><div><h3>' + esc(platform.name) + '</h3><p class="platform-note">' + esc(platform.note) + "</p></div>" +
      '<div class="platform-bottom"><div class="platform-links">' + links + "</div>" +
      '<div class="ratio"><strong>' + (platform.customRatio ? "支持" : "不支持") + "</strong>自定义比例</div></div></article>"
    );
  }).join("");

  renderAll();
})();
