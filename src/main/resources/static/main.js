

const runBtn = document.querySelector(".run-btn");
const resetBtn = document.querySelector(".reset-btn");

const inputField = document.getElementById('array-elements');
const arraySizeField = document.getElementById("array-size");

const errorMessage = document.querySelector(".warning");

let numbersArray = null;

const forwardBtn = document.querySelector(".foward-btn");
const backBtn = document.querySelector(".back-btn");

const bar = document.querySelector(".bar");

const barContainer = document.querySelector(".bars-container");
const stepsCounter = document.querySelector(".steps-counter");

let currentStepHtml = document.querySelector(".current-step");

const colors = ["#6f5ffa", '#8a7dff', '#5947fc', '#2007fa', '#2a1bb5', '#382f91'];

let stepsDesc = document.querySelector(".steps-desc");

let passNumber = 0;
let currentStep = 0;

let steps = null;

const descriptionArray = [
    "Compare elements",
    "Swap",
    "The last element processed is now in its final position.",
    "Sorting finished!"
];

let areSwapped = true;
let areCompared = false;

let highlightIndices = [];

// for counting number of steps
let stepCount = 0;

// get array from input, split turns it into the array type
function parseInputIntoArray (input){
    numbersArray = input.toString();
    return numbersArray
        .split(',')
        .map(str => str.trim())
        .filter(str => str !== '')
        .map(Number);
}

runBtn.addEventListener("click", async () => {
    errorMessage.innerHTML = "";
    // get array from input
    const inputStr = inputField.value;
    const arraySize = Number(arraySizeField.value);
    numbersArray = parseInputIntoArray(inputStr);
    if (numbersArray.length < 3 || numbersArray.length > 12 || numbersArray.length !== arraySize) {
        errorMessage.innerHTML = "Enter correct number of elements."
        return;
    }

    const response = await fetch("http://localhost:8080/api/sort", { // api/sort is the endpoint specified in controller
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numbersArray)
    });
    if (!response.ok) {
        console.error("Server error:", response.status);
        return;
    }
    steps = await response.json();
    console.log(steps);

    // generateBars();

    renderBars(numbersArray);

    stepsDesc.innerHTML = "Starting Bubble Sort."


});
// rendering bars
function renderBars(array, highlightIndices = []) {
    // array is steps

    // const array = steps[currentStep];
    const numberOfBars = array.length
    barContainer.innerHTML = "";

    for(let i = 0; i < numberOfBars; i++) {
        let barValue = array[i];

        const barDiv = document.createElement("div");
        barDiv.classList.add('bar-column');
        const bar = document.createElement("div");
        bar.classList.add('bar');
        // bar.style.backgroundColor = generateColor();
        if (highlightIndices.includes(i)) {
            bar.style.backgroundColor = "#6f5ffa";
        } else {
            // bar.style.backgroundColor = "#8a7dff";
            bar.style.backgroundColor = "#4c39f7";
        }
        if (barValue > 20) {
            bar.style.height = "210px";
        } else {
            bar.style.height = (barValue * 10) + "px";
        }

        const barValueDiv = document.createElement("div");
        barValueDiv.classList.add('number');
        barValueDiv.innerHTML = barValue;

        barDiv.appendChild(bar);
        barDiv.appendChild(barValueDiv);
        barContainer.appendChild(barDiv);

    }
}

function generateColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
let finished = false;
function incrementSteps() {
    if (!finished) {
        stepCount++;
        currentStepHtml.innerHTML = stepCount;
    }
}
function decrementSteps(finished) {
    if (!finished) {
        stepCount--;
        currentStepHtml.innerHTML = stepCount;
    }
}
let waitingForSwap = false;
forwardBtn.addEventListener("click", ()=> {
    if (currentStep < steps.length - 1 && !waitingForSwap) {
        finished = false;
        const before = steps[currentStep];
        const after = steps[currentStep];

        const { compareDescription, highlightIndices } = analyzeTransition(before, after);
        stepsDesc.innerHTML = compareDescription;
        renderBars(before, highlightIndices);
        waitingForSwap = true;
        incrementSteps();
    } else if (currentStep < steps.length - 1 && waitingForSwap) {
        finished = false;
        const before = steps[currentStep];
        currentStep++;
        const after = steps[currentStep];

        const { swapDescription, highlightIndices } = analyzeTransition(before, after);
        stepsDesc.innerHTML = swapDescription;
        renderBars(after, highlightIndices);
        waitingForSwap = false;
        incrementSteps();
    } else {
        stepsDesc.innerHTML = descriptionArray[3];
        renderBars(steps[currentStep]);
        incrementSteps();
        finished = true;
    }

});
backBtn.addEventListener("click", ()=> {
    // if (currentStep > 0 && areSwapped) {
    //     stepsDesc.innerHTML = descriptionArray[0];
    //     areSwapped = false;
    //     areCompared = true;
    // } else if (currentStep > 0 && !areSwapped) {
    //     currentStep--;
    //     renderBars(steps[currentStep]);
    //     areSwapped = true;
    //     areCompared = false;
    // }

    if (currentStep > 0 && !waitingForSwap) {
        finished = false;
        const before = steps[currentStep];
        const after = steps[currentStep];

        const { compareDescription, highlightIndices } = analyzeTransition(before, after);
        stepsDesc.innerHTML = compareDescription;
        renderBars(before, highlightIndices);
        waitingForSwap = true;
        decrementSteps();
    } else if (currentStep > 0 && waitingForSwap) {
        finished = false;
        const before = steps[currentStep];
        currentStep--;
        const after = steps[currentStep];

        const { swapDescription, highlightIndices } = analyzeTransition(before, after);
        stepsDesc.innerHTML = swapDescription;
        renderBars(after, highlightIndices);
        waitingForSwap = false;
        decrementSteps();
    } else {
        stepsDesc.innerHTML = "Starting Bubble Sort.";
        renderBars(steps[currentStep]);
        stepCount = 0;
        currentStepHtml.innerHTML = stepCount;
        finished = true;
    }
});

function analyzeTransition(beforeArray, afterArray) {
    for (let i = 0; i < beforeArray.length - 1; i++) {
        if (beforeArray[i] !== afterArray[i]) {
            return {
                compareDescription: descriptionArray[0],
                swapDescription: `Swapped index ${i} and ${i + 1}.`,
                highlightIndices: [i, i + 1]
            };
        }
    }
    return {
        compareDescription: descriptionArray[0],
        swapDescription: "Compared elements — no swap needed.",
        highlightIndices: []
    };
}

// clearing the input
resetBtn.addEventListener("click", async() => {
    inputField.value = "";
    errorMessage.innerHTML = "";
    console.log("Reset btn was clicked.")
});

