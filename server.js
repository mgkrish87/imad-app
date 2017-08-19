var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/:', function(req,res) {
    res.send(createTemplete(articleOne));
});

app.get('/Article-two', function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/Article-three', function(req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

    var articleOne = {
        title: "Article One | Gopal",
        heading: "My First Article",
        Content: `<p>
                        This is my first Article and I love to build webapps.
                </p>`
    }
    var articletwo = {
        title: "Article two | Gopal",
        heading: "My Second Article",
        Content: `<p>
                        This is my Second Article and I love to build webapps.
                </p>`
    }
    var articlethree = {
        title: "Article Three | Gopal",
        heading: "My Third Article",
        Content: `<p>
                        This is my Third Article and I love to build webapps.
                </p>`
    }


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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
