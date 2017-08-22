console.log('Loaded!');

var button = document.getElementById('counter');
var submit = document.getElementById('submit_btn');
var counter = 0;
submit.onclick = function () {
        //Make a request to end point
    var request = new XMLHttpRequest();
    //Get the variable.
    request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    var counter = request.responseText;
                    var span = document.getElementById('count');
                    span.innerHTML = counter.toString();
                }
            };
    
    //show it in correct span
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://marrigopal87.imad.hasura-app.io/login', true);
    request.send(JSON.stringify({username: username,password:password}));
    
    
};