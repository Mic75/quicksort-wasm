function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}


export default function generateData(min, max, count) {
    let data = new Uint32Array(count);
    for (let i=0 ; i < count ; i++){
      data[i] = getRandomIntInclusive(min, max);
    }
    return data;
  }
