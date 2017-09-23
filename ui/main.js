console.log('Loaded!');

var button = document.getElementById('counter');
counter.innerHTML = 'Click here';
var submit = document.getElementById('submit_btn');
//var counter = 0;
submit.onclick = function () {
        //Make a request to end point
    var request = new XMLHttpRequest();
    //Get the variable.
    request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status === 200)
                {
                    console.log('user logged in');
                    alert('logged in');
                } else if(request.status === 403) {
                    alert('username/pwd is invalid');
                } else if (request.status === 500) {
                    alert('somethingwent wrong');
                    }
                    
                }
            };
    
    //show it in correct span
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://marrigopal87.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username,password:password}));
    
    
};
button.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status === 200)
                {
                    var counter = request.responseText;
                    var span = document.getElementById('count');
                    span.innerHTML = counter.toString();
                }
            }
    
        };
 request.open('GET', 'http://marrigopal87.imad.hasura-app.io/counter', true);
 request.send(null);
};
var submitbutton = document.getElementById('submit_btn1');
submitbutton.onclick = function(){
  
//  var nameInput = document.getElementById('name');
//  var name = nameInput.value;
  var names = ['name1', 'name2', 'name3'];
  var list = '';
  for(var i=0; i< names.length; i++){
      list == '<li>' +names[i] + '</li>';
  }
  var ul = document.getElementById('orderlist');
  ul.innerHTML = list;
};