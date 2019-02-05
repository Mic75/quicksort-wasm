const fs = require('fs');
const path = require('path');
const os = require('os');
const empath = require('./.emsdkrc').empath;
const { exec } = require('child_process');

if (os.type() === "Windows_NT") {
  let buildBat = `@call "${path.join(empath, 'emsdk')}" construct_env %*\n`;
  buildBat += 'emcc -O3 .\\quicksort.cpp -o .\\quicksort-wasm.js -s USE_PTHREADS=1 -s PTHREAD_POOL_SIZE=2 -s EXPORTED_FUNCTIONS="[\'_mtQuicksort\',\'_quicksort\', \'_malloc\', \'_free\']" -s EXTRA_EXPORTED_RUNTIME_METHODS="[\'ccall\']"';

  fs.writeFileSync('./build.bat', buildBat);

  console.log(`Builing WebAssembly modules with emsdk located at ${empath}`);
  exec('build.bat', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("WebAssembly content generated");
    console.log("To start serving the demo run: npm run start\n");
    fs.unlinkSync('./build.bat');
  });
} else {
  console.log("Build script not supported for this platform yet, you're on your own...");
}