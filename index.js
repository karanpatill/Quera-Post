const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const {v4: uuidv4} = require('uuid');
const methodoverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.use(express.static('public'));



let post = [
    {
        id: uuidv4() ,
        username: "user1",
        img :"https://th.bing.com/th/id/OIG1.wQ7nqzXG6LLji1s3MrOP",
        content: "This is the first post",
       

    },
    {
        id: uuidv4() ,
        img :"https://th.bing.com/th/id/OIG1.CgTbIrO0vUXLNU28HMdC",
        username: "user2",
        content: "This is the second post",
       

    },
    {
        id: uuidv4() ,
        img :"https://www.w3schools.com/w3css/img_lights.jpg",
        username: "user3",
        content: "This is the 3rd post",
      

    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs", {post});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username , content , img } = req.body;
    let id = uuidv4();
    console.log(req.body);
    res.redirect("/posts");
    post.push({id,username,content , img});
    console.log(id);
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
  let pst = post.find((p)=> id === p.id);
  res.render("show.ejs", {pst});

    res.send("working");
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let pst = post.find((p)=> id === p.id);
    pst.content = newcontent;
    res.redirect("/posts");


})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let pst = post.find((p)=> id === p.id);
    res.render("edit.ejs",{pst});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    post = post.filter((p)=> id !== p.id);
;

    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});