(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const searchInput = document.getElementById("projectSearch");
  const filterButtons = Array.from(document.querySelectorAll(".filter"));
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const visibleCount = document.getElementById("visibleCount");
  const emptyState = document.getElementById("emptyState");
  const header = document.querySelector(".site-header");
  const year = document.getElementById("year");

  /* Theme ------------------------------------------------------------ */
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } }
  };
  const storedTheme = storage.get("porserx-theme");
  const themeParam = new URLSearchParams(location.search).get("theme");
  const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = themeParam === "light" || themeParam === "dark"
    ? themeParam
    : storedTheme || (systemLight ? "light" : "dark");
  setTheme(initialTheme);

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "light" ? "#f6f8fb" : "#080b12");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "light" ? "切换到深色主题" : "切换到浅色主题");
    }
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    setTheme(next);
    storage.set("porserx-theme", next);
  });

  /* Sticky header ---------------------------------------------------- */
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Project filter + search ------------------------------------------ */
  let activeFilter = "all";

  function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    let shown = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const haystack = `${card.dataset.search || ""} ${card.textContent || ""}`.toLowerCase();
      const categoryMatch = activeFilter === "all" || category === activeFilter;
      const queryMatch = !query || haystack.includes(query);
      const visible = categoryMatch && queryMatch;
      card.classList.toggle("is-hidden", !visible);
      if (visible) shown += 1;
    });

    if (visibleCount) visibleCount.textContent = String(shown);
    if (emptyState) emptyState.hidden = shown !== 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", applyFilters);
  applyFilters();

  /* Reveal on scroll ------------------------------------------------- */
  const revealTargets = [
    ...document.querySelectorAll(".project-card"),
    document.querySelector(".about-card"),
    document.querySelector(".section-heading"),
    document.querySelector(".project-toolbar")
  ].filter(Boolean);

  revealTargets.forEach((element) => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  /* Footer year ------------------------------------------------------ */
  if (year) year.textContent = String(new Date().getFullYear());

  /* Small polish: mark external links ------------------------------- */
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noreferrer noopener");
  });
})();
