var Module = {
  onRuntimeInitialized: function() {

    const wasm = Module;
    console.log("Threaded Lomuto Quicksort, WebAssembly");

    function callWasm(array) {
      let heapBuf = wasm._malloc(array.length * Uint32Array.BYTES_PER_ELEMENT);
      const heap32Offset =  heapBuf / 4;
      wasm.HEAP32.set(array, heap32Offset);

      wasm.ccall('quicksort', null, ['number', 'number', 'number'], [heapBuf, 0, array.length - 1]);
      // console.log(wasm.HEAP32.subarray(heap32Offset, heap32Offset + array.length));
      wasm._free(heapBuf);
    }
    callWasm(unsorted.slice());
  }
};