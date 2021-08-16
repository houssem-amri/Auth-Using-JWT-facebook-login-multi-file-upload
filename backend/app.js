// import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import mongoose module
const mongoose = require("mongoose");


// import Bcrypt module
const bcrypt = require("bcrypt");
// import nodemailer
const nodemailer = require('nodemailer');
// import nodemailer 
const jwt = require("jsonwebtoken");

// import  module path predefini en node js
const path = require('path');

// import multer module
const multer = require('multer');



mongoose.connect("mongodb://localhost:27017/projetDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express();
// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// configure path
app.use('/images', express.static(path.join('backend/images')));
// cofiguration d'image
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error('Mime type is invalid');
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-projet-' + '.' + extension;
        cb(null, imgName);
    }
});
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
const User = require("./models/user.js");
const Product = require("./models/product.js");
const File = require("./models/files.js");




app.post("/users/signup", (req, res) => {
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("Here in signup", req.body);
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            pwd: cryptedPwd,
            role: req.body.role,

        });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'votre adrees gmail',
                pass: 'votre pwd gmail'
            }
        });
        var mailOptions = {
            from: 'votre-adress-Pro@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        user.save((err, result) => {
            console.log("Here into signup ERROR", err);
            console.log("Here into signup RESULT", result);

            if (result) {
                console.log("here into 1");
                res.status(200).json({
                    message: "1"
                });
            }

            if (err) {
                if (err.name == "ValidationError") {
                    console.log('here into 0');
                    res.status(200).json({
                        message: "0"
                    });
                }
            }
        });
    });
});


app.post("/users/signin", (req, res, next) => {
    let fetchedUser;

    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Auth failed no such user"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.pwd, user.pwd);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Auth failed inccorect password"
            })
        }
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id, userRole: fetchedUser.userRole },
            "secret_this_should_be_longer",
            { expiresIn: "1min" }
        );
        res.status(200).json({
            token: token,
            expiresIn: 60,
            userId: fetchedUser._id,
            userRole: fetchedUser.role
        });
        console.log('here role', fetchedUser.role);
    })
        .catch(e => {

            console.log(e)

        })
})

app.get('/users/getAll', (req, res) => {
    console.log('here get all users');
    User.find((err, docs) => {
        if (err) {
            console.log('error widh DB');
        } else {
            res.status(200).json({
                users: docs
            });
        }
    });
});

// product 

app.post('/product', multer({ storage: storage }).single('image'), (req, res) => {
    console.log('req.file', req.file);
    url = req.protocol + '://' + req.get('host');
    console.log('here url', url);


    product = new Product({
        nom: req.body.nom,
        categorie: req.body.categorie,
        prix: req.body.prix,
        description: req.body.description,
        image: url + '/images/' + req.file.filename
    });


    product.save().then(
        res.status(200).json({
            message: 'product Added successfully'
        })
    );
});
app.get('/product', (req, res) => {
    console.log('here get all product');
    Product.find((err, docs) => {
        if (err) {
            console.log('error widh DB');
        } else {
            res.status(200).json({
                product: docs
            });
        }
    });
});
app.delete('/product/:id', (req, res) => {
    console.log('here product is deleted', req.params.id);
    Product.deleteOne({ _id: req.params.id }).then(
        res.status(200).json({
            message: 'product deleted successfully'
        })
    );
});
app.put('/product/:id', (req, res) => {
    console.log('here product is update');
    const product = new Product({
        _id: req.body._id,
        nom: req.body.nom,
        categorie: req.body.categorie,
        prix: req.body.prix,
        description: req.body.description,
        image: req.body.image
    });
    Product.updateOne({ _id: req.params.id }, product).then((result) => {
        if (result) {
            res.status(200).json({
                message: 'product updated'
            });
        }
    });
});

app.get('/product/:id', (req, res) => {
    console.log('here product id', req.params.id);
    Product.findOne({ _id: req.params.id }).then((findedObject) => {
        if (findedObject) {
            res.status(200).json({
                product: findedObject
            });
        }
    });
});

app.post("/multifiles/upload", multer({ storage: storage }).array("file", 12), function (req, res) {
    console.log('files', req.files);

    url = req.protocol + '://' + req.get('host');
    file = new File({

        file: url + '/images/' + req.files[0].filename
    });
    file.save().then(
        res.status(200).json({
            message: 'files Added successfully'
        })
    );
});

app.get('/multifiles/files', (req, res) => {
    console.log('here get all File');
    File.find((err, docs) => {
        if (err) {
            console.log('error widh DB');
        } else {
            res.status(200).json({
                files: docs
            });
        }
    });
});


module.exports = app;
