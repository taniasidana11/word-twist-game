const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".new-word"),
checkBtn = document.querySelector(".check-word"); 

//whole-page timer
function startTimer(duration, display) {
    
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer <= 0) {
            location.href='../finalpage.html'
        }
    }, 1000);
}

window.onload = function () {
    var duration = 1 * 60, // time in seconds
        display = document.querySelector('#time');
    startTimer(duration, display);
};

let correctWord, timer, score = 0;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} you got it wrong!`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the right word`);
    incrementScore(10); // Increment the score by 10 points
    initGame();
}

const incrementScore = increment => {
    score += increment;
    console.log(score)
    document.getElementById('score').innerHTML = score;
    console.log(score)
    localStorage.setItem("score",score);
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

