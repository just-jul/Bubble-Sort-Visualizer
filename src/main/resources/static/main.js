

const runBtn = document.querySelector(".run-btn");
const resetBtn = document.querySelector(".reset-btn");

const inputStr = document.getElementById('array-elements').value;

let stepsArray = [];
let currentStep = 0;

// get array from input
function parseInputIntoArray (input){
    const arrayString = input.toString();
    return arrayString.split(', ');
}

runBtn.addEventListener("click", async () => {
    // get array from input
    const array = parseInputIntoArray(inputStr);

    const response = await fetch("http://localhost:8080/api/sort", { // api/sort is the endpoint specified in controller
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ array: array})
    });

    const data = await response.json();
    let steps = data.steps;
     // calling animdateSteps

});

resetBtn.addEventListener("click", async() => {
    inputStr.innerHTML = "";
});

async function getStep() {

    // fetch() makes an HTTP request — no page reload needed
    const response = await fetch(`/api/greeting?name=${encodeURIComponent(name)}`);

    // Spring Boot automatically returned JSON — parse it here
    const data = await response.json();
    // data = { message: "Hello, Alice!", name: "Alice", characterCount: 5 }

    showResult(data);
}