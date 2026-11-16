"use strict";

// Kontakty doplňte na tomto místě. Propíší se na obě stránky s formulářem.
const kontakt = {
  email: "",
  telefon: "+420 737 502 906"
};

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#hlavni-menu");

if (menuButton && nav) {
  document.documentElement.classList.add("menu-ready");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") === "false");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      if (menuButton.offsetWidth) menuButton.focus();
    }
  });
}

document.querySelector("#rok").textContent = new Date().getFullYear();

for (const field of document.querySelectorAll("[data-contact]")) {
  const type = field.dataset.contact;
  const value = kontakt[type].trim();
  if (!value) continue;

  const link = document.createElement("a");
  link.href = type === "email" ? "mailto:" + value : "tel:" + value.replace(/[^+\d]/g, "");
  link.textContent = value;
  field.replaceChildren(link);
}

const form = document.querySelector("#poptavka-form");
if (form) {
  const status = document.querySelector("#form-status");
  const draft = document.querySelector("#draft");
  const draftText = document.querySelector("#draft-text");
  const topic = form.elements.namedItem("tema");

  if (new URLSearchParams(window.location.search).get("tema") === "oslava") {
    topic.value = "Svatba nebo oslava";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const subject = topic.value === "Silvestr 2026"
      ? "Poptávka – Silvestr 30. 12. 2026 až 2. 1. 2027"
      : "Poptávka – " + topic.value;
    const body = [
      subject,
      "",
      "Jméno: " + data.get("jmeno"),
      "E-mail: " + data.get("email"),
      "Telefon: " + (data.get("telefon") || "neuveden"),
      "Počet osob: " + (data.get("osoby") || "neuveden"),
      "",
      "Zpráva:",
      data.get("zprava") || "Bez doplňující zprávy"
    ].join("\r\n");

    draftText.value = body;
    draft.hidden = false;

    if (!kontakt.email.trim()) {
      status.textContent = "Kontaktní e-mail zatím chybí. Text poptávky si můžete zkopírovat.";
      return;
    }

    status.textContent = "Zprávu odešlete ze své e-mailové aplikace. Pokud se neotevře, text si můžete zkopírovat níže.";
    window.location.href = "mailto:" + kontakt.email.trim() +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  form.querySelector('button[type="submit"]').disabled = false;
}
