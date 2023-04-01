const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');

const app = express();
app.use(cors());
app.use(parser.json());

mongoose.connect('mongodb://localhost:27017/micronDB');
const Micron = mongoose.model("Micron",{date:String, body:String});


app.get("/", (req,res)=>{
    Micron.find().then(
        micra => {
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({data:micra}));
        }    
    );
});

app.post("/", (req,res) =>{
    const todayDate = new Date().toLocaleDateString('en-us');
    const micron = new Micron({
        body:req.body.text,
        date:todayDate
    });
    micron.save().then(saved=>{
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(saved));
    });
});

app.post("/update/", (req,res)=>{
    const id = req.body.id;
    const newText = req.body.newText;
    console.log("Updating micron# "+id);
    Micron.findOneAndUpdate({_id:id},{body:newText})
    .then(updatedMicron=>{
        console.log("Success!");
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(updatedMicron));
    });

})

app.get("/delete/", (req,res)=>{
    const {id} = req.query;
    Micron.deleteOne({_id:id})
    .then(()=>{
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({result:"success"}));
})
    .catch(err=>console.log(err));
});

app.listen(3001,()=>console.log("Listening on port 3001"));