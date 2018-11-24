emcc quicksort.cpp -o quicksort-wasm.js -s EXPORTED_FUNCTIONS="['_quicksort']" -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']" -s EXPORT_ES6=1 -s MODULARIZE=1
