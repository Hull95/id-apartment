"use client";

import { useEffect } from "react";

/** Sva klijentska interaktivnost: loader, scroll reveal, nav, progress, FAQ, hero dots */
export function ClientEffects() {
  useEffect(() => {
    // Na svaki refresh vrati na vrh (bez vraćanja zapamćene pozicije skrola)
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Loader
    const intro = document.getElementById("intro");
    const t = setTimeout(() => {
      intro?.classList.add("done");
      document.body.classList.add("ready");
    }, 1700);

    // Scroll reveal
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // Nav + progress
    const nav = document.getElementById("nav");
    const progress = document.getElementById("progress");
    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 10);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (window.scrollY / h) * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // FAQ — accordion: otvaranje jednog zatvara ostala
    const faqHandlers: Array<() => void> = [];
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const q = item.querySelector(".faq-q");
      const handler = () => {
        const willOpen = !item.classList.contains("open");
        faqItems.forEach((other) => other.classList.remove("open"));
        if (willOpen) item.classList.add("open");
      };
      q?.addEventListener("click", handler);
      faqHandlers.push(() => q?.removeEventListener("click", handler));
    });

    // Glatki skrol do sekcija — bez #hash u URL-u (ostaje /sr)
    const anchorHandlers: Array<() => void> = [];
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      const handler = (e: Event) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      a.addEventListener("click", handler);
      anchorHandlers.push(() => a.removeEventListener("click", handler));
    });

    // Hero dots
    const dots = document.querySelectorAll(".hero-dots i");
    let hi = 0;
    const dotTimer = setInterval(() => {
      hi = (hi + 1) % 4;
      dots.forEach((d, i) => d.classList.toggle("on", i === hi));
    }, 6000);

    return () => {
      clearTimeout(t);
      clearInterval(dotTimer);
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      faqHandlers.forEach((fn) => fn());
      anchorHandlers.forEach((fn) => fn());
    };
  }, []);

  return null;
}
