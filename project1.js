
var tesseract = require('node-tesseract-ocr');
var comprehend = require("comprehend");
var AWS = require("aws-sdk");

var express = require("express");
var app = express();

app.get("/ocr_data", (req, res) =>{
  const config={
    lan:"eng",
    oem:1,
    psm:3
  }
  AWS.config.update({
    accessKeyId: "AKIAJX5MFR26KWUJF65A",
    secretAccessKey: "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",
    region: 'us-east-1'
  });
  var comprehend = new AWS.Comprehend();

tesseract.recognize("/home/anandbabu/Desktop/mithyalabs-OCR/visiting-cards/card2.JPG",config)
.then((data)=>{
    var params = {
        LanguageCode: 'en',
        TextList: [data]
      };
    comprehend.batchDetectEntities(params, function (err, data) {
      if (err){
        console.log(err, err.stack);   // an error occurred
      }else{
        console.log(data.ResultList[0]);   // successful response
        res.send(data.ResultList[0])
      }
    });
});
})
var server = app.listen(3031, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log(host, port);
  console.log("server is running mode.....")
})