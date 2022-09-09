// Bugs 
// 1. can't have two decimal points in one calc (2.2+4.4)
// 2. likes 8*.2  dislikes .2*8  Problem with validate let regex = /\d+[+|\-|*|\/]\d+/;

const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numButs = document.querySelectorAll(".num");
const equalsBut = document.querySelector(".equals");
const clearBut = document.querySelector(".clear");
const opButs = document.querySelectorAll(".op");
const decPointBut = document.querySelector(".point");
const delBut = document.querySelector(".del");

const numberRegex = /\d/;
const opRegex = /[+|\-|*|\/]/g;
const decPointRegex = /\./g;
const validArrayCalcRegex = /\d+[+|\-|*|\/]\d+/;


let inputArr = [];
let calcStarted = false;

function validate(regex, str){
    return regex.test(str);
}

// There is repeated functionality throughout my program
// I need to modularise the repeated operations into named functions and reuse them 

function activatebuttons(button){
    switch(button) {
        case numButs:
            button.forEach((but) => {
                but.addEventListener('click', calculation)
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
function deactivatebuttons(button){
    switch(button) {
        case numButs:
            button.forEach((but) => {
                but.removeEventListener('click', calculation)
            });
            break;
        case equalsBut:
            button.removeEventListener('click', equals);
            break;
        case opButs:
            button.forEach((but) => {
                but.removeEventListener('click', calculation);
            });
            break;
        case decPointBut:
            button.removeEventListener('click', calculation);
            break;
        case clearBut:
            button.removeEventListener('click', clear);
            break;
        case delBut:
            button.removeEventListener('click', del);
            break;
    }
}




function calculation(e) {
    activatebuttons(equalsBut);
    activatebuttons(delBut);
    if(!calcStarted){
        button = e.target.textContent;
        let regex3 = /\d/;
        if(display1.textContent === 'ANS' && regex3.test(button) ) {
            return
        }
        
        let clearButs = ["DEL", "C"];
        if(!clearButs.includes(button)) {
            console.log('yosss')
            display1.textContent += button;
            // Quick way to check if a number button is pressed
            if(+button){
                inputArr.push(+button);
            } 
            else {
                inputArr.push(button);
            }
            // Make operator buttons inactive after one is used
            let regex1 = /[+|\-|*|\/]/g
            let regex2 = /\./g
            let opMatch = display1.textContent.match(regex1);
            let pointMatch = display1.textContent.match(regex2);
            if (opMatch && opMatch.length === 1){
               deactivatebuttons(opButs)
            }
            if (pointMatch && pointMatch.length === 1){
               deactivatebuttons(decPointBut);
            }
        }
    } else {
        // after equals, operate on ANS or write new number and start again
        button = e.target.textContent;
        // let regex1 = /\d/;
        // let regex2 = /[+|\-|*|\/]/g;
        // let regex3 = /\./g
        if(validate(numberRegex, button)){
            inputArr = [button]
            display1.textContent = button;
            display2.textContent = '';
            calcStarted = false;
        } else if(validate(opRegex, button)){
           deactivatebuttons(opButs)
            inputArr.push(button);
            display1.textContent = `ANS${button}`;
            calcStarted = false;
        }
        //  else if(validate(decPointRegex, button)) {
        //    deactivatebuttons(decPointBut); 
        // }
    }
}

function equals(e) {
   deactivatebuttons(equalsBut);
   deactivatebuttons(delBut);
   activatebuttons(numButs);
   activatebuttons(opButs);
   activatebuttons(decPointBut);
    calcStarted = true;
    let inputStr = inputArr.join('');
    console.log(inputStr)
    let regex = /\d+[+|\-|*|\/]\d+/;
    let valid = regex.test(inputStr);
    console.log(valid)
    if(valid){
        if(inputArr.includes('+')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('+')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('+')+1).join('')
            inputArr = [add(+firstNum, +secondNum)];
            lastAns = add(+firstNum, +secondNum)
        } else if(inputArr.includes('-')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('-')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('-')+1).join('')
            inputArr = [subtract(+firstNum, +secondNum)];
            lastAns = subtract(+firstNum, +secondNum)
        } else if(inputArr.includes('*')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('*')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('*')+1).join('')
            inputArr = [multiply(+firstNum, +secondNum)];
            lastAns = multiply(+firstNum, +secondNum)
        }else {
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('/')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('/')+1).join('')
            inputArr = [divide(+firstNum, +secondNum)];
            lastAns = divide(+firstNum, +secondNum)
        } 
    } else {
        display2.textContent = 'ERROR';
    }
}

function clear(){
    inputArr = [];
    activatebuttons(numButs);
    activatebuttons(opButs);
    activatebuttons(decPointBut);
    activatebuttons(clearBut);
    display2.textContent = '';
    display1.textContent = '';
}

function del(){
    if(display1.textContent === 'ANS'){
        return
    }
    display1.textContent = display1.textContent.slice(0, display1.textContent.length-1);
    let deleted = inputArr.pop();

    if(validate(opRegex, deleted)) {
       activatebuttons(opButs);
    } else if(validate(decPointRegex, deleted)){
       activatebuttons(decPointBut);
    }
}


// function plusMinusToggle(){
//     if()
// }



// numButs.forEach((but) => {
//     but.addEventListener('click', calculation);
// })
activatebuttons(numButs);
activatebuttons(opButs);
activatebuttons(decPointBut);
activatebuttons(clearBut);

// opButs.forEach((but) => {
//     but.addEventListener('click', calculation);
// })

// decPointBut.addEventListener('click', calculation);


// clearBut.addEventListener('click', clear);




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


