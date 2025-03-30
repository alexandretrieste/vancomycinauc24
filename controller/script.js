import { translations } from './i18n.js'

function getCurrentLang() {
  return localStorage.getItem('lang') || 'pt-BR'
}

let calculationData = {
  ke: null,
  truePeak: null,
  trueTrough: null,
  vd: null,
  cl: null,
  dose: null,
  tau: null,
  tinf: null,
  auc24: null
}

export function calculate() {
  const dose = parseFloat(document.getElementById('dose').value)
  const tau = parseFloat(document.getElementById('tau').value)
  const tinf = parseFloat(document.getElementById('tinf').value)
  const peak = parseFloat(document.getElementById('peak').value)
  const t1 = parseFloat(document.getElementById('t1').value)
  const trough = parseFloat(document.getElementById('trough').value)
  const t2 = parseFloat(document.getElementById('t2').value)
  calculationData.ke = Math.log(peak / trough) / (t2 - t1)
  calculationData.truePeak = peak / Math.exp(-calculationData.ke * (t1 - tinf))
  calculationData.trueTrough = trough * Math.exp(-calculationData.ke * (tau - t2))
  const aucInf = ((calculationData.trueTrough + calculationData.truePeak) / 2) * tinf
  const aucElim = (calculationData.truePeak - calculationData.trueTrough) / calculationData.ke
  calculationData.auc24 = (aucInf + aucElim) * (24 / tau)
  calculationData.vd = null
  calculationData.cl = null
  calculationData.dose = dose
  calculationData.tau = tau
  calculationData.tinf = tinf
  document.getElementById('auc24').innerText = 'AUC 24 = ' + calculationData.auc24.toFixed(0) + ' μg/mL x h'
  if (calculationData.auc24 < 400 || calculationData.auc24 > 600) {
    const idealDose400 = Math.round((400 * dose) / calculationData.auc24 / (tau / 24))
    const idealDose600 = Math.round((600 * dose) / calculationData.auc24 / (tau / 24))
    const daily = (dose / (tau / 24)).toFixed(0)
    const lang = getCurrentLang()
    const warnTemplate = translations[lang].warningOutOfRange || 'Warning: this value is outside the 400-600 target range.\nYou are currently administering {current} mg per day.\nConsider adjusting the daily dose to {low} to {high} mg per day.'
    const message = warnTemplate.replace('{current}', daily).replace('{low}', idealDose400).replace('{high}', idealDose600)
    document.getElementById('warning').innerText = message
    document.getElementById('warning').style.display = 'block'
  } else {
    document.getElementById('warning').style.display = 'none'
  }
}

export function predict() {
  const newDose = parseFloat(document.getElementById('newDose').value)
  const newTau = parseFloat(document.getElementById('newTau').value)
  const newTinf = parseFloat(document.getElementById('newTinf').value)
  if (!calculationData.ke || !calculationData.truePeak || !calculationData.trueTrough || !calculationData.dose || !calculationData.tau || !calculationData.tinf) {
    const lang = getCurrentLang()
    const errorMsg = translations[lang].errorCalcFirst || 'Error: Please calculate AUC24 first.'
    alert(errorMsg)
    return
  }
  if (!calculationData.vd) {
    calculationData.vd = (calculationData.dose * (1 - Math.exp(-calculationData.ke * calculationData.tinf))) / (calculationData.tinf * calculationData.ke * (calculationData.truePeak - calculationData.trueTrough * Math.exp(-calculationData.ke * calculationData.tinf)))
  }
  if (!calculationData.cl) {
    calculationData.cl = calculationData.vd * calculationData.ke
  }
  const predictedPeak = (newDose / (calculationData.cl * newTinf)) * (1 - Math.exp(-calculationData.ke * newTinf)) / (1 - Math.exp(-calculationData.ke * newTau))
  const predictedTrough = predictedPeak * Math.exp(-calculationData.ke * (newTau - newTinf))
  const predictedAUC24 = (newDose * calculationData.auc24) / calculationData.dose
  document.getElementById('predictedAUC24').innerText = 'Predicted AUC 24 = ' + predictedAUC24.toFixed(0) + ' μg/mL x h'
  document.getElementById('predictedPeak').innerText = 'Predicted Peak = ' + predictedPeak.toFixed(1) + ' μg/mL'
  document.getElementById('predictedTrough').innerText = 'Predicted Trough = ' + predictedTrough.toFixed(1) + ' μg/mL'
}

export function updateT2Difference() {
  const peakTimeValue = document.getElementById('peakTime').value
  const troughTimeValue = document.getElementById('troughTime').value
  if (!peakTimeValue || !troughTimeValue) {
    return
  }
  const peakDate = new Date(peakTimeValue)
  const troughDate = new Date(troughTimeValue)
  const diffMs = troughDate - peakDate
  const diffHours = diffMs / (1000 * 60 * 60)
  document.getElementById('t2').value = diffHours.toFixed(2)
}

window.calculate = calculate
window.predict = predict
window.updateT2Difference = updateT2Difference
