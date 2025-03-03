import * as model from '../model/model.js'
import * as display from '../view/display.js'

const dashEle = document.querySelector('.dashbar');
const questionEle = document.querySelector('.questions');
const btnsEle = document.querySelector('.btns');
const navBarEle = document.querySelector('.navbar');
const formEle = document.querySelector('.questions');
const prevButton = document.querySelector('#prevbtn');
const formData = JSON.parse(localStorage.getItem("formData"));
const submitEle = document.querySelector('#submitbtn');
const resultEle = document.querySelector('.result');
const savenextbtnEle = document.querySelector('#nextbtn');

console.log(submitEle);
let submitted = false;
//initailize timer and topic
//get all questions from local storage
const questions = JSON.parse(localStorage.getItem("question"));
console.log(questions);

let index=0;
//topic 
const createTopic = document.createElement('h2');
createTopic.innerText = `Topic: ${formData.topic||'pdf'}`;
navBarEle.appendChild(createTopic);


// Timer
let totalMinutes = formData.duration;
console.log(totalMinutes);

const createTimerEle = document.createElement('h2');
navBarEle.appendChild(createTimerEle);

const updateTimer = () => {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  createTimerEle.innerText = `Timer: ${hours}:${minutes}`;
};

updateTimer(); // Initialize the timer display

const timerId = setInterval(() => {
  updateTimer();

  if (totalMinutes <= 0) {
    clearInterval(timerId);
    submitEle.click();
    return;
  }
  totalMinutes--;

}, 60000);

console.log(String(4).padStart(2, '0')); // Example output: "04"

//show the questions with options
const checkArrayOrObject = function(questions){
  if(!Array.isArray(questions)){
    return questions.questions;
  }else{
    return questions;
  }

}

const [strQuestion,id] = display.displayQuestion(checkArrayOrObject(questions));
console.log(strQuestion,+id);
if (strQuestion.trim()) { // Ensure it's not an empty string
  const node = document.createRange().createContextualFragment(strQuestion);
  console.log(node); // Check the node structure
if(questionEle)questionEle.appendChild(node);
// btnsEle.insertAdjacentHTML('afterbegin',strQuestion);
}




//show numbers of questions in dashbar
const Questions =checkArrayOrObject(questions);
const str = display.showNumbers(formData.numberOfquestions,Questions); // Get the HTML string

if (str.trim()) { // Ensure it's not an empty string
    const node = document.createRange().createContextualFragment(str);
    console.log(node); // Check the node structure
if(dashEle)dashEle.appendChild(node);
}


//event delegation for queston rendering

dashEle.addEventListener('click',function(e){
  console.log(e.target);
  const spanEle = e.target;
  if(spanEle.tagName ==='SPAN'){
    questionEle.innerHTML='';
    const Questions = checkArrayOrObject(questions);
    const [strQuestion,id] = display.displayQuestion(Questions,spanEle.textContent-1,submitted);
    index = spanEle.textContent-1;
    console.log(index);
   
if (strQuestion.trim()) { // Ensure it's not an empty string
  const node = document.createRange().createContextualFragment(strQuestion);
  console.log(node); // Check the node structure
if(questionEle)questionEle.appendChild(node);
}
  }
  
})
//all values of form save next
savenextbtnEle.addEventListener('click',function(e){
  e.preventDefault();
  const formData = new FormData(formEle);
  const data = Object.fromEntries(formData.entries());
   const Questions = checkArrayOrObject(questions);
   console.log(Questions);
   Questions[index].checkOption= data.option;


   //changeBackground color of the dash ele

   if(Questions[index].checkOption){
    console.log('hello');
    const allSpanEle = dashEle.querySelectorAll('span');
    allSpanEle.forEach(ele=>{
      console.log(ele.textContent);
      if(ele.textContent-1===index){
          ele.style.backgroundColor='lightblue';
    }})
  } console.log(Questions.length);
     if(index<Questions.length-1)index++;
     console.log(index);
   const [strQuestion] = display.displayQuestion(Questions,index,submitted);
if (strQuestion.trim()) { // Ensure it's not an empty string
  questionEle.innerHTML='';
 const node = document.createRange().createContextualFragment(strQuestion);
 console.log(node); // Check the node structure
if(questionEle)questionEle.appendChild(node);


}


});

//add function to the previous button
prevButton.addEventListener('click',function(){
  const Questions = checkArrayOrObject(questions);
  if(index>0)index--;
  const [strQuestion,id] = display.displayQuestion(Questions,index);
  if (strQuestion.trim()) { // Ensure it's not an empty string
    questionEle.innerHTML='';
   const node = document.createRange().createContextualFragment(strQuestion);
   console.log(resultEle);
   console.log(node); // Check the node structure
  if(questionEle)questionEle.appendChild(node);
  
  
  }
  
})


submitEle.addEventListener('click',function(){
  submitted=true;
  const Questions = checkArrayOrObject(questions);
  const HTMLcode = display.result(Questions);
  prevButton.style.display='none';
  submitEle.style.display='none';
  clearInterval(timerId);


const str = display.showNumbers(formData.numberOfquestions,Questions,submitted); // Get the HTML string

if (str.trim()) { // Ensure it's not an empty string
    const node = document.createRange().createContextualFragment(str);
    console.log(node); // Check the node structure
    dashEle.innerHTML='';
if(dashEle)dashEle.appendChild(node);
}
  
  if (HTMLcode.trim()) {
    questionEle.innerHTML='';
    resultEle.innerHTML=''; // Ensure it's not an empty string
   const node = document.createRange().createContextualFragment(HTMLcode);
   console.log(node); // Check the node structure
  resultEle.appendChild(node);
  }
})

