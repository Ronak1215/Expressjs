const express = require("express");
const app = express();
const path = require("path")

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set(express.static(path.join(__dirname,"public")));

// app.get("/",(req,res)=>{
//   res.send("running");
// })

app.get("/",(req,res)=>{
  res.render("index")
})

app.listen(3000,(err)=>console.log(err));