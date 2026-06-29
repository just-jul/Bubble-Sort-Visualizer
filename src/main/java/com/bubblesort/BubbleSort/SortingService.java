package com.bubblesort.BubbleSort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SortingService {

    private final BubbleSort bubbleSort = new BubbleSort();

    public List<int[]> generateSteps(int[] array) {
        return bubbleSort.getSteps(array);
    }


}
