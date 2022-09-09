const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numButs = document.querySelectorAll(".num");
const equalsBut = document.querySelector(".equals");
const clearBut = document.querySelector(".clear");
const opButs = document.querySelectorAll(".op");
const decPointBut = document.querySelector(".point");
const delBut = document.querySelector(".del");


let inputArr = [];
let lastAns
let calcStarted = false;

function calculation(e) {
    equalsBut.addEventListener('click', equals);
    delBut.addEventListener('click', del);
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
            let regex2 = /\./g
            let opMatch = display1.textContent.match(regex1);
            let pointMatch = display1.textContent.match(regex2);
            if (opMatch && opMatch.length === 1){
                opButs.forEach((but) => {
                    but.removeEventListener('click', calculation);
                })
            }
            if (pointMatch && pointMatch.length === 1){
                decPointBut.removeEventListener('click', calculation);
            }
        }
    } else {
        // after equals, operate on ANS or write new number and start again
        button = e.target.textContent;
        let regex1 = /\d/;
        let regex2 = /[+|\-|*|\/]/g;
        let regex3 = /\./g
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
            display1.textContent = `ANS${button}`;
            calcStarted = false;
        } else if(regex3.test(button)) {
            decPointBut.removeEventListener('click', calculation); 
        }
    }
}

function equals(e) {
    equalsBut.removeEventListener('click', equals);
    delBut.removeEventListener('click', del);
    numButs.forEach((but) => {
        but.addEventListener('click', calculation);
    })
    opButs.forEach((but) => {
        but.addEventListener('click', calculation);
    })
    decPointBut.addEventListener('click', calculation);
    calcStarted = true;
    let inputStr = inputArr.join('');
    let regex = /\d+[+|\-|*|\/]\d+/;
    let valid = regex.test(inputStr);
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
    numButs.forEach((but) => {
        but.addEventListener('click', calculation);
    });
    opButs.forEach((but) => {
        but.addEventListener('click', calculation);
    });
    display2.textContent = '';
    display1.textContent = '';
}

function del(){
    if(display1.textContent === 'ANS'){
        return
    }
    display1.textContent = display1.textContent.slice(0, display1.textContent.length-1);
    let deleted = inputArr.pop();
    let regex1 = /[+|\-|*|\/]/g
    let regex2 = /\./g
    if(regex1.test(deleted)) {
        opButs.forEach((but) => {
            but.addEventListener('click', calculation);
        })
    } else if(regex2.test(deleted)){
        decPointBut.addEventListener('click', calculation);
    }
}


// function plusMinusToggle(){
//     if()
// }



numButs.forEach((but) => {
    but.addEventListener('click', calculation);
})

opButs.forEach((but) => {
    but.addEventListener('click', calculation);
})

decPointBut.addEventListener('click', calculation);


clearBut.addEventListener('click', clear);




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


