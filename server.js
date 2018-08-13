const express = require("express"); 
const hbs = require('hbs');
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public', { immutable: true }));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            console.log("Unable to append to server.log");
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get("/",(req,res) =>{
    res.render("home.hbs",{
        pageTitle:"Home page",
        welcomeMessage:'Welcome to my website',
        currentYear:new Date().getFullYear()
    });
});
app.get("/maintainance",(req,res) =>{
    res.render("maintainance.hbs",{
        pageTitle:"maintainance page",
        welcomeMessage:'maintainance page',
        currentYear:new Date().getFullYear()
    });
});

app.get("/projects",(req,res) =>{
    res.render("projects.hbs",{
        pageTitle:"Projects page",
        welcomeMessage:'Project page text would ho here',
        currentYear:new Date().getFullYear()
    });
});


app.get('/about',(req,res) => {
    // res.send("About page");
    res.render('about.hbs',{
        pageTitle:"About page",
        currentYear:new Date().getFullYear()
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Sorry faild to load this page'
    });
});


app.listen(3000); 
console.log ('server is up on port 3000');