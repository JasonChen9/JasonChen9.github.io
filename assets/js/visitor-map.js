(() => {
  "use strict";

  const roots = document.querySelectorAll("[data-visitor-map-root]");

  if (!roots.length) {
    return;
  }

  const canonicalCode = (feature) => {
    const rawCode = String(feature?.properties?.ISO_A2_EH || "").toUpperCase();
    return rawCode === "TW" ? "CN" : rawCode;
  };

  const loadMap = async (root) => {
    if (root.dataset.initialized === "true") {
      return;
    }

    root.dataset.initialized = "true";

    const canvas = root.querySelector(".visitor-map-canvas");
    const loading = root.querySelector(".visitor-map-loading");
    const tooltip = root.querySelector(".visitor-map-tooltip");
    const summary = root.closest(".visitor-map")?.querySelector("[data-visitor-map-summary]");
    const language = root.dataset.language === "zh-CN" ? "zh-CN" : "en";
    const isChinese = language === "zh-CN";

    try {
      if (!window.d3) {
        throw new Error("D3 did not load");
      }

      const [visitorResponse, geoResponse] = await Promise.all([fetch(root.dataset.dataUrl), fetch(root.dataset.geoUrl)]);

      if (!visitorResponse.ok || !geoResponse.ok) {
        throw new Error("Map data did not load");
      }

      const [visitorData, geoData] = await Promise.all([visitorResponse.json(), geoResponse.json()]);
      const counts = visitorData.countries || {};
      const values = Object.values(counts).map(Number).filter(Number.isFinite);
      const maximum = Math.max(1, ...values);
      const colorScale = window.d3
        .scaleSqrt()
        .domain([1, Math.max(2, maximum)])
        .range(["#91aaff", "#2854ee"])
        .clamp(true);

      let regionNames;
      try {
        regionNames = new Intl.DisplayNames([language], { type: "region" });
      } catch (_error) {
        regionNames = null;
      }

      const regionName = (code, feature) => {
        if (code === "CN") {
          return isChinese ? "中国" : "China";
        }

        return regionNames?.of(code) || feature?.properties?.NAME_EN || feature?.properties?.NAME || code;
      };

      const width = 960;
      const height = 500;
      const projection = window.d3.geoNaturalEarth1().fitExtent(
        [
          [14, 18],
          [width - 14, height - 18],
        ],
        geoData
      );
      const path = window.d3.geoPath(projection);
      const titleId = `visitor-map-svg-title-${Math.random().toString(36).slice(2)}`;
      const descriptionId = `visitor-map-svg-description-${Math.random().toString(36).slice(2)}`;
      const svg = window.d3
        .select(canvas)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("role", "img")
        .attr("aria-labelledby", `${titleId} ${descriptionId}`);

      svg.append("title").attr("id", titleId).text(root.dataset.title);
      svg.append("desc").attr("id", descriptionId).text(root.dataset.description);

      const countries = svg
        .append("g")
        .selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("class", "visitor-map-country")
        .attr("data-region-code", (feature) => canonicalCode(feature))
        .attr("d", path)
        .style("--visitor-country-fill", (feature) => {
          const count = Number(counts[canonicalCode(feature)] || 0);
          return count > 0 ? colorScale(count) : null;
        });

      const setHighlighted = (code, highlighted) => {
        countries.classed("is-hovered", (feature) => highlighted && canonicalCode(feature) === code);
      };

      const positionTooltip = (event) => {
        const [pointerX, pointerY] = window.d3.pointer(event, canvas);
        const horizontalPadding = 72;
        const x = Math.min(Math.max(pointerX, horizontalPadding), canvas.clientWidth - horizontalPadding);
        const y = Math.max(pointerY, 54);

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      };

      const showTooltip = (event, feature) => {
        const code = canonicalCode(feature);
        const count = Number(counts[code] || 0);
        const viewLabel = isChinese
          ? `${count.toLocaleString(language)} 次浏览`
          : `${count.toLocaleString(language)} ${count === 1 ? "pageview" : "pageviews"}`;

        setHighlighted(code, true);
        tooltip.replaceChildren();

        const name = document.createElement("strong");
        const value = document.createElement("span");
        name.textContent = regionName(code, feature);
        value.textContent = viewLabel;
        tooltip.append(name, value);
        tooltip.hidden = false;
        positionTooltip(event);
      };

      countries
        .on("mouseenter", showTooltip)
        .on("mousemove", positionTooltip)
        .on("mouseleave", (_event, feature) => {
          setHighlighted(canonicalCode(feature), false);
          tooltip.hidden = true;
        });

      const total = Number(visitorData.total_pageviews || values.reduce((sum, value) => sum + value, 0));
      const regionCount = Object.values(counts).filter((value) => Number(value) > 0).length;

      if (summary) {
        summary.textContent = isChinese
          ? `${total.toLocaleString(language)} 次浏览 · ${regionCount.toLocaleString(language)} 个国家/地区`
          : `${total.toLocaleString(language)} ${total === 1 ? "view" : "views"} · ${regionCount.toLocaleString(language)} ${regionCount === 1 ? "region" : "regions"}`;
      }

      loading.hidden = true;
    } catch (_error) {
      loading.textContent = root.dataset.unavailable;
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            loadMap(entry.target);
          }
        });
      },
      { rootMargin: "180px" }
    );

    roots.forEach((root) => observer.observe(root));
  } else {
    roots.forEach(loadMap);
  }
})();
