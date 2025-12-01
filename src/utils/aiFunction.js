import { GoogleGenerativeAI } from "@google/generative-ai";
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js";
import * as MODEL from '../model/model.js';

const apiKey = "AIzaSyB4RJ8ioY0j2wDG4iSB0ZV3i8AhF3TMkWo"; // Replace with your API key
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateQuestions(insertText) {
  try{

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });
  if(!insertText){
    throw new Error('Enter a valid topic');
   }
  const result = await chatSession.sendMessage(
    `${insertText}`
  );
 
 console.log(result);

    const data = result.response.text().slice(7,-4);

const finalData = JSON.parse(data);
  localStorage.removeItem('question');
  const jsonData = JSON.stringify(finalData);
  localStorage.setItem('question',jsonData);
  console.log("Generated Questions:",finalData);
  if(finalData){
    window.location.href="test.html";
  }

  }catch(err){

    window.alert("Enter a valid topic Or Pdf");
  }
  
  
}