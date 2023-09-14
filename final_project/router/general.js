const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "Unable to register user!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user!"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //res.send(JSON.stringify({books},null,4));
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);
        }, 2000);
    });

    myPromise
        .then((books) => {
        res.send(JSON.stringify({ books }, null, 4));
        })
        .catch((error) => {
        return res.status(404).json({ message: error.message });
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  
  //res.send(JSON.stringify(books[isbn] ,null,4));

    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(isbn);
        }, 2000);
    });

    myPromise
        .then((data) => {
        res.send(JSON.stringify(books[data], null, 4));
        })
        .catch((error) => {
        return res.status(404).json({ message: error.message });
        });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;

    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(author);
        }, 2000);
    });

    myPromise
        .then((data) => {
            let filtered_author = Object.values(books).filter(book => book.author === data);
            res.send(JSON.stringify(filtered_author, null, 4));
        })
        .catch((error) => {
        return res.status(404).json({ message: error.message });
        });

    // let filtered_author = Object.values(books).filter(book => book.author === author);
    // res.send(filtered_author);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(title);
        }, 2000);
    });

    myPromise
        .then((data) => {
            let filtered_title = Object.values(books).filter(book => book.title === data);
            res.send(JSON.stringify(filtered_title, null, 4));
        })
        .catch((error) => {
        return res.status(404).json({ message: error.message });
        });

    // let filtered_title = Object.values(books).filter(book => book.title === title);
    // res.send(filtered_title);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let reviews = books[isbn].reviews;
  res.send(JSON.stringify(reviews,null,4));
});

module.exports.general = public_users;
