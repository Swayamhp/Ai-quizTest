import * as model from'../model/model.js'
export const getPdfData =  function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function() {
      const pdfData = new Uint8Array(reader.result);

      pdfjsLib.getDocument({ data: pdfData }).promise
          .then(pdf => {
              console.log("📄 PDF Loaded!", pdf);
              extractTextFromPDF(pdf);
          })
          .catch(err => console.error("❌ Error loading PDF:", err));
  };

  reader.readAsArrayBuffer(file);
};

function extractTextFromPDF(pdf) {
  let textPromises = [];

  for (let i = 1; i <= pdf.numPages; i++) {
      textPromises.push(
          pdf.getPage(i).then(page => 
              page.getTextContent().then(text => 
                  text.items.map(item => item.str).join(" ")
              )
          )
      );
  }

  Promise.all(textPromises)
      .then(textArray => {
          const extractedText = textArray.join("\n\n");
          // console.log("📜 Extracted Text:\n", extractedText);
           model.pdfText.text=extractedText;
          // console.log(model.pdfText.text);
      })
      .catch(error => console.error("❌ Error extracting text:", error));
}