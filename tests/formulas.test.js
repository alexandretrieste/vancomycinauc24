
import {
  calcularKe,
  calcularPicoReal,
  calcularValeReal,
  calcularAUCinf,
  calcularAUCelim,
  calcularAUC24
} from '../controller/formulas.js';

test('calcularKe corretamente', () => {
  const ke = calcularKe(40, 10, 2, 1);
  expect(ke).toBeCloseTo(1.386, 3);
});

test('calcularPicoReal corretamente', () => {
  const pico = calcularPicoReal(35, 1.386, 2, 1);
  expect(pico).toBeCloseTo(99.9, 1);
});

test('calcularValeReal corretamente', () => {
  const vale = calcularValeReal(10, 1.386, 8, 6);
  expect(vale).toBeCloseTo(2.0, 1);
});

test('calcularAUCinf corretamente', () => {
  const auc = calcularAUCinf(100, 10, 1);
  expect(auc).toBeCloseTo(55.0, 1);
});

test('calcularAUCelim corretamente', () => {
  const aucelim = calcularAUCelim(100, 10, 1.386);
  expect(aucelim).toBeCloseTo(65.0, 0);
});

test('calcularAUC24 corretamente', () => {
  const auc24 = calcularAUC24(55, 65, 8);
  expect(auc24).toBeCloseTo(360, 0);
});
