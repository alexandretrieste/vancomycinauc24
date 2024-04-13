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
};

function calculate() {
    let dose = parseFloat(document.getElementById('dose').value);
    let tau = parseFloat(document.getElementById('tau').value); // em horas
    let tinf = parseFloat(document.getElementById('tinf').value);
    let peak = parseFloat(document.getElementById('peak').value);
    let t1 = parseFloat(document.getElementById('t1').value);
    let trough = parseFloat(document.getElementById('trough').value);
    let t2 = parseFloat(document.getElementById('t2').value);

    calculationData.ke = Math.log(peak / trough) / (t2 - t1);

    calculationData.truePeak = peak / Math.exp(-calculationData.ke * (t1 - tinf));

    calculationData.trueTrough = trough * Math.exp(-calculationData.ke * (tau - t2));

    let aucInf = (calculationData.trueTrough + calculationData.truePeak) / 2 * (tinf);

    let aucElim = (calculationData.truePeak - calculationData.trueTrough) / calculationData.ke;

    calculationData.auc24 = (aucInf + aucElim) * (24 / tau);

    calculationData.vd = null;
    calculationData.cl = null;
    calculationData.dose = dose;
    calculationData.tau = tau;
    calculationData.tinf = tinf;

    
    document.getElementById('auc24').innerText = `AUC 24 = ${calculationData.auc24.toFixed(0)} μg/mL x h`;
    
    if (calculationData.auc24 < 400 || calculationData.auc24 > 600) {
        
        let idealDose400 = Math.round((400 * dose) / calculationData.auc24 / (tau / 24));
        
        let idealDose600 = Math.round((600 * dose) / calculationData.auc24 / (tau / 24));

        let message = `Warning: this value is outside the 400-600 target range.\n`;
        message += `You are currently administering ${dose / (tau / 24)}mg per day.\n`;
        message += `Consider adjusting the daily dose to ${idealDose400} to ${idealDose600}mg per day.`;

        document.getElementById('warning').innerText = message;
        document.getElementById('warning').style.display = 'block';
    } else {
        document.getElementById('warning').style.display = 'none';
    }
}

function predict() {
    let newDose = parseFloat(document.getElementById('newDose').value);
    let newTau = parseFloat(document.getElementById('newTau').value);
    let newTinf = parseFloat(document.getElementById('newTinf').value);

    if (!calculationData.ke || !calculationData.truePeak || !calculationData.trueTrough || !calculationData.dose || !calculationData.tau || !calculationData.tinf) {
        
        alert("Error: Please calculate AUC24 first.");
        return;
    }

    if (!calculationData.vd) {
        calculationData.vd = (calculationData.dose * (1 - Math.exp(-calculationData.ke * calculationData.tinf))) / (calculationData.tinf * calculationData.ke * (calculationData.truePeak - (calculationData.trueTrough * Math.exp(-calculationData.ke * calculationData.tinf))));
    }

    
    if (!calculationData.cl) {
        calculationData.cl = calculationData.vd * calculationData.ke;
    }

    
    let predictedPeak = (newDose / (calculationData.cl * newTinf)) * (1 - Math.exp(-calculationData.ke * newTinf)) / (1 - Math.exp(-calculationData.ke * newTau));

    
    let predictedTrough = predictedPeak * Math.exp(-calculationData.ke * (newTau - newTinf));

    
    let predictedAUC24 = (newDose * calculationData.auc24) / calculationData.dose;

    
    document.getElementById('predictedAUC24').innerText = `Predicted AUC 24 = ${predictedAUC24.toFixed(0)}μg/mL x h`;
    document.getElementById('predictedPeak').innerText = `Predicted Peak = ${predictedPeak.toFixed(1)}μg/mL`;
    document.getElementById('predictedTrough').innerText = `Predicted Trough = ${predictedTrough.toFixed(1)}μg/mL`;
}
