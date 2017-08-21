var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'marrigopal87',
    database: 'marrigopal87',
    host: 'http://db.imad.hasura-app.io',
    post: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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
    return ["pbkdf2","100000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res) {
    var hashstring = hash(req.params.input,'this-is-some-string');
    res.send(hashstring);
});

var pool = new Pool(config);
app.post('/create-user', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result){
        if (err){
            res.status(500).send(err.toString());
        } else {
            res.send("user created successfully" + username);
        }
        });
});

app.post('/login', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
   
       pool.query('SELECT * from "user" WHERE username = $1', [username], function(req,res){
        if (err){
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0){
                res.send(403).send("user name value is invalid");
            }
            else {
                var dbString = res.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);
                res.send("user created successfully");
                if(hashedPassword === dbString){
                    res.send('user successfully logged in');
                } else
                {
                    res.send(403).send("username/pwd value is invalid");
                }
            }
            
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
