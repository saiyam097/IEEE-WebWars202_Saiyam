const { clear } = require("console");
const e = require("express");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username: "Saiyam",
        content: "Kill the boy, Let the MAN be born!"
    },
    {
        id: uuidv4(),
        username: "Ryan Reynolds",
        content: "A human being has 206 bones, 207 if I am watching Gossip Girls"
    },
    {
        id: uuidv4(),
        username: "Batman",
        content: "You are not brave, MEN ARE BRAVE!"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let { username, content } = req.body;
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
   
    if (!post) {
        return res.status(404).send("Post not found");
    }
    
    res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res) =>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content= newContent;

    console.log(post);
    res.redirect("/posts")
});

app.get("/posts/:id/edit", (req,res)=>{
    let { id }= req.params;
    let post= posts.find((p)=> id=== p.id);
    res.render("edit.ejs", {post});

});

app.delete("/posts/:id", (req,res)=>{
    let { id }= req.params;
     posts= posts.filter((p)=> id!== p.id);
     res.redirect("/posts")
})

app.listen(port, () => {
    console.log("Server is runni ng on http://localhost:${port}/posts");
});
