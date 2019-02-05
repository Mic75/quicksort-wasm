
import quicksortImpl from './quicksortImpl.js'
import shuffle from './shuffle.js';

const { ecmaSort, jsQSort, wasmMonoQSort, wasmMultiQSort, ready } = quicksortImpl;

let btnStart = document.getElementById('start');
let btnStop = document.getElementById('stop');
let divIteration = document.getElementById('iteration');
let divEcma = document.getElementById('ecma');
let divCustomJs = document.getElementById('custom-js');
let divMWasm = document.getElementById('m-wasm');
let divTWasm = document.getElementById('t-wasm');

let results = {
  ecma: 0,
  customJs: 0,
  mWasm: 0,
  tWasm: 0
};

let stop = false;

function init() {

  btnStart.addEventListener('click', () => {
    startBenchmark(30);
  });

  btnStop.addEventListener('click', () => {
    stopBenchMark();
  });
}

function logResults(iteration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      divIteration.innerText = `Iteration ${iteration}`;
      divEcma.innerText = `Ecma Sort: ${(results.ecma/iteration).toFixed(2)}`;
      divCustomJs.innerText = `JS Lomuto Quicksort: ${(results.customJs/iteration).toFixed(2)}`;
      divMWasm.innerText = `1 Thread WebAssembly Quicksort: ${(results.mWasm/iteration).toFixed(2)}`;
      divTWasm.innerText = `2 Threads WebAssembly Quicksort: ${(results.tWasm/iteration).toFixed(2)}`;
      resolve();
    }, 400); // give some time for the display
  });
}

async function startBenchmark(maxIteration)
{
  const shuffled = shuffle(0, 1000, 500000);
  await ready();
  stop = false;
  reset();

  let i = 0;
  while(stop === false) {
    results.ecma += ecmaSort(shuffled.slice());
    results.customJs += jsQSort(shuffled.slice());
    results.mWasm += wasmMonoQSort(shuffled.slice());
    results.tWasm += wasmMultiQSort(shuffled.slice());
    await logResults(i+1);
    i++;
  }
}

function reset() {
  for (const p in results) {
    results[p] = 0;
  }
}

function stopBenchMark() {
  stop = true;
}

init();