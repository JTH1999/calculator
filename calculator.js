var current = document.getElementById("current");
var previous = document.getElementById("previous");
var zero = document.getElementById("0");
var one = document.getElementById("1");
var two = document.getElementById("2");
var three = document.getElementById("3");
var four = document.getElementById("4");
var five = document.getElementById("5");
var six = document.getElementById("6");
var seven = document.getElementById("7");
var eight = document.getElementById("8");
var nine = document.getElementById("9");
var plus = document.getElementById("+");
var minus = document.getElementById("-");
var div = document.getElementById("/");
var mult = document.getElementById("*");
var equal = document.getElementById("equals");
var dot = document.getElementById("dot");
var c = document.getElementById("clear");
var del = document.getElementById("delete");

var elements = document.getElementsByClassName("expression");

var computed = true;
current.innerHTML = "0";
console.log(-4/5);

function buttonPress(value) {
    console.log(current.innerHTML[current.innerHTML.length - 2]);
    console.log(current.innerHTML);
    if (computed) {
        if (value === "/" || value === "*" || value === "-" || value === "+") {
            current.innerHTML += " " + value + " ";
        }
        else if (!isNaN(parseFloat(value)) || value == ".") {
            previous.innerHTML += " " + current.innerHTML;
            current.innerHTML = value;
        }

        computed = false;
    }
    else {
        if (value === "/" || value === "*" || value === "-" || value === "+") {
            var last = current.innerHTML[current.innerHTML.length - 2];
            if (last === "/" || last === "*" || last === "-" || last === "+") {
                var newstring = current.innerHTML.substring(0, current.innerHTML.length - 2) + value + " ";
                current.innerHTML = newstring;
            } else {
                current.innerHTML += " " + value + " ";
            }
            
        } else {
         current.innerHTML += value;
        }
    }
}

function clear() {
    current.innerHTML = "0";
}

function deleteLast() {
    var last = current.innerHTML[current.innerHTML.length - 1];
    if (last == " ") {
        current.innerHTML = current.innerHTML.substring(0, current.innerHTML.length - 3);
    }
    else {
        current.innerHTML = current.innerHTML.substring(0, current.innerHTML.length - 1);
    }
    current.innerHTML
}

function equals() {
    var answer = evaluate(current.innerHTML);
    document.getElementById("previous").innerHTML = current.innerHTML + " =";
    current.innerHTML = answer;
    computed = true;
}

function evaluate(expression) {
    var result;

    var plusIndex = expression.indexOf('+');
    if (plusIndex != -1) {
        var first = expression.substring(0, plusIndex);
        var second = expression.substring(plusIndex + 1);
        result = evaluate(first) + evaluate(second);
        return result;
    }

    var minusIndex = expression.indexOf('-');
    if (minusIndex != -1) {
        var first = expression.substring(0, minusIndex);
        var second = expression.substring(minusIndex + 1);
        result = evaluate(first) - evaluate(second);
        return result;
    }

    var multIndex = expression.indexOf('*');
    if (multIndex != -1) {
        var first = expression.substring(0, multIndex);
        var second = expression.substring(multIndex + 1);
        result = evaluate(first) * evaluate(second);
        return result;
    }

    var multIndex = expression.indexOf('/');
    if (multIndex != -1) {
        var first = expression.substring(0, multIndex);
        var second = expression.substring(multIndex + 1);
        result = evaluate(first) / evaluate(second);
        return result;
    }

    const parsed = parseFloat(expression);
    if (!isNaN(parsed)) {
        return parsed;
    }

    return result;
}

zero.addEventListener('click', function() {buttonPress(zero.innerHTML);});
one.addEventListener('click', function() {buttonPress(one.innerHTML);});
two.addEventListener('click', function() {buttonPress(two.innerHTML);});
three.addEventListener('click', function() {buttonPress(three.innerHTML);});
four.addEventListener('click', function() {buttonPress(four.innerHTML);});
five.addEventListener('click', function() {buttonPress(five.innerHTML);});
six.addEventListener('click', function() {buttonPress(six.innerHTML);});
seven.addEventListener('click', function() {buttonPress(seven.innerHTML);});
eight.addEventListener('click', function() {buttonPress(eight.innerHTML);});
nine.addEventListener('click', function() {buttonPress(nine.innerHTML);});
plus.addEventListener('click', function() {buttonPress(plus.innerHTML);});
minus.addEventListener('click', function() {buttonPress(minus.innerHTML);});
div.addEventListener('click', function() {buttonPress(div.innerHTML);});
mult.addEventListener('click', function() {buttonPress(mult.innerHTML);});
dot.addEventListener('click', function() {buttonPress(dot.innerHTML);});
equal.addEventListener('click', equals);
c.addEventListener('click', clear);
del.addEventListener('click', deleteLast);
