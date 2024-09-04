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
let questionsList=[];
let cur_qustion=0;

function clickPrev(){
  if(cur_qustion==0){
    return;
  }
  cur_qustion--;
  update_qustion(questionsList[cur_qustion]);
}

function clickNext(){
  if(cur_qustion==questionsList.length-1){
    return;
  }
  cur_qustion++;
  update_qustion(questionsList[cur_qustion]);
}



function makeChoice(val){
  for(let i=0;i<4;i++){
    let answer=document.getElementById(`ans${i}`);
    answer.classList.remove(...answer.classList);
    answer.classList.add("answer");
  }
  let answer=document.getElementById(`ans${val}`);
    answer.classList.remove(...answer.classList);
    answer.classList.add("answer-check");
    questionsList[cur_qustion].your_answer=val;
}
async function getQuestion(){
 
  const response = await fetch("../questions.json");
    const json = await response.json();
    //console.log(json);
  nums=new Set();
  while(nums.size!=10){
    nums.add(Math.floor(Math.random() * json["result"].length));
  }
  console.log(nums)
  for(num1 of nums){
    questionsList.push(json["result"][num1]);
  }
  console.log(questionsList);
}
function get_flage(){
  this.index;
  update_qustion(questionsList[this.index]);
  cur_qustion=this.index;
}
function addFlage(){
  let flageBar=document.getElementsByClassName("flags-questions")[0];
  bt1=document.createElement("button");
  bt1.classList.add("flag");
  bt1.innerHTML=`Question ${cur_qustion+1}`;
  f1=get_flage.bind({index:cur_qustion});
  bt1.onclick=f1;
  flageBar.appendChild(bt1);
}
function update_qustion(qustInfo){
  console.log(qustInfo);
  
  let qustion=document.getElementById("question");
  qustion.innerHTML=`${qustInfo["question"]}`
  if(qustInfo["code"]!=""){
    qustion.innerHTML+= `<br/><pre> ${qustInfo["code"]}}<pre/>`;
  }
  for(let i=0;i<4;i++){
    let answer=document.getElementById(`ans${i}`);
    answer.innerText=qustInfo["choice"][i];
    answer.classList.remove(...answer.classList);
    answer.classList.add("answer");
  }
  if(qustInfo["your_answer"]!=null){
    let answer=document.getElementById(`ans${qustInfo["your_answer"]}`);
    answer.classList.remove(...answer.classList);
    answer.classList.add("answer-check");
  }
}
async function startExam() {
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
  await getQuestion();
  update_qustion(questionsList[cur_qustion]);
  document.getElementById("timer").innerHTML = `05:00` ;
  setTimeout(startTimer, 4000);
  disableBackButton();
}
function checkAnswer(){
  let count=0;
  for (let i=0; i<questionsList.length; i++){
    if(questionsList[i]["your_answer"]!=null&&questionsList[i]["your_answer"]==questionsList[i]["answer"].charCodeAt(0)-"A".charCodeAt(0)){
      count++;
  }
}
  return count;
}
function getScore() {
  // calc score
  let score =  checkAnswer();

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
  if (m==0&&s==0) {
    location.href = "../time/time.html";
  }
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
  
}

function disableBackButton() {
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };
}
