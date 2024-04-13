const language = {
    en: {
        title: "Vancomycin AUC24 Calculator",
        description: "The critical assumption of these calculations is that the patient has achieved Vancomycin steady-state.",
        targetAUC24: "Target AUC24 is 400-600 μg/mL x hr",
        inputs: {
            title: "Inputs",
            dose: "Each Dose (mg)",
            tau: "Tau (hours)",
            tinf: "Tinf (hours)",
            peak: "Measured Peak (μg/mL)",
            t1: "T1 (hours)",
            trough: "Measured Trough (μg/mL)",
            t2: "T2 (hours)",
            calculate: "Calculate"
        },
        results: {
            title: "Results AUC24",
            auc24: "AUC 24 = ",
            warning: "Warning: this value is outside the 400-600 target range.",
            dosageAdvice: "You are currently administering ",
            considerAdjusting: "Consider adjusting the daily dose to "
        },
        prediction: {
            title: "Prediction",
            newDose: "New Dose (mg)",
            newTau: "New Tau (hours)",
            newTinf: "New Tinf (hours)",
            calculatePrediction: "Calculate Prediction"
        },
        footer: "&copy; Alexandre Trieste 2024 - all rights reserved"
    },
    pt: {
        title: "Calculadora de AUC24 de Vancomicina",
        description: "Pressupõe-se que o paciente atingiu o estado de equilíbrio de Vancomicina.",
        targetAUC24: "AUC24 alvo é de 400-600 μg/mL x h",
        inputs: {
            title: "Dados",
            dose: "Dose (mg)",
            tau: "Intervalo entre doses - Tau (horas)",
            tinf: "Tempo de infusão (horas)",
            peak: "Pico aferido (μg/mL)",
            t1: "Tempo do início da administração até a coleta (horas)",
            trough: "Vale aferido (μg/mL)",
            t2: "Tempo decorrido da administração até a coleta do vale (horas)",
            calculate: "Calcular"
        },
        results: {
            title: "Resultado da AUC24",
            auc24: "AUC 24 = ",
            warning: "Atenção: este valor está fora da faixa-alvo de 400-600.",
            dosageAdvice: "Atualmente, você está administrando ",
            considerAdjusting: "Considere ajustar a dose diária para "
        },
        prediction: {
            title: "Simulação de ajuste",
            newDose: "Nova Dose (mg)",
            newTau: "Novo Intervalo entre doses - Tau (horas)",
            newTinf: "Novo Tempo de infusão (horas)",
            calculatePrediction: "Calcular Previsão"
        },
        footer: "&copy; Alexandre Trieste 2024 - todos os direitos reservados"
    }
};

function setLanguage(lang) {
    const selectedLanguage = language[lang];

   
    document.title = selectedLanguage.title;
    document.querySelector(".description").innerText = selectedLanguage.description;
    document.querySelector(".targetAUC24").innerText = selectedLanguage.targetAUC24;

    const inputs = selectedLanguage.inputs;
    document.querySelector("#inputs h2").innerText = inputs.title;
    document.querySelector("label[for='dose']").innerText = inputs.dose;
    document.querySelector("label[for='tau']").innerText = inputs.tau;
    document.querySelector("label[for='tinf']").innerText = inputs.tinf;
    document.querySelector("label[for='peak']").innerText = inputs.peak;
    document.querySelector("label[for='t1']").innerText = inputs.t1;
    document.querySelector("label[for='trough']").innerText = inputs.trough;
    document.querySelector("label[for='t2']").innerText = inputs.t2;
    document.getElementById("calculate").innerText = inputs.calculate;

   
    const results = selectedLanguage.results;
    document.getElementById("resultsTitle").innerText = results.title;
    document.getElementById("auc24Text").innerText = results.auc24;
    document.getElementById("warningText").innerText = results.warning;
    document.getElementById("dosageAdviceText").innerText = results.dosageAdvice;
    document.getElementById("considerAdjustingText").innerText = results.considerAdjusting;

    const prediction = selectedLanguage.prediction;
    document.getElementById("predictionTitle").innerText = prediction.title;
    document.querySelector("label[for='newDose']").innerText = prediction.newDose;
    document.querySelector("label[for='newTau']").innerText = prediction.newTau;
    document.querySelector("label[for='newTinf']").innerText = prediction.newTinf;
    document.getElementById("calculatePrediction").innerText = prediction.calculatePrediction;

    
    document.querySelector("footer p").innerHTML = selectedLanguage.footer;
}

setLanguage("en");
