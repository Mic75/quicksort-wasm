
import quicksortImpl from './quicksortImpl.js'
import shuffle from './shuffle.js';

const { ecmaSort, jsQSort, wasmMonoQSort, wasmMultiQSort, ready } = quicksortImpl;


async function run() {
  await ready();

  const shuffled = shuffle(0, 1000, 500000);

  ecmaSort(shuffled.slice());
  jsQSort(shuffled.slice());
  wasmMonoQSort(shuffled.slice());
  wasmMultiQSort(shuffled.slice());
}

run();