package com.bubblesort.BubbleSort;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class BubbleSort {

    public List<int[]> getSteps(int[] array){
        List<int[]> steps = new ArrayList<>();

        int[] arr = array.clone();

        // initial state
        steps.add(arr.clone());

        for(int i = 0; i < arr.length - 1; i++){
            for(int j = 0; j < arr.length - 1 - i; j++){
                if(arr[j] > arr[j+1]){
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    steps.add(arr.clone());
                }
            }
        }

        return steps;
    }
    // this is how the JSON will look:
    // {
    //     "steps": [
    //       [5, 3, 8, 1],
    //       [3, 5, 8, 1],
    //       [3, 5, 1, 8],
    //       [3, 1, 5, 8],
    //       [1, 3, 5, 8]
    //     ]
    //   }





    public int[] bubbleSort(int[] arr){

        int n = arr.length;

        for(int i = 0; i < n - 1; i++){
            for(int j = 0; j < n - i - 1; j++){
                if(arr[j] > arr[j+1]){
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
}
