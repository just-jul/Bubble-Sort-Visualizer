

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

const colors = ["#6f5ffa", '#8a7dff', '#5947fc', '#2007fa', '#2a1bb5', '#382f91'];

let stepsDesc = document.querySelector(".steps-desc");

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

    generateBars();

    const response = await fetch("http://localhost:8080/api/sort", { // api/sort is the endpoint specified in controller
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numbersArray)
    });
    if (!response.ok) {
        console.error("Server error:", response.status);
        return;
    }
    const steps = await response.json();
    console.log(steps);

    stepsDesc.innerHTML = "Starting Bubble Sort."



});
// animate(steps) ?
function generateBars(){
    const numberOfBars = numbersArray.length
    barContainer.innerHTML = "";
    console.log("bars cleared");

    // generating and displaying bars
    for(let i = 0; i < numberOfBars; i++) {
        console.log("first array element.");
        let barValue = numbersArray[i];

        const barDiv = document.createElement("div");
        barDiv.classList.add('bar-column');
        const bar = document.createElement("div");
        bar.classList.add('bar');
        bar.style.backgroundColor = generateColor();
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
function stepForward(steps) {

}

function stepBack() {

}
forwardBtn.addEventListener("click", ()=> {

});
backBtn.addEventListener("click", ()=> {

});

const descriptionArray = [
    "Compare elements",
    "Swap",
    "The last element processed is now in its final position.",
    "Sorting finished!"
]


// clearing the input
resetBtn.addEventListener("click", async() => {
    inputField.value = "";
    errorMessage.innerHTML = "";
    console.log("Reset btn was clicked.")
});

async function getStep() {

    // fetch() makes an HTTP request — no page reload needed
    const response = await fetch(`/api/greeting?name=${encodeURIComponent(name)}`);

    // Spring Boot automatically returned JSON — parse it here
    const data = await response.json();
    // data = { message: "Hello, Alice!", name: "Alice", characterCount: 5 }

    showResult(data);
}