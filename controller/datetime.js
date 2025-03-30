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
  window.updateT2Difference = updateT2Difference
  