// Bugs 
// 1. can't have two decimal points in one calc (2.2+4.4)
// 2. likes 8*.2  dislikes .2*8  Problem with validate let regex = /\d+[+|\-|*|\/]\d+/;
// 3. delete screws with button deactiveation logic allowing 2.1.
//    solution will be to write a better activate/deactivate logic
//    a. with ANS in the array
//    b. without ANS in the array
// improve equal function by:
// string.split('*') to remove operator
// log which operator was removed
// use arr.reduce on the remaining array to return the result: return acc * curVal

// I need some return regex/conditions



// General Calculator functionality:
// Display1 = top section highlighting the current calculation (LH aligned), which is stored in variable inputStr
// Display2 = bottom section shows result (RH aligned)
// 1. Click clear (calls clear()) (or restarting the appication) does the following:
    //  Activates all numButs
    //    1a Click a numBut does
    //          updates inputStr which simultaneously updates Display1
    //          Checks inputStr against valid calculation string
    //              if(true){equalsBut active}
    //                1b Click equalBut does
    //                      use inputStr to call the appropriate operation function
    //                      write the result of operation function into Display2
    //                      make inputStr = result of operation
    //                      deactivate equalBut
    //                      deactivate opBut
    //                      deactivate deleteBut
    //          Activates delBut & opBut
    //           1c Click opBut does:
    //                  updates inputStr which simultaneously updates Display1
    //           1d Click delBut does:
    //                  removes last character from inputStr which simultaneously updates Display1
    //  Deactivates equals, operation and delete buttons
// 2. Click numBut does
//      calls clear()... return to #1
// 3. Click opBut
//      write ANS into Display1      
//      
//    |-----  2
// 1 -|-----  3
//    |-----  4

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
const decPointRegex = /\./g;
const validArrayCalcRegex = /\d+[+|\-|*|\/]\d+/;


let inputArr = [];
let calcStarted = false;
let button;

function validate(regex, str){
    return regex.test(str);
}


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






function calculation(e) {

    
    if(!calcStarted){

            button = e.target.textContent;
            
            display1.textContent += button;
            console.log(/^ANS[+\-*\/]\d*\.?\d*$/.test(display1.textContent))
        
        let clearButs = ["DEL", "C"];
        if(!clearButs.includes(button)) {
            // let newText = display1.textContent + button;
            // console.log(display1.textContent, /ANS/.test(display1.textContent));
            if(/ANS/.test(display1.textContent)){
                if(!/^ANS[+\-*\/]\d*\.?\d*$/.test(display1.textContent)){
                    console.log('invalid')
                    display1.textContent = display1.textContent.slice(0, display1.textContent.length-1)
                    return
                }
            } else if(/[+\-*\/]/.test(display1.textContent)){
                if(!/^\d+\.?\d*[+\-*\/]?\d*\.?\d*$/.test(display1.textContent)){
                    console.log('invalid')
                    display1.textContent = display1.textContent.slice(0, display1.textContent.length-1)
                    return
                }
            } else {
                if(!/^\d+\.?\d*$/.test(display1.textContent)){
                    console.log('invalid')
                    display1.textContent = display1.textContent.slice(0, display1.textContent.length-1)
                    return
                } 
            }

            // display1.textContent += button;
            // Quick way to check if a number button is pressed
            if(+button){
                inputArr.push(+button);
            }  
            else {
                inputArr.push(button);
            }

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
            // calculation();
        }
    }
}

function equals(e) {
//    deactivatebuttons(equalsBut);
//    deactivatebuttons(delBut);
//    activatebuttons(numButs);
//    activatebuttons(opButs);
//    deactivatebuttons(decPointBut);
    calcStarted = true;
    let inputStr = inputArr.join('');
    // console.log(inputStr)
    let regex = /[\d\.]+[+\-*\/][\d\.]+/;
    let valid = regex.test(inputStr);
    // console.log(valid)
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

    // if(validate(opRegex, deleted)) {
    //    activatebuttons(opButs);
    // } else if(validate(decPointRegex, deleted)){
    //    activatebuttons(decPointBut);
    // }
}


activatebuttons(numButs);
activatebuttons(opButs);
activatebuttons(decPointBut);
activatebuttons(clearBut);
activatebuttons(equalsBut)
activatebuttons(delBut)


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


