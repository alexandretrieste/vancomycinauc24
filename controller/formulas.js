
export function calcularKe(pico, vale, t2, t1) {
  return Math.log(pico / vale) / (t2 - t1);
}

export function calcularPicoReal(picoMedido, ke, t1, tinf) {
  return picoMedido / Math.exp(-ke * (t1 - tinf));
}

export function calcularValeReal(valeMedido, ke, tau, t2) {
  return valeMedido * Math.exp(-ke * (tau - t2));
}

export function calcularAUCinf(picoReal, valeReal, tinf) {
  return ((picoReal + valeReal) / 2) * tinf;
}

export function calcularAUCelim(picoReal, valeReal, ke) {
  return (picoReal - valeReal) / ke;
}

export function calcularAUC24(aucinf, aucelim, tau) {
  return (aucinf + aucelim) * (24 / tau);
}
