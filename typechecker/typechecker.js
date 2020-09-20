// Data
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt() { return Math.round(Math.random() * 2000) - 1000; }
function randomFloatString() { return (Math.random() * 2000 - 1000).toFixed(3); }
function randomString()
{
    var choices = [
        '"Hello, World!"',
        "'cat'",
        '"boolean"',
        '"float"',
        '"integer"',
        '"string"',
    ]
    return randomChoice(choices);
}
function randomBool() { return randomChoice([true, false]); }

var choices = {
    "str": randomString,
    "float": randomFloatString,
    "int": randomInt,
    "bool": randomBool,
};
var keys = Object.keys(choices);
var correctType;
var streak = 0;

// Elements

var pythonObject = document.getElementById("pythonObject");
var answersGroup = document.getElementById("answers");
var submitButton = document.getElementById("submit");
var streakDisplay = document.getElementById("streakDisplay");
var streakCounter = document.getElementById("streakCounter");
var explanation = document.getElementById("explanation");

// Functions

function resetAnswers()
{
    var userElement = answersGroup.querySelector("input[type=radio]:checked");
    if (userElement != null)
    {
        userElement.checked = false;
    }
}

function generateQuestion()
{
    correctType = randomChoice(keys);
    pythonObject.textContent = choices[correctType]();
    resetAnswers();
}

function checkAnswer()
{
    var userElement = answersGroup.querySelector("input[type=radio]:checked");
    if (userElement == null)
    {
        alert("You must select an answer to submit");
        return;
    }
    else if (userElement.value == correctType)
    {
        streak++;
    }
    else
    {
        streak = 0;
    }

    streakCounter.textContent = streak;
    streakCounter.style.color = (streak > 0) ? "green" : "red";
    explanation.textContent = `( ${pythonObject.textContent} is a ${correctType} )`

    generateQuestion();
}

// Interaction
generateQuestion();
submitButton.addEventListener("click", checkAnswer);
