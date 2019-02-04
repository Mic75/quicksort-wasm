
// see https://en.wikipedia.org/wiki/Quicksort#Lomuto%20partition%20scheme for implementation


function swap(array, swapy1, swapy2) {
  let tmp = array[swapy1];
  array[swapy1] = array[swapy2];
  array[swapy2] = tmp;
}


function partition(array, lo, hi) {
  const pivot = array[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (array[j] < pivot) {
      if (i !== j) {
        i++;
        swap(array, i, j)
      }
    }
  }
  i++;
  swap(array, i, hi);
  return i;
}

export default function sort(array, lo, hi) {
  if (lo < hi) {
    const p = partition(array, lo, hi);
    sort(array, lo, p - 1);
    sort(array, p + 1, hi);
  }
}