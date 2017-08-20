console.log('Loaded!');

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
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
    
    request.open('GET', 'http://marrigopal87.imad.hasura-app.io/counter', true);
    request.send(null);
    
    
};