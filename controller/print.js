import { translations } from './i18n.js'

export async function printReport() {
  const lang = localStorage.getItem('lang') || 'pt-BR'
  const t = translations[lang]

  const get = (id) => document.getElementById(id)?.value || ''
  const getText = (id) => document.getElementById(id)?.textContent || ''
  const formatDateTime = (value) => value ? new Date(value).toLocaleString(lang) : ''

  const data = {
    title: t.printReportTitle,
    sectionInputs: t.printSectionInputs,
    sectionResults: t.printSectionResults,
    footerText: t.printFooterText,
    eachDoseLabel: t.eachDoseLabel,
    intervalLabel: t.intervalLabel,
    infusionTimeLabel: t.infusionTimeLabel,
    peakLabel: t.peakLabel,
    timeAfterLabel: t.timeAfterLabel,
    troughLabel: t.troughLabel,
    peakTimeLabel: t.peakTimeLabel,
    troughTimeLabel: t.troughTimeLabel,
    estimateInfusionTimeLabel: t.printEstimateInfusionTime,
    dose: get('dose'),
    tau: get('tau'),
    tinf: get('tinf'),
    peak: get('peak'),
    t1: get('t1'),
    trough: get('trough'),
    peakTime: formatDateTime(get('peakTime')),
    troughTime: formatDateTime(get('troughTime')),
    estimateInfusionTime: (() => {
      const peakTime = get('peakTime')
      const t1 = parseFloat(get('t1'))
      const tinf = parseFloat(get('tinf'))
      if (!peakTime || isNaN(t1) || isNaN(tinf)) return ''
      const peakDate = new Date(peakTime)
      const infusionStart = new Date(peakDate.getTime() - (t1 + tinf) * 60 * 60 * 1000)
      return infusionStart.toLocaleString(lang)
    })(),
    auc24: getText('auc24'),
    warning: getText('warning')
  }

  const htmlText = await fetch('./partials/print.html').then(res => res.text())
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlText, 'text/html')
  const container = doc.body.querySelector('.print-container')

  Object.entries(data).forEach(([key, value]) => {
    const el = container.querySelector(`[data-id="${key}"]`)
    if (el) el.innerHTML = value
  })

  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>${t.printReportTitle}</title>
        <link rel="stylesheet" href="./styles/print.css">
      </head>
      <body>${container.outerHTML}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  printWindow.close()
}

window.printReport = printReport
