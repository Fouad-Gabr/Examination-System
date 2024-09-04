let svg = document.getElementById("svg");
let para = document.getElementById("para");
let btn = document.getElementById("startBtn");
let container = document.getElementById("container");
let leftSide = document.getElementById("leftSide");
let examParent = document.getElementById("examParent");
let exam = document.getElementById("exam");
let infoBar = document.getElementById("infoBar");
let body = document.getElementsByName("body");
let firstName = sessionStorage.getItem("first-name");
let lastName = sessionStorage.getItem("last-name");
let username = firstName + " " + lastName;
let userPhoto = document.getElementById("userPhoto");
let photoFile = sessionStorage.getItem("file");
let usernameField = document.getElementById("userField");
let timeBar = document.getElementById("timeBar");
let Percent = document.getElementById("timePercent");
let barFillEle = document.getElementById("barFill");

function startExam() {
  svg.style.opacity = "0";
  para.style.opacity = "0";
  btn.innerText = "";
  btn.classList.add("btn-after-click");
  container.classList.add("container-after-click");
  leftSide.classList.add("left-after-click");
  examParent.classList.remove("hidden");
  exam.classList.remove("hidden");
  infoBar.classList.remove("hidden");
  infoBar.classList.add("info-bar-animation");
  photoFile && userPhoto.setAttribute("src", `${photoFile}`);
  usernameField.innerText = username;

  document.getElementById("timer").innerHTML = 05 + ":" + 00;
  setTimeout(startTimer, 4000);
  disableBackButton();
}

function getScore() {
  // calc score
  let score = 0;

  // go to score page
  container.innerHTML = "";
  examParent.innerHTML = "";
  container.classList.add("score-page");
  container.innerHTML = `<div class='score-parent'>
                            <p>Hi ${username} your score is <br>${score} / 10</p>
                            <button type='button' class='retest' id='retest' onclick='retest()'>Retest</button>
                        </div>
                        <div><img src='./score.svg' class='score-svg'></div>`;
}

function retest() {
  location.reload();
}

// timer
function startTimer() {
  var presentTime = document.getElementById("timer").innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    return;
  }

  document.getElementById("timer").innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
  barFill(m, s);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

function barFill(m, s) {
  let time = 300;
  let timeNow = time - (m * 60 + s);
  let timePercent = Math.trunc((timeNow / time) * 100);
  barFillEle.style.width = `${timePercent}%`;
  if (timePercent >= 0) {
    Percent.innerText = `${timePercent} %`;
  }
  if (Percent.innerText == "100 %") {
    location.href = "../time/time.html";
  }
}

function disableBackButton() {
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };
}
