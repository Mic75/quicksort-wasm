#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/time.h>

extern "C" {

    typedef struct sortArgs
    {
      int *array;
      int lo;
      int hi;
      short threadId;
    } sortArgs;

    pthread_t part1Thread;
    pthread_t part2Thread;

    void swap(int *array, int swapy1, int swapy2)
    {
      int tmp = array[swapy1];
      array[swapy1] = array[swapy2];
      array[swapy2] = tmp;
    }

    int partition(int *array, int lo, int hi)
    {
      int pivot = array[hi];
      int i = lo - 1;
      for (int j = lo; j < hi; j++)
      {
        if (array[j] < pivot)
        {
          if (i != j)
          {
            i++;
            swap(array, i, j);
          }
        }
      }
      i++;
      swap(array, i, hi);
      return i;
    }

    void *sort(void *args)
    {
      sortArgs *param = (sortArgs *)args;

      if (param->lo < param->hi)
      {
        int p = partition(param->array, param->lo, param->hi);
        sortArgs lowerPart = {.array = param->array, .lo = param->lo, .hi = p - 1, .threadId = -1};
        sortArgs upperPart = {.array = param->array, .lo = p + 1, .hi = param->hi, .threadId = -1};
        sort(&lowerPart);
        sort(&upperPart);
      }

       if (param->threadId != -1) {
          pthread_exit(NULL);
      }

      return (void*) 0;
    }

    void spawnSortingThread( int *array, int lo, int hi) {

      int p = partition(array, lo, hi);
      sortArgs lowerPart = {.array = array, .lo = lo, .hi = p - 1, .threadId = 1 };
      sortArgs upperPart = {.array = array, .lo = p + 1, .hi = hi, .threadId = 2 };

      pthread_create(&part1Thread, NULL, sort, &lowerPart);
      pthread_create(&part2Thread, NULL, sort, &upperPart);

      pthread_join(part1Thread, NULL);
      pthread_join(part2Thread, NULL);
    }

    void showArray(int *array, int count)
    {
      printf("[");
      for (int i = 0; i < count; i++)
      {
        printf("%i", array[i]);
        if (i < count - 1)
          printf(",");
      }

      printf("]\n\n");
    }

    void quicksort(int *array, int lo, int hi)
    {
      struct timeval t1, t2;
      double elapsedTime;

      sortArgs arg = {.array = array, .lo = lo, .hi = hi};

      gettimeofday(&t1, NULL);
      spawnSortingThread(array, lo, hi);
      gettimeofday(&t2, NULL);

      // compute and print the elapsed time in millisec
      elapsedTime = (t2.tv_sec - t1.tv_sec) * 1000.0;    // sec to ms
      elapsedTime += (t2.tv_usec - t1.tv_usec) / 1000.0; // us to ms

      printf("500 000 entries sorted in %.0f ms\n\n", elapsedTime);
    }
}