/* Drobné interakce. Pro skutečné odesílání formuláře je potřeba server nebo formulářová služba. */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#hlavni-menu");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      const label = menuToggle.querySelector(".sr-only");
      if (label) label.textContent = isOpen ? "Zavřít navigaci" : "Otevřít navigaci";
    });
    navLinks.forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      const label = menuToggle.querySelector(".sr-only");
      if (label) label.textContent = "Otevřít navigaci";
    }));
  }

  const year = document.querySelector("#rok");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#poptavka-form");
  const status = document.querySelector("#form-status");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      // DOPLŇTE skutečnou kontaktní adresu, než web zveřejníte.
      const recipient = "DOPLNIT-EMAIL@example.cz";
      if (recipient.includes("DOPLNIT-EMAIL")) {
        if (status) status.textContent = "Formulář ještě není nastavený: v souboru script.js doplňte skutečný kontaktní e-mail.";
        return;
      }

      const data = new FormData(form);
      const subject = "Poptávka silvestrovského pobytu 28. 12. 2026 – 1. 1. 2027";
      const body = [
        "Poptávka silvestrovského pobytu",
        "",
        `Jméno: ${data.get("jmeno")}`,
        `E-mail: ${data.get("email")}`,
        `Telefon: ${data.get("telefon") || "neuveden"}`,
        `Počet osob: ${data.get("osoby")}`,
        "",
        "Zpráva:",
        data.get("zprava") || "Bez doplňující zprávy"
      ].join("\n");

      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (status) status.textContent = "Otevírá se váš e-mailový program. Zkontrolujte zprávu a odešlete ji.";
    });
  }
});
