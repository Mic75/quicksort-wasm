import quicksort from './quicksort.js';


const sortImpl = {

  ready() {
    return new Promise((resolve) => {
      const handle = setInterval(() => {
        if (wasmReady === true) {
          resolve();
          clearInterval(handle);
        }
      }, 30);
    });
  },

  ecmaSort(shuffled) {
    console.log("Builtin Ecmascript sort");

    let time;
    time = Date.now();
    shuffled.sort();
    console.log(`500,000 entries sorted in ${Date.now() - time}ms`);
    console.log("\n");
  },

  jsQSort(shuffled) {
    console.log("Lomuto Quicksort JS Implementation");

    let time;
    time = Date.now();
    quicksort(shuffled, 0, shuffled.length - 1);
    console.log(`500,000 entries sorted in ${Date.now() - time}ms`);
    console.log("\n");
  },

  wasmMonoQSort(shuffled) {
    console.log("Lomuto Quicksort, WebAssembly, Monothread");

    const wasm = Module;
    const heapBuf = wasm._malloc(shuffled.length * Uint32Array.BYTES_PER_ELEMENT);
    const heap32Offset =  heapBuf / 4;
    wasm.HEAP32.set(shuffled, heap32Offset);
    wasm.ccall('quicksort', null, ['number', 'number', 'number'], [heapBuf, 0, shuffled.length - 1]);
    // console.log(wasm.HEAP32.subarray(heap32Offset, heap32Offset + array.length));
    wasm._free(heapBuf);
  },

  wasmMultiQSort(shuffled) {
    console.log("Lomuto Quicksort, WebAssembly, 2 Threads");

    const wasm = Module;
    let heapBuf = wasm._malloc(shuffled.length * Uint32Array.BYTES_PER_ELEMENT);
    const heap32Offset =  heapBuf / 4;
    wasm.HEAP32.set(shuffled, heap32Offset);

    wasm.ccall('mtQuicksort', null, ['number', 'number', 'number'], [heapBuf, 0, shuffled.length - 1]);
    // console.log(wasm.HEAP32.subarray(heap32Offset, heap32Offset + array.length));
    wasm._free(heapBuf);
  }
};

export default sortImpl;