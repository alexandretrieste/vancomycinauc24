// controller/accessibility.js

export function toggleContrast() {
  // remove night-mode
  document.body.classList.remove('night-mode');

  const isContrast = document.body.classList.toggle('high-contrast');
  localStorage.setItem('highContrast', isContrast ? 'true' : 'false');
}

export function toggleNightMode() {
  // remove high-contrast
  document.body.classList.remove('high-contrast');

  const isNight = document.body.classList.toggle('night-mode');
  localStorage.setItem('nightMode', isNight ? 'true' : 'false');
}
