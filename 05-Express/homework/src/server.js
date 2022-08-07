// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;


// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post("/posts", (req,res) => {
    const {author, title, contents} = req.body;
    if(!author || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    const newPost = {
        id: id,
        author: author,
        title: title,
        contents: contents
    }
    id++;
    posts.push(newPost);
    return res.json(newPost)
})

server.post("/posts/author/:author", (req,res) => {
const {author} = req.params
const {title, contents} = req.body
if( !author || !title || !contents)
return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
const newPost = {
    id: id,
    author: author,
    title: title,
    contents: contents
}
id++
posts.push(newPost);
return res.json(newPost)
})

server.get("/posts", (req,res) => {
const {term} = req.query
if(term) {
const filteredPosts = posts.filter( post => post.title.includes(term) || post.contents.includes(term))
return res.json(filteredPosts)
} else {
    return res.json(posts)
}
})

server.get("/posts/:author", (req,res) => {
const {author} = req.params;
const filteredPosts = posts.filter(post => post.author === author) 
if(filteredPosts.length > 0) {
return res.json(filteredPosts);
} else {
    return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
}
})

server.get ("/posts/:author/:title", (req,res) => {
const {author, title} = req.params;
const filteredPosts = posts.filter(post => post.author === author && post.title === title);
if( filteredPosts.length > 0){
return res.json(filteredPosts);
} else {
return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})

}
})

server.put("/posts", (req,res) => {
const {id, title, contents} = req.body;
if( !id || !title || !contents){
    return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
} else {
    const filteredPost = posts.find(post => post.id === id) // devuelve true false 
    if(!filteredPost) { // por eso puedo preguntar asi en el if
        return res.status(STATUS_USER_ERROR).json({error: "No se encontro ningun post con ese id"})  
    }
        filteredPost.title = title;
        filteredPost.contents = contents;
        res.json(filteredPost)
    
}
})

server.delete("/posts", (req,res) => {
const {id} = req.body;
if(!id){
    return res.status(STATUS_USER_ERROR).json({error: "Falto enviar id"})
} else {
  const filteredPosts =  posts.find(post => post.id === id)
  if(!filteredPosts){
      return res.status(STATUS_USER_ERROR).json({error: "El id enviado no coincide con ningun post"})
  }
  posts = posts.filter(post => post.id !== id) 
  res.json({ success: true })
}
})

server.delete("/author", (req,res) => {
const {author} = req.body;
if(!author){
    return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
} else {
   const filteredPosts = posts.filter(post => post.author === author)// devuelve un array 

   if(filteredPosts.length === 0){ // por eso pregunto con length en el if y no con !filteredPosts
    return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})   
   }
   posts = posts.filter(post => post.author !== author)// reasigno el array posts con el nuevo array con los elementos eliminados
   res.json(filteredPosts)
}
})


module.exports = { posts, server };
