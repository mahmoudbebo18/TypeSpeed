// define the time limit
let TIME_LIMIT = 20;
// define quotes to be used
let quotes_array = [
    "this",
    "is",
    "javascript",
    "type",
    "speed",
    "app",
    "you",
    "can",
    "test",
    "your",
    "speed",
    "easily"
];
// selecting required elements
let timer_text = document.querySelector(".curr_time");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let begin_div = document.querySelector(".begin");
let game_body = document.querySelector(".game_body");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;
let elementsNumber = 0;


function handleChange() {
    const { valueLow, valueHigh } = this;
}
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input[type=range]');
    input.addEventListener('input', handleChange);
    input.nextElementSibling.addEventListener('input', handleChange.bind(input));
});

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];

    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
        quoteNo++;
    else
        finishGame();
}
function processCurrentText() {

    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // character not currently typed
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

            // correct character
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

            // incorrect character
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            // increment number of errors
            errors++;
        }
    });

    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();
        // update total errors
        total_errors += errors;

        // clear the input area
        input_area.value = "";
    }
}
function startGame() {

    resetValues();
    updateQuote();

    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    begin_div.style.display = "none";
    game_body.style.display = "block";

}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    timer_text.textContent = timeLeft + 's';
    restart_btn.style.display = "none";
}
function updateTimer() {
    if (timeLeft > 0) {
        // decrease the current time left
        timeLeft--;

        // increase the time elapsed
        timeElapsed++;

        // update the timer text
        timer_text.textContent = timeLeft + "s";
    }
    else {
        // finish the game
        finishGame();
    }
}
function finishGame() {
    // stop the timer
    clearInterval(timer);

    // disable the input area
    input_area.disabled = true;

    let takeTime = TIME_LIMIT - timeLeft

    if (takeTime >= 20) {
        quote_text.textContent = ` Failed:  You Take more than ${takeTime}S `;
        quote_text.classList.add("failed")

    } else {
        quote_text.textContent = ` Congrats :  You Take only ${takeTime}S `;
        quote_text.classList.add("congrats")
    }
    // show finishing text
    // display restart button
    restart_btn.style.display = "block";
}

document.querySelector('.restart_btn').addEventListener('click', function () {
    begin_div.style.display = "block";
    game_body.style.display = "none";
    quote_text.classList.remove("congrats");
    quote_text.classList.remove("failed");
})