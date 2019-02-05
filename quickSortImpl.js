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
    let time;
    time = Date.now();
    shuffled.sort();
    return Date.now() - time;
  },

  jsQSort(shuffled) {
    let time;
    time = Date.now();
    quicksort(shuffled, 0, shuffled.length - 1);
    return Date.now() - time;
  },

  wasmMonoQSort(shuffled) {
    const wasm = Module;
    const heapBuf = wasm._malloc(shuffled.length * Uint32Array.BYTES_PER_ELEMENT);
    const heap32Offset =  heapBuf / 4;
    wasm.HEAP32.set(shuffled, heap32Offset);
    const time = wasm.ccall('quicksort', 'number', ['number', 'number', 'number'], [heapBuf, 0, shuffled.length - 1]);
    // console.log(wasm.HEAP32.subarray(heap32Offset, heap32Offset + array.length));
    wasm._free(heapBuf);
    return time
  },

  wasmMultiQSort(shuffled) {
    const wasm = Module;
    let heapBuf = wasm._malloc(shuffled.length * Uint32Array.BYTES_PER_ELEMENT);
    const heap32Offset =  heapBuf / 4;
    wasm.HEAP32.set(shuffled, heap32Offset);

    const time = wasm.ccall('mtQuicksort', 'number', ['number', 'number', 'number'], [heapBuf, 0, shuffled.length - 1]);
    // console.log(wasm.HEAP32.subarray(heap32Offset, heap32Offset + array.length));
    wasm._free(heapBuf);
    return time;
  }
};

export default sortImpl;