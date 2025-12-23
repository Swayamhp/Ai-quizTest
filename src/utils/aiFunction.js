import { GoogleGenAI } from "@google/genai";
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js";
import * as MODEL from '../model/model.js';

const apiKey = process.env.PARCEL_API_KEY; // Replace with your API key
const ai = new GoogleGenAI({apiKey:apiKey});

export async function generateQuestions(insertText) {
  try{
const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: insertText,
  });
  
  if(!insertText){
    throw new Error('Enter a valid topic');
   }

 
 console.log(result.text);

    const data = result.text.slice(7,-4);

const finalData = JSON.parse(data);
  localStorage.removeItem('question');
  const jsonData = JSON.stringify(finalData);
  localStorage.setItem('question',jsonData);
  console.log("Generated Questions:",finalData);
  if(finalData){
    window.location.href="test.html";
  }

  }catch(err){

    console.log(err.message)
  }
  
  
}