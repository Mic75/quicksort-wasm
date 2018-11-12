# Threaded WebAssembly

Now that WebAssembly threads are ready as experimental, starting from [Google Chrome v70](https://developers.google.com/web/updates/2018/10/wasm-threads)
let's play with them.

## Ideas

First we had to find a something that could benefit from parallelism, yet simple enough to implements.
The Lomuto implementation of the (Quicksort Algorithm)[https://en.wikipedia.org/wiki/Quicksort#Parallelization] seems a decent candidate.
To highlight the supposed benefits of WebAssembly, we'll implements the following and see how they compete against each other:

### Mono Threaded
- Ecmascript builtin sort
- Javascript module
- WebAssembly module

### Parallelized
- Web Worker
- Threaded WebAssembly

### Input
Our first idea is to perform the sorting against array of 10<sup>4</sup>, 10<sup>5</sup> and 10<sup>6</sup> integers within the range 0 to 10<sup>6</sup>.
