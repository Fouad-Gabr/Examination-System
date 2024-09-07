export default class ExamScreen{
    constructor(){
      this.flagesMap={};
      this.svg = document.getElementById("svg");
  this.para = document.getElementById("para");
  this.btn = document.getElementById("startBtn");
  this.container = document.getElementById("container");
  this.leftSide = document.getElementById("leftSide");
  this.examParent = document.getElementById("examParent");
  this.exam = document.getElementById("exam");
  this.infoBar = document.getElementById("infoBar");
  this.body = document.getElementsByName("body");
  let firstName = sessionStorage.getItem("first-name");
  let lastName = sessionStorage.getItem("last-name");
  this.username = firstName + " " + lastName;
  this.userPhoto = document.getElementById("userPhoto");
  this.photoFile = sessionStorage.getItem("file");
  console.log(this.photoFile);
  this.usernameField = document.getElementById("userField");
  this.timeBar = document.getElementById("timeBar");
  this.Percent = document.getElementById("timePercent");
  this.barFillEle = document.getElementById("barFill");
  this.questionsList=[];
  this.cur_qustion=0;
  this.global_screen_record=null;
    }
   clickPrev(){
    if(this.cur_qustion==0){
      return;
    }
    this.cur_qustion--;
    this.update_qustion(this.questionsList[this.cur_qustion],this.cur_qustion);
  }
  
   clickNext(){
    if(this.cur_qustion==this.questionsList.length-1){
      return;
    }
    this.cur_qustion++;
    this.update_qustion(this.questionsList[this.cur_qustion],this.cur_qustion);
  }
  
  
  
   makeChoice(val){
    for(let i=0;i<4;i++){
      let answer=document.getElementById(`ans${i}`);
      answer.classList.remove(...answer.classList);
      answer.classList.add("answer");
    }
    let answer=document.getElementById(`ans${val}`);
      answer.classList.remove(...answer.classList);
      answer.classList.add("answer-check");
      this.questionsList[this.cur_qustion].your_answer=val;
  }
  async  getQuestion(){
   
    const response = await fetch("../questions.json");
      const json = await response.json();
      //console.log(json);
   let nums=new Set();
    while(nums.size!=10){
      nums.add(Math.floor(Math.random() * json["result"].length));
    }
    //console.log(nums)
    for(let num1 of nums){
      this.questionsList.push(json["result"][num1]);
    }
    //console.log(this.questionsList);
  }
   get_flage(){
    this.index;
    console.log(typeof this.index);
    this.self.update_qustion(this.self.questionsList[this.index],this.index);
    this.self.cur_qustion=this.index;
  }
   addFlage(){
    if(this.flagesMap[this.cur_qustion]!=null){
      this.flagesMap[this.cur_qustion].remove();
      this.flagesMap[this.cur_qustion]=null;
      return;
    }
    let flageBar=document.getElementsByClassName("flags-questions")[0];
    let bt1=document.createElement("button");
    bt1.classList.add("flag");
    bt1.innerText=`Question ${this.cur_qustion+1}`;
    let f1=this.get_flage.bind({index:this.cur_qustion,self:this});
    bt1.onclick=f1;
    this.flagesMap[this.cur_qustion]=bt1;
    flageBar.appendChild(bt1);
  }
   update_qustion(qustInfo,index){
    //console.log(qustInfo);
    
    let qustion=document.getElementById("question");
    qustion.innerHTML=""
    let h3=document.createElement("h3");
    h3.innerText=`Question ${index+1}`
    question.appendChild(h3);
    qustion.appendChild(document.createElement("br"));
    let p1=document.createElement("p");
    p1.classList.add("question");
    p1.innerText=`${qustInfo["question"]}`
    qustion.appendChild(p1);
    if(qustInfo["code"]!=""){
     // qustion.innerText+= `<br/><pre> ${qustInfo["code"]}}<pre/>`;
    
     qustion.appendChild(document.createElement("br"));
     let pre=document.createElement("pre");
     pre.innerText=`${qustInfo["code"]}`;
     qustion.appendChild(pre);
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
  async  startScreenRecord(){
    try{
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,audio: true
    })
    this.global_screen_record=stream;
    if(stream.getVideoTracks()[0].getSettings().displaySurface!="monitor"){
      return false;
    }
      console.log(stream);
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") 
             ? "video/webm; codecs=vp9" 
             : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    })
    
    let chunks = []
    mediaRecorder.addEventListener('dataavailable',function (e) {
        chunks.push(e.data)
    })
    let f1=function (){
      if(!sessionStorage.getItem("end-exam")){
        this.endScreenRecordBeforeExamEnd();
        return;
      }
      sessionStorage.removeItem("end-exam");
      let blob = new Blob(chunks, {
          type: chunks[0].type
      })
      let a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'video.webm'
      a.click()
  }.bind(this);
    mediaRecorder.addEventListener('stop',f1);
    
    mediaRecorder.start()
    return true;  
  }
    catch(e){
      return false;
    }
  }
  async  startExam() {
    let flage=await this.startScreenRecord();
    if(!flage){
      return;
    }
    this.svg.style.opacity = "0";
    this.para.style.opacity = "0";
    this.btn.innerText = "";
    this.btn.classList.add("btn-after-click");
    this.container.classList.add("container-after-click");
    this.leftSide.classList.add("left-after-click");
    this.examParent.classList.remove("hidden");
    this.exam.classList.remove("hidden");
    this.infoBar.classList.remove("hidden");
    this.infoBar.classList.add("info-bar-animation");
    this.photoFile && this.userPhoto.setAttribute("src", `${this.photoFile}`);
    this.usernameField.innerText = this.username;
    await this.getQuestion();
    this.update_qustion(this.questionsList[this.cur_qustion],this.cur_qustion);
    document.getElementById("timer").innerHTML = `05:00` ;
    let f1=function(){
      this.startTimer();
      
    }.bind(this);
    this.time2=setTimeout(f1, 4000);
    this.disableBackButton();
  
    
  }
   checkAnswer(){
    let count=0;
    for (let i=0; i<this.questionsList.length; i++){
      if(this.questionsList[i]["your_answer"]!=null&&this.questionsList[i]["your_answer"]==this.questionsList[i]["answer"].charCodeAt(0)-"A".charCodeAt(0)){
        count++;
    }
  }
    return count;
  }
  clearTimeoutClass(){
    clearTimeout(this.time1);
    clearTimeout(this.time2);
  }
   endScreenRecordBeforeExamEnd(){
   this.clearTimeoutClass();
    this.container.innerHTML = "";
    this.examParent.innerHTML = "";
    this.container.classList.add("score-page");
    this.container.innerHTML = `<strong class="important-info"><br><i class="fa-solid fa-triangle-exclamation"></i> you should not close screen record before exam end</strong>

                          <div><img src='../undraw_warning_re_eoyh.svg' class='score-svg'></div>`;
  }
  async  getScore() {
    // calc score
    this.clearTimeoutClass();
    sessionStorage.setItem("end-exam", true);
    let score =  this.checkAnswer();
    this.global_screen_record.getTracks().forEach(function(track) {
      track.stop();
    });;
    // go to score page
    this.container.innerHTML = "";
    this.examParent.innerHTML = "";
    this.container.classList.add("score-page");
    this.container.innerHTML = `<div class='score-parent'>
                              <p>Hi ${this.username} your score is <br>${score} / 10</p>
                              <button type='button' class='retest' id='retest' onclick='obj1.retest()'>Retest</button>
                          </div>
                          <div><img src='./score.svg' class='score-svg'></div>`;
  }
  
   retest() {
    this.clearTimeoutClass();
    location.reload();
  }
  
    checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }
  
  // timer
   startTimer() {
    var presentTime = document.getElementById("timer").innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    //console.log(this);
    var s = this.checkSecond(timeArray[1] - 1);
    if (s == 59) {
      m = m - 1;
    }
    if (m < 0) {
      return;
    }
  
    document.getElementById("timer").innerHTML = m + ":" + s;
    let f1=this.startTimer.bind(this);
    this.time1= setTimeout(f1, 1000);
    this.barFill(m, s);
    if (m==0&&s==0) {
      location.href = "../time/time.html";
    }
  }
  
   
  
    barFill(m, s) {
    let time = 300;
    let timeNow = time - (m * 60 + s);
    let timePercent = Math.trunc((timeNow / time) * 100);
    this.barFillEle.style.width = `${timePercent}%`;
    if (timePercent >= 0) {
      this.Percent.innerText = `${timePercent} %`;
    }
    
  }
  
   disableBackButton() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }
  }