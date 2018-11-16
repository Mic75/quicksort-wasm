// Copyright 2012 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.
#include <math.h>

extern "C" {

  void swap(int *array, int swapy1, int swapy2) {
    int tmp = array[swapy1];
    array[swapy1] = array[swapy2];
    array[swapy2] = tmp;
  }


  int partition(int *array, int lo, int hi) {
    int pivot = array[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
      if (array[j] < pivot) {
        if (i != j) {
          i++;
          swap(array, i, j);
        }
      }
    }
    i++;
    swap(array, i, hi);
    return i;
  }

  void sort(int *array, int lo, int hi) {
    if (lo < hi) {
      int p = partition(array, lo, hi);
      sort(array, lo, p - 1);
      sort(array, p + 1, hi);
    }
  }
}
