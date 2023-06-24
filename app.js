const express=require("express")
const {spawn} =require('child_process')
const mongoose=require("mongoose")
const MongoClient=require('mongodb').MongoClient
const _=require("lodash")
const { Collection } = require("mongodb")
require('dotenv').config();

const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(express.static("scripts")); 

app.set('view engine','ejs');

const client= new MongoClient(process.env.ATLAS_URL);
let latestDepth="";
let latestTime="";
async function run(){
  try{
    await client.connect()
    const db=client.db('Explo2')
    const col=db.collection('Explo_distance_data2')
    const mydata=await col.findOne({},{sort:{_id:-1}})
    latestTime=mydata.Time
    latestDepth=mydata.depth
    console.log(mydata)
  }
  catch(err){
  console.log(err)
  }
  finally {
    await client.close();
  }
}

app.get("/",function(req,res){
  run().catch(console.dir)

  res.render('home_pg',{depth:latestDepth,time:latestTime});
})

app.listen(PORT,()=>{
    console.log("Connected to port Successfully");
})


// Spawn a child process to run the Python script
const pythonProcess = spawn('python', ['./scripts/sensordata.py']);

// Log any output from the Python script to the console
pythonProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle any errors that occur while running the Python script
pythonProcess.on('error', (err) => {
  console.error(`Failed to start Python script: ${err}`);
});

// Handle the case when the Python script exits
pythonProcess.on('exit', (code) => {
  console.log(`Python script exited with code ${code}`);
});
