const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')


// Create file
app.get("/",function(req,res){
  fs.readdir(`./files`, function(err,files) {
    res.render("index",{files: files})
  });
});

app.post("/create",function(req,res){
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details, function(err){
    res.redirect("/")
  });
});


// Read file and show full content
app.get("/file/:filename",function(req,res){
  fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err, filedata){
    res.render("show",{filename: req.params.filename, filedata: filedata})
  }) 
})

// update File name
app.get("/edit/:filename",function(req,res){
  res.render("edit",{filename: req.params.filename})
})

app.post("/edit",function(req,res){
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, function(err){
    res.redirect("/")
  })
})

// update Content 
app.get("/editcontent/:filename",function(req,res){
   fs.readFile(`./files/${req.params.filename}`,function(err, filedata){
    res.render("editcontent",{filename: req.params.filename, filedata: filedata})
  }) 
})
app.post("/editcontent",function(req,res){
  fs.writeFile(`./files/${req.body.filename}`,`${req.body.editdata}`,function(err){
    res.redirect("/")
  })
  // console.log(req.body)
}) 

// Delete file
app.get("/delete/:filename", function (req, res) {
  fs.unlink(`./files/${req.params.filename}`, function (err) {
    if (err) {
      console.log("Error deleting file:", err);
    }
    res.redirect("/");
  });
});

app.listen(3000,function(){
  console.log("server up")
})