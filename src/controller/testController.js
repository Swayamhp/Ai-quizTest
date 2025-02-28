import * as model from '../model/model.js'
import * as display from '../view/display.js'

const dashEle = document.querySelector('.dashbar');
const questionEle = document.querySelector('.questions');
const questions = JSON.parse(localStorage.getItem("question"));
const navBarEle = document.querySelector('.navbar');
const formEle = document.querySelector('.questions');
console.log(questions);
const formData = JSON.parse(localStorage.getItem("formData"));
console.log(formData);
//initailize timer and topic

//topic 
const createTopic = document.createElement('h2');
createTopic.innerText = `Topic: ${formData.topic}`;
navBarEle.appendChild(createTopic);


//timer
let totalMinutes = formData.duration;
console.log(totalMinutes);;
const createTimerEle = document.createElement('h2');
createTimerEle.innerText = `Timer ${Math.floor(formData.duration/60)}:${formData.duration%60}`;
navBarEle.appendChild(createTimerEle);
const timerId = setInterval(()=>{
  totalMinutes--;
  const hour = Math.floor(totalMinutes/60);
const minutes = totalMinutes%60;
createTimerEle.innerText='';
 createTimerEle.innerText = `Timer:${hour}:${minutes}`;
 console.log(hour);

 navBarEle.appendChild(createTimerEle);

  if(totalMinutes==-1)clearInterval(timerId);
},60000)

//show the questions with options
const checkArrayOrObject = function(questions){
  if(!Array.isArray(questions)){
    return questions.questions;
  }else{
    return questions;
  }

}
if(!Array.isArray(questions)){
  

}
const [strQuestion,id] = display.displayQuestion(checkArrayOrObject(questions));
console.log(strQuestion,+id);
if (strQuestion.trim()) { // Ensure it's not an empty string
  const node = document.createRange().createContextualFragment(strQuestion);
  console.log(node); // Check the node structure
if(questionEle)questionEle.appendChild(node);
}






const str = display.showNumbers(formData.numberOfquestions); // Get the HTML string

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
    const [strQuestion,id] = display.displayQuestion(checkArrayOrObject(questions),spanEle.textContent-1);
if (strQuestion.trim()) { // Ensure it's not an empty string
  const node = document.createRange().createContextualFragment(strQuestion);
  console.log(node); // Check the node structure
if(questionEle)questionEle.appendChild(node);
}
  }
  
})

//all values of form
formEle.addEventListener('submit',function(e){
  e.preventDefault();
  console.log(e.target);
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  
 
  
})