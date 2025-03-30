import { updateLanguage } from './i18n.js'
import { toggleContrast, toggleNightMode } from './accessibility.js'

function setLanguage(lang) {
  updateLanguage(lang)
  localStorage.setItem('lang', lang)
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'pt-BR'
  updateLanguage(savedLang)

  const nightPref = localStorage.getItem('nightMode') === 'true'
  if (nightPref) {
    document.body.classList.add('night-mode')
  }

  const contrastPref = localStorage.getItem('highContrast') === 'true'
  if (contrastPref) {
    document.body.classList.add('high-contrast')
  }

  const btnNight = document.getElementById('btnNightMode')
  if (btnNight) {
    btnNight.addEventListener('click', () => toggleNightMode())
  }

  const btnContrast = document.getElementById('btnContrastMode')
  if (btnContrast) {
    btnContrast.addEventListener('click', () => toggleContrast())
  }

  const btnPT = document.getElementById('btnPT')
  if (btnPT) {
    btnPT.addEventListener('click', () => setLanguage('pt-BR'))
  }

  const btnCA = document.getElementById('btnCA')
  if (btnCA) {
    btnCA.addEventListener('click', () => setLanguage('en-CA'))
  }

  const btnFR = document.getElementById('btnFR')
  if (btnFR) {
    btnFR.addEventListener('click', () => setLanguage('fr-FR'))
  }
})

window.setLanguage = setLanguage
