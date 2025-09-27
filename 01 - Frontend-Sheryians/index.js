// var h1 = document.createElement('h1');
// h1.innerHTML = 'Hello World';
// document.body.appendChild(h1);

var h1 = React.createElement('h1', null, 'Hello World From React');
//console.log(h1);
ReactDOM.render(h1, document.getElementById('root'));