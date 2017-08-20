var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.user(bodyParser.json());

var articles = {
    'article-one': {
        title: "Article One | Gopal",
        heading: "My First Article",
        Content: `<p>
                        This is my first Article and I love to build webapps.
                </p>`
    },
    'article-two': {
        title: "Article two | Gopal",
        heading: "My Second Article",
        Content: `<p>
                        This is my Second Article and I love to build webapps.
                </p>`
    },
    'article-three': {
        title: "Article Three | Gopal",
        heading: "My Third Article",
        Content: `<p>
                        This is my Third Article and I love to build webapps.
                </p>`
    }
};

function createTemplete(data){
  var title = data.title;
  var heading = data.heading;
  var Content = data.Content;

var htmlTemplete = `
<html>
    <head>
        
    <title>
    ${title}
    </title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class="container">
            <div>
                <a href="/"> Home </a>
            </div>
            <h3>${heading}</h3>
            
            <div>
                Aug 19th 2017.
            </div>
            <div>
                ${Content}
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplete;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req,res) {
    var hashstring = hash(req.params.input,'this-is-some-string');
    res.send(hashstring);
});

var pool = new pool(config);
app.get('/create-user', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.getRandombytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbstring], function(req,res){
        if (err){
            res.status(500).send(err.toString());
        } else {
            res.send("user created successfully");
        }
        
        
    });
});

var counter = 0;
app.get('/counter', function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/:articleName', function(req,res) {
    var articleName = req.params.articleName;
    res.send(createTemplete(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
