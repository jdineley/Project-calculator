const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numButs = document.querySelectorAll(".num");
const equalsBut = document.querySelector(".equals");
const clearBut = document.querySelector(".clear");
const opButs = document.querySelectorAll(".op");

let inputArr = [];
let calcStarted = false;
let button;

function calculation(e) {
    if(!calcStarted){
        button = e.target.textContent;
        let clearButs = ["DEL", "C"];
        if(!clearButs.includes(button)) {
            display1.textContent += button;
            // Quick way to check if a number button is pressed
            if(+button) inputArr.push(+button);
            else inputArr.push(button);
            // Make operator buttons inactive after one is used
            let regex1 = /[+|\-|*|\/]/g
            let match = display1.textContent.match(regex1);
            if (match && match.length === 1){
                opButs.forEach((but) => {
                    but.removeEventListener('click', calculation);
                })
            }
        }
    } else {
        // after equals, operate on ANS or write new number and start again
        button = e.target.textContent;
        let regex1 = /\d/;
        let regex2 = /[+|\-|*|\/]/g;
        if(regex1.test(button)){
            inputArr = [button]
            display1.textContent = button;
            display2.textContent = '';
            calcStarted = false;
        } else if(regex2.test(button)){
            opButs.forEach((but) => {
                but.removeEventListener('click', calculation);
            })
            inputArr.push(button);
            display1.textContent = `ANS ${button}`;
            calcStarted = false;
        }
    }
}

function equals(e) {
    numButs.forEach((but) => {
        but.addEventListener('click', calculation);
    })
    opButs.forEach((but) => {
        but.addEventListener('click', calculation);
    })
    calcStarted = true;
    let inputStr = inputArr.join('');
    let regex = /\d+[+|\-|*|\/]\d+/;
    let valid = regex.test(inputStr);
    if(valid){
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
        display2.textContent = 'ERROR - enter a number first';
        display1.textContent += 'Press clear';
    }
}

function clear(){
    inputArr = [];
    numButs.forEach((but) => {
        but.addEventListener('click', calculation);
    });
    opButs.forEach((but) => {
        but.addEventListener('click', calculation);
    });
    display2.textContent = '';
    display1.textContent = '';
}



numButs.forEach((but) => {
    but.addEventListener('click', calculation);
})

opButs.forEach((but) => {
    but.addEventListener('click', calculation);
})

equalsBut.addEventListener('click', equals);

clearBut.addEventListener('click', clear)

function add(a,b){
    display2.textContent = a + b;
    return a + b;
}

function subtract(a,b){
    display2.textContent = a - b;
    return a-b;
}

function multiply(a,b){
    display2.textContent = a * b;
    return a*b;
}

function divide(a,b){
    display2.textContent = a / b;
    return a/b;
}


