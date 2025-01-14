const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json(users);
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4))

  return res.status(300).json({message: "Here are some books."});
});
const getBooks = async () => {

    const res = await axios.get("https://brandiransom-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/").then(response => response.body);
    return res}
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({message: "Here are some ISBNs."});
 });
 const getBookISBN = async (isbn) => {

    const res = await axios.get("https://brandiransom-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/".concat(isbn)).then(response => response.body);
    return res}
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const isbns = Object.keys(books)
  for (let i=0; i<isbns.length; i++) {
    if (books[isbns[i]]['author']===req.params.author) {
        res.send(books[isbns[i]]);
    }
  }

  return res.status(300).json({message: "Here is a book. "});
});
const getBookAuthor = async (author) => {

    const res = await axios.get("https://brandiransom-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/".concat(author)).then(response => response.body);
    return res}
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const isbns = Object.keys(books)
  for (let i=0; i<isbns.length; i++) {
    if (books[isbns[i]]['title']===req.params.title) {
        res.send(books[isbns[i]]);
    }
  }
  return res.status(300).json({message: "Here is a book."});
});
const getBooktitle = async (title) => {

    const res = await axios.get("https://brandiransom-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/".concat(title)).then(response => response.body);
    return res}
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]['reviews']);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
