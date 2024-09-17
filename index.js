const express = require('express');
const jwt = require('jsonwebtoken');
const jwtpass = 'kunal';
const mongoose = require('mongoose');
const {UserModel, TodoModel} = require("./db");

mongoose.connect("");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password,
    });


    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        },jwtpass)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }

});

function auth (req, res, next) {
    const token = req.headers.token
    const decodedinformation = jwt.verify(token, jwtpass);
    if (decodedinformation) {
        req.userId = decodedinformation.id;
        next();
    } else {
        res.status(403).json({
            message: "you are not logged in"
        })
    }
}

app.post("/todo", auth, async function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const mark = req.body.mark;

    await TodoModel.create({
        userId,
        title,
        mark
    });
    
    res.json({

        Message: "todo created"
    })

});

app.get("/todos", auth, async function(req,res){
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);