package com.bubblesort.BubbleSort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SortController {

    private final SortingService sortingService;

    public SortController(SortingService sortingService) {
        this.sortingService = sortingService;
    }

    @PostMapping("/sort")
    public List<int[]> sort(@RequestBody int[] array) {
        return sortingService.generateSteps(array);
    }

}
