"use strict";

// Keep this page usable from file:// as well as a GitHub Pages project path.
const difficultyProfiles = [
  { name: "Pre-Med", rate: 1, description: "Pre-Med: no time limit. Find your rhythm and learn the grid at your own pace." },
  { name: "Intern", rate: 1.25, description: "Intern: a faster pace, a countdown, and a time bonus. Put your route to the test." },
  { name: "Resident", rate: 100 / 60, description: "Resident: less time to hesitate. Faster movement makes every pivot count." },
  { name: "Specialist", rate: 2.5, description: "Specialist: the fastest of the four original modes. Precision and planning pay off." }
];
const tempoPanel = document.querySelector(".tempo-panel");
const animationToggle = document.getElementById("animation-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let manuallyPaused = reducedMotion.matches;

function updateAnimationState() {
  tempoPanel.classList.toggle("is-paused", manuallyPaused || document.hidden);
  animationToggle.setAttribute("aria-pressed", String(manuallyPaused));
  animationToggle.setAttribute("aria-label", manuallyPaused ? "Play the tempo preview" : "Pause the tempo preview");
  animationToggle.textContent = manuallyPaused ? "Play ▷" : "Pause Ⅱ";
  // Reduced-motion users can explicitly start the preview.
  tempoPanel.querySelector(".tempo-wand").style.animationPlayState = manuallyPaused || document.hidden ? "paused" : "running";
}

document.querySelectorAll("[data-difficulty]").forEach((button) => {
  button.addEventListener("click", () => {
    const profile = difficultyProfiles[Number(button.dataset.difficulty)];
    if (!profile) return;
    document.querySelectorAll("[data-difficulty]").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    document.documentElement.style.setProperty("--spin-duration", `${5.05 / profile.rate}s`);
    document.getElementById("tempo-name").textContent = profile.name;
    document.getElementById("tempo-rate").textContent = `${profile.rate.toFixed(2)}×`;
    document.getElementById("difficulty-note").textContent = profile.description;
  });
});
animationToggle.addEventListener("click", () => { manuallyPaused = !manuallyPaused; updateAnimationState(); });
document.addEventListener("visibilitychange", updateAnimationState);
reducedMotion.addEventListener("change", (event) => { manuallyPaused = event.matches; updateAnimationState(); });
updateAnimationState();

const screenshotModal = document.getElementById("screenshot-modal");
screenshotModal.addEventListener("show.bs.modal", (event) => {
  const trigger = event.relatedTarget;
  if (!trigger?.dataset.image) return;
  const image = document.getElementById("screenshot-modal-image");
  image.src = trigger.dataset.image;
  image.alt = trigger.querySelector("img").alt;
  document.getElementById("screenshot-modal-title").textContent = trigger.dataset.caption;
});

document.querySelectorAll("#navigation a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    const navigation = document.getElementById("navigation");
    if (navigation.classList.contains("show") && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(navigation).hide();
    }
  });
});

let copyTimer;
document.getElementById("copy-command").addEventListener("click", async () => {
  const code = document.getElementById("clone-command");
  const button = document.getElementById("copy-command");
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText(code.textContent.trim());
    button.textContent = "Copied ✓";
    status.textContent = "Commands copied to your clipboard.";
  } catch {
    // Local files and restricted browsers may not expose the Clipboard API.
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = "Commands selected. Press ⌘C (or Ctrl+C) to copy.";
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => { button.textContent = "Copy ⧉"; status.textContent = ""; }, 5000);
});
