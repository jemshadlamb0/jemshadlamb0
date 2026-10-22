(() => {
  "use strict";
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const metricGrid = $("#metric-grid");
  const socialGrid = $("#social-grid");
  const contentGrid = $("#content-grid");

  const metricItems = [
    { key: "instagram", caption: "FOLLOWERS", index: "01" },
    { key: "youtube", caption: "SUBSCRIBERS", index: "02" },
    { key: "linkedin", caption: "FOLLOWERS", index: "03" },
    { key: "facebook", caption: "FOLLOWERS", index: "04" },
    { key: "github", caption: "PUBLIC REPOS", index: "05", liveRepos: true }
  ];
  if (metricGrid) {
    metricGrid.innerHTML = metricItems.map((item) => {
      const platform = data.socials.find((entry) => entry.key === item.key) || {};
      const number = item.liveRepos ? "—" : (platform.count || "—");
      return '<article class="metric-card"><div class="metric-topline"><span>' +
        escapeHtml(platform.name || item.key) + '</span><span class="metric-index">' + escapeHtml(item.index) +
        '</span></div><div class="metric-number"' + (item.liveRepos ? ' id="github-repo-count"' : '') + '>' +
        escapeHtml(number) + '</div><div class="metric-label">' + escapeHtml(item.caption) + '</div></article>';
    }).join("");
  }

  if (socialGrid) {
    socialGrid.innerHTML = data.socials.map((item) => {
      const href = item.href || "";
      const link = href
        ? '<a class="social-visit" href="' + escapeHtml(href) + '" target="_blank" rel="noreferrer">Visit profile <span aria-hidden="true">↗</span></a>'
        : '<span class="social-visit disabled" title="Add the profile URL in creator-data.js">Profile link needed <span aria-hidden="true">⌨</span></span>';
      const category = item.liveGithub ? "LIVE DATA" : item.category;
      return '<article class="social-card" style="--platform-color:var(--platform-' + escapeHtml(item.key) + ',var(--red))">' +
        '<div class="social-card-top"><span class="platform-mark ' + escapeHtml(item.key) + '" aria-hidden="true">' +
        escapeHtml(item.mark) + '</span><span class="platform-type">' + escapeHtml(category) + '</span></div>' +
        '<div><h3>' + escapeHtml(item.name) + '</h3><div class="social-handle">' + escapeHtml(item.handle) +
        '</div></div><div class="social-card-bottom"><div><div class="social-count"' +
        (item.liveGithub ? ' id="github-follower-count"' : '') + '>' + escapeHtml(item.count) +
        '</div><span class="social-count-label">' + escapeHtml(item.metric) + '</span></div>' + link +
        '</div></article>';
    }).join("");
  }

  if (contentGrid) {
    contentGrid.innerHTML = data.content.map((item) =>
      '<article class="content-card"><div class="content-card-head"><span>CONTENT PILLAR</span><span class="content-num">' +
      escapeHtml(item.number) + '</span></div><div class="content-symbol" aria-hidden="true">' +
      escapeHtml(item.symbol) + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' +
      escapeHtml(item.description) + '</p><div class="content-card-head"><span>' +
      escapeHtml(item.format) + '</span></div><a href="' + escapeHtml(item.href) +
      '" target="_blank" rel="noreferrer">' + escapeHtml(item.linkLabel) +
      ' <span aria-hidden="true">↗</span></a></article>'
    ).join("");
  }

  const year = $("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuToggle = $(".menu-toggle");
  const nav = $("#main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const revealTargets = document.querySelectorAll(".section-heading, .about-lead, .about-details, .metric-card, .social-card, .content-card, .toolkit-item");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((item) => item.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach((item) => observer.observe(item));
  }

  fetch("https://api.github.com/users/" + encodeURIComponent(data.creator.handle), {
    headers: { "Accept": "application/vnd.github+json" }
  }).then((response) => {
    if (!response.ok) throw new Error("GitHub profile request failed");
    return response.json();
  }).then((profile) => {
    const followerNode = $("#github-follower-count");
    const repoNode = $("#github-repo-count");
    if (followerNode && Number.isFinite(profile.followers)) followerNode.textContent = profile.followers.toLocaleString("en-IN");
    if (repoNode && Number.isFinite(profile.public_repos)) repoNode.textContent = profile.public_repos.toLocaleString("en-IN");
  }).catch(() => {
    const repoNode = $("#github-repo-count");
    if (repoNode) repoNode.textContent = "—";
  });
})();