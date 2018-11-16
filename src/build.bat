emcc --emrun quicksort.cpp -o quicksort-wasm.js -s EXPORTED_FUNCTIONS="['_sort']" -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" -s EXPORT_ES6=1 -s MODULARIZE=1
