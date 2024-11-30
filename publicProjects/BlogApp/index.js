import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import jQuery from "jquery";
import { log } from "console";
import ejs from "ejs"
const __dirname = dirname(fileURLToPath(import.meta.url));



var posts = [];
var idCounter = 0;

const app = express();
const port = 5000;

app.set('view engine', 'ejs')
app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/edit-product/:id", (req, res)=> {
    const postId = req.params.id;
    var postToChange = posts.find(post => post.id == postId);
    
    
    const viewData = {
        postId,
        edit: true,
        pageTitle: "Edit Post",
        post: postToChange
    }
    res.render("dashboard", viewData );
});


app.get("/", (req, res)=> {
res.render("index" ,{posts: posts});
});
app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id == postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }


    res.render("post", {
        postId: post.id,
        title: post.title,
        content: post.text
    });
});


app.get("/about", (req, res)=> {
res.render("about");
});
    
app.get("/dashboard", (req, res)=> {
const viewData = {
    edit: false,
    pageTitle: "Add post"
}

res.render("dashboard", viewData);
});
        

app.post("/", (req, res) => {
    var titleInput = req.body["title"];
    var textInput = req.body["text"];
    var postsObj = {
        id: idCounter++,
        title: titleInput,
        text: textInput
    }

    posts.push(postsObj);
    console.log(posts);

    res.render("index",  
    {
    posts   
    }); 
});

app.post("/delete-post", (req, res) => {
    var postId = req.body.id;
    console.log("Deleting post with ID:", postId);
    const index = posts.findIndex(post => post.id == postId);
    
    if (index !== -1) {
        posts.splice(index, 1);
        console.log("Post deleted successfully");
    } else {
        console.log("Post not found");
    }
    res.redirect("/");
});

app.post("/edit-product/:id", (req, res)=> {
    const postId = req.params.id; 
    const { title, text } = req.body;

    
    const postIndex = posts.findIndex(post => post.id == postId);

    
    if (postIndex === -1) {
        return res.status(404).send("Post not found");
    }

    
    posts[postIndex].title = title;
    posts[postIndex].text = text;

    res.redirect("/");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

