document.addEventListener("DOMContentLoaded", function () {
  calculateResistance();
});

function bandCountChange() {
  let s = document.getElementById("countSelector");
  let tempco = document.getElementById("tempco");
  let thirdband = document.getElementById("third");
  let tempcoCalc = document.getElementById("tempcoCalc");

  if (s.value === "4") {
    tempcoCalc.style.display = "none";
    tempco.style.display = "none";
    thirdband.style.display = "none";

    calculateResistance();
  } else if (s.value === "5") {
    tempcoCalc.style.display = "none";
    tempco.style.display = "none";
    thirdband.style.display = "block";
    calculateResistance();
  } else {
    tempco.style.display = "block";
    tempcoCalc.style.display = "flex";
    thirdband.style.display = "block";
    calculateResistance();
  }
}

function calculateResistance() {
  let s = document.getElementById("countSelector");
  let firstBand = document.getElementById("firstBand");
  let secondBand = document.getElementById("secondBand");
  let thirdBand = document.getElementById("thirdBand");
  let multiplierBand = document.getElementById("multiplierBand");
  let toleranceBand = document.getElementById("toleranceBand");
  let temperatureCoefficientBand = document.getElementById(
    "temperatureCoefficientBand"
  );
  let calculation = document.getElementById("resistanceCalc");
  let toleranceCalc = document.getElementById("toleranceCalc");
  let tempcoCalcInner = document.getElementById("tempcoCalcInner");
  let minimumCalc = document.getElementById("minimumCalc");
  let maximumCalc = document.getElementById("maximumCalc");

  let resistance;
  if (s.value === "4") {
    resistance =
      (parseInt(firstBand.value) * 10 + parseInt(secondBand.value) * 1) *
      parseFloat(multiplierBand.value);
  } else if (s.value === "5" || s.value === "6") {
    resistance =
      (parseInt(firstBand.value) * 100 +
        parseInt(secondBand.value) * 10 +
        parseInt(thirdBand.value) * 1) *
      parseFloat(multiplierBand.value);
  }
  if (s.value === "6") {
    tempcoCalcInner.innerHTML = parseInt(temperatureCoefficientBand.value);
  }
  let res = formatCalculationResult(resistance, 2);
  calculation.innerHTML = res;
  toleranceCalc.innerHTML = "±" + parseFloat(toleranceBand.value) + "%";
  let tol = resistance * (parseFloat(toleranceBand.value) / 100);
  let max = formatCalculationResult(resistance + tol, 4);
  let min = formatCalculationResult(resistance - tol, 4);
  minimumCalc.innerHTML = min;
  maximumCalc.innerHTML = max;
}

function formatCalculationResult(n, decimal) {
  let type;
  let s;
  if (parseInt(n / 1000000) !== 0) {
    s = n / 1000000;
    type = "M";
  } else if (parseInt(n / 1000) !== 0) {
    s = n / 1000;
    type = "K";
  } else {
    s = n;
    type = " ";
  }
  return s.toFixed(decimal) + type;
}
