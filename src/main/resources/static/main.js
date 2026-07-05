

const runBtn = document.querySelector(".run-btn");
const resetBtn = document.querySelector(".reset-btn");

const inputField = document.getElementById('array-elements');
let inputStr = document.getElementById('array-elements').value;

let arraySize = document.getElementById("array-size").value;

const errorMessage = document.querySelector(".warning");

let numbersArray = null;

const forwardBtn = document.querySelector(".foward-btn");
const backBtn = document.querySelector(".back-btn");

const bar = document.querySelector(".bar");

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
    const array = parseInputIntoArray(inputStr);
    if (array.length < 3 && array.length > 12 && array.length !== arraySize) {
        errorMessage.innerHTML = "Enter correct number of elements."
        return;
    }

    const response = await fetch("http://localhost:8080/api/sort", { // api/sort is the endpoint specified in controller
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ array: array})
    });

    const steps = await response.json();

    generateBars(steps);

});
// animate(steps) ?
function generateBars(steps){
    const numerOfBars = numbersArray.size;

    // generating and displaying bars


}
function stepForward() {

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