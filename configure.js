const readline = require('readline');
const fs = require('fs');


fs.readFile('./.emsdkrc.json', (err, data) => {
  if (err && err.code === 'ENOENT'){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Emscripten sdk path: ', (answer) => {

      fs.access(answer, fs.constants.R_OK, (err) => {
        if (err) {
          console.log(`${answer} is not a valid path\n`);
          process.exit(1);
        } else {
          const config = { empath: answer};
          fs.writeFileSync('.emsdkrc.json', JSON.stringify(config));
        }
        rl.close();
      });
    });
  } else {
    const config = JSON.parse(data);
    console.log(`Found emscripten sdk configuration at ${config.empath}\n`);
  }
});