const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numButs = document.querySelectorAll(".num");
const equalsBut = document.querySelector(".equals");
const clearBut = document.querySelector(".clear");
const opButs = document.querySelectorAll(".op");
const decPointBut = document.querySelector(".point");
const delBut = document.querySelector(".del");

const numberRegex = /\d/;
const opRegex = /[\+\-\*\/]/;


let inputArr = [];
let calcStarted = false;
let button;

activatebuttons(numButs);
activatebuttons(opButs);
activatebuttons(decPointBut);
activatebuttons(clearBut);
activatebuttons(equalsBut)
activatebuttons(delBut)


function add(a,b){
    let newAns = (a + b)
    // .toPrecision(5);
    display2.textContent = newAns;
    return a+b;
}

function subtract(a,b){
    let newAns = (a - b)
    // .toPrecision(5);
    display2.textContent = newAns;
    return a-b;
}

function multiply(a,b){
    let newAns = (a * b)
    // .toPrecision(5);
    display2.textContent = newAns;
    return a*b;
}

function divide(a,b){
    let newAns = (a / b)
    // .toPrecision(5);
    display2.textContent = newAns;
    return a/b;
}

function validate(regex, str){
    return regex.test(str);
}


function activatebuttons(button){
    switch(button) {
        case numButs:
            button.forEach((but) => {
                but.addEventListener('click', calculation)
                but.addEventListener('touchstart', calculation)
            });
            break;
        case equalsBut:
            button.addEventListener('click', equals);
            break;
        case opButs:
            button.forEach((but) => {
                but.addEventListener('click', calculation);
            });
            break;
        case decPointBut:
            button.addEventListener('click', calculation);
            break;
        case clearBut:
            button.addEventListener('click', clear);
            break;
        case delBut:
            button.addEventListener('click', del);
            break;
    }
}

// Inline validation checks for each input character and filters away non valid entries
function inLineValidation(e){
    button = e.target.textContent;
    // if(display1.textContent.length === 11) return false
    display1.textContent += button;
    let clearButs = ["DEL", "C"];
    if(!clearButs.includes(button)) {
        if(/ANS/.test(display1.textContent)){
            if(!/^ANS[+*/-](\d+(\.\d*)?)?$/.test(display1.textContent)){
                console.log('invalid')
                display1.textContent = display1.textContent.slice(0, display1.textContent.length-1)
                return false
            }
        } else {
            if(!/^(\d+(\.\d*)?((?<=\d)[+*/-]))?(\d+(\.\d*)?)?$/.test(display1.textContent)){
                console.log('invalid')
                display1.textContent = display1.textContent.slice(0, display1.textContent.length-1)
                return false
            } 
        }
    }
}

function calculation(e) {
    e.preventDefault();
    if(!calcStarted){
        // run inline validation to only allow a valid calculation to be written one character at a time
        if(inLineValidation(e) === false) return
        if(+button){
            inputArr.push(+button);
        }  
        else {
            inputArr.push(button);
        }
    } else {
        // after equals, operate on ANS or write new number and start again
        button = e.target.textContent;
        if(validate(numberRegex, button)){
            inputArr = [button]
            display1.textContent = button;
            display2.textContent = '';
            calcStarted = false;
        } else if(validate(opRegex, button)){
            inputArr.push(button);
            display1.textContent = `ANS${button}`;
            calcStarted = false;
        }
    }
}

function equals(e) {
    let inputStr = inputArr.join('');
    let regex = /\-?\d+\.?\d*e?\-?\+?\d*[+\-*\/]\d*\.?\d+$/;
    let valid = regex.test(inputStr);

    if(valid){
        calcStarted = true;
        if(inputArr.includes('+')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('+')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('+')+1).join('')
            inputArr = [add(+firstNum, +secondNum)];
        } else if(inputArr.includes('-')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('-')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('-')+1).join('')
            inputArr = [subtract(+firstNum, +secondNum)];
        } else if(inputArr.includes('*')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('*')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('*')+1).join('')
            inputArr = [multiply(+firstNum, +secondNum)];
        }else {
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('/')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('/')+1).join('')
            inputArr = [divide(+firstNum, +secondNum)];
        } 
    } else {
        // Supress equals untill a valid complete calculation is defined
        console.log('invalid equals')
        return
    }
}

function clear(){
    inputArr = [];
    display2.textContent = '';
    display1.textContent = '';
}

function del(){
    if(display1.textContent === 'ANS' || calcStarted === true){
        return
    }
    display1.textContent = display1.textContent.slice(0, display1.textContent.length-1);
    let deleted = inputArr.pop();
}





