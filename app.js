// First phase functionality (Basic 2 operand + - * /): 
// 1. Button key: 1  +  1
// 2. Display 1:  1  +  1 
// 3. Button key: =
// 4. Display 2:  2
// 5. Button key: + 4
// 6. Display 1: ANS + 4
// 7. Button key: =
// 8. Display 1: ANS + 4
// 9. Display 2: 6

// Base functionality:
// 1. 3 keys pressed for example 1 + 2, this results in:
//      a. Key values rendered to Display 1
//      b. inputArr to capture numButs keyed
// 2. Keying equals should complete the following:
//      a. Check that the input arr follow the form [num1, operator, num2]
//          i.  Yes = continue
//          ii. No  = Write error to Display 2.  Only clear button then works.  Clear = back to 1
//      b. Check operator then call appropriate function with args
//      c. Function returns result and writes to Display 2
// To be continued.....

const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numButs = document.querySelectorAll(".num");
const equalsBut = document.querySelector(".equals");
const clearBut = document.querySelector(".clear");

let inputArr = []

function beforeEquals(e) {
    let button = e.target.textContent;
    let clearButs = ["DEL", "C"];
    if(!clearButs.includes(button)) {
        display1.textContent += button;
        if(+button) inputArr.push(+button);
        else inputArr.push(button);
    }
}

function afterEquals(e) {
    numButs.forEach((but) => {
        but.removeEventListener('click', beforeEquals);
    })
    let inputStr = inputArr.join('');
    console.log(inputStr);
    let regex = /\d+[+|\-|*|\/]\d+/;
    let valid = regex.test(inputStr);
    console.log(valid);
    if(valid){
        if(inputArr.includes('+')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('+')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('+')+1).join('')
            console.log(inputArr)
            console.log(firstNum, secondNum)
            return add(+firstNum, +secondNum)
        } else if(inputArr.includes('-')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('-')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('-')+1).join('')
            console.log(firstNum, secondNum)
            return subtract(+firstNum, +secondNum)
        } else if(inputArr.includes('*')){
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('*')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('*')+1).join('')
            console.log(firstNum, secondNum)
            return multiply(+firstNum, +secondNum)
        }else {
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('/')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('/')+1).join('')
            console.log(firstNum, secondNum)
            return divide(+firstNum, +secondNum)
        } 
    } else {
        display2.textContent = 'ERROR';
        display1.textContent += 'Press clear';
    }
}

function clear(){
    inputArr = [];
    numButs.forEach((but) => {
        but.addEventListener('click', beforeEquals);
    });
    display2.textContent = '';
    display1.textContent = '';
}

  


// function populateInputArray(e){
//     let button = e.target.textContent;
//     let clearButs = ["DEL", "C"];
//     if(!clearButs.includes(button)) {
//         display1.textContent += button;
//         if(+button) inputArr.push(+button)
//         else inputArr.push(button)
//     }


    // inputArr.reduce((acc, curVal) => {
    //     if(typeof acc === 'number' && typeof curVal === 'number'){
    //         return "" + acc + curVal;
    //     } else if ()
    // })
// }

// function returnResult(){
//     console.log('=======')
//     if(inputArr.includes('+')){
//             console.log(inputArr)
//             let firstNum = inputArr.slice(0, ((inputArr.indexOf('+')))).join('')
//             let secondNum = inputArr.slice(inputArr.indexOf('+')+1).join('')
//             console.log(firstNum, secondNum)
//             return add(+firstNum, +secondNum)
//     }
// }


numButs.forEach((but) => {
    but.addEventListener('click', beforeEquals);
})

equalsBut.addEventListener('click', afterEquals);

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

function operate(op,a,b){
    return operate(a,b);
}

