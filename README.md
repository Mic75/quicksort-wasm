# Threaded WebAssembly (WIP)

Now that WebAssembly threads are ready as experimental, starting from [Google Chrome v70](https://developers.google.com/web/updates/2018/10/wasm-threads)
let's play with them.

## Ideas

First we had to find something that could benefit from parallelism, yet simple enough to implements.
The [Quicksort Algorithm](https://en.wikipedia.org/wiki/Quicksort#Parallelization) seems a decent candidate.
To highlight the supposed benefits of WebAssembly, we'll implements the following and see how they compete against each other:

### Mono Threaded
- Ecmascript builtin sort
- Javascript module, lomuto implementation
- WebAssembly module, lomuto implementation

### Parallelized
- Web Worker (todo)
- Threaded WebAssembly

### Input
Our first idea was to perform the sorting against arrays of 10<sup>4</sup>, 10<sup>5</sup> and 10<sup>6</sup> integers 
within the range 0 to 10<sup>6</sup>.

We quickly faced stackoverflow with custom quicksort implementation and since we wanted to keep things simple, we did
not want to spend time fine tuning quicksort and playing with stack size.

Current idea is to perform the sorting with a constant count of 500,000 elements and get the average time after multiple
runs (user defined) for each implementation.


## Installation

For now, the configure and build scripts are **Windows only**, it's still possible to make the thing work on other platform,
but it'll require you to build the WASM module yourself.

### Pre-requisites
- A web browser compatible with WebAssembly threads (i.e chrome 70+)
- [NodeJS](https://nodejs.org/en/) 6+
- [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- WebAssembly threads enabled:
   - On Google Chrome, type in `chrome://flags` in the address bar, and enable WebAssembly threads support ([see](https://developers.google.com/web/updates/2018/10/wasm-threads))


### Installing
Just run `npm i` in a terminal and follow the instructions. 


### Running
In a terminal, run: `npm run start`

The demo is now served locally and accessible on [http://localhost:8080](http://localhost:8080)
The benchmark executes on page load and results are visible in the console.
