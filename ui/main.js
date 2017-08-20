console.log('Loaded!');

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
        //Make a request to end point
    
    //Get the variable.
    
    //show it in correct span
    
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
};