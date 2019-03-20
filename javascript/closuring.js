from "https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures";

/* Example of Closuring #1 */

function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
};

var myFunc = makeFunc();
myFunc();

/* ----------------------- */
/* Example of Closuring #2 */

function makeAdder(x) {
  return function(y) {
    return x + y;
  };
};

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

/* ----------------------- */
/* Example of Closuring #3 */

function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
};

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

/* ----------------------- */
/* Example of Closuring #4 */

var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

alert(Counter.value()); /* Alerts 0 */
Counter.increment();
Counter.increment();
alert(Counter.value()); /* Alerts 2 */
Counter.decrement();
alert(Counter.value()); /* Alerts 1 */

/* ----------------------- */
/* Example of Closuring #5 */

var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
alert(Counter1.value()); /* Alerts 0 */
Counter1.increment();
Counter1.increment();
alert(Counter1.value()); /* Alerts 2 */
Counter1.decrement();
alert(Counter1.value()); /* Alerts 1 */
alert(Counter2.value()); /* Alerts 0 */

/* ----------------------- */
/* Example of Closuring #6 */

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Ваш адрес e-mail'},
      {'id': 'name', 'help': 'Ваше полное имя'},
      {'id': 'age', 'help': 'Ваш возраст (Вам должно быть больше 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();

/* ----------------------- */