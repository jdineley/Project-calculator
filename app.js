const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const buttons = document.querySelectorAll(".cell")
const equals = document.querySelector(".equals")

// 1.Click button and it:
//      a. writes to display 1
//      b. writes to input array logging the operation arguments
// 2. Once arr 

let inputArr = []
// [1,5,8,3,+,4,5,3,1] 

// 1. Populate array
// 2. click =
// 3. runs calculate function


function populateInputArray(e){
    let button = e.target.textContent;
    let clearButs = ["DEL", "C"];
    if(!clearButs.includes(button)) {
        display1.textContent += button;
        if(+button) inputArr.push(+button)
        else inputArr.push(button)
    }


    // inputArr.reduce((acc, curVal) => {
    //     if(typeof acc === 'number' && typeof curVal === 'number'){
    //         return "" + acc + curVal;
    //     } else if ()
    // })
}

function returnResult(){
    console.log('=======')
    if(inputArr.includes('+')){
            console.log(inputArr)
            let firstNum = inputArr.slice(0, ((inputArr.indexOf('+')))).join('')
            let secondNum = inputArr.slice(inputArr.indexOf('+')+1).join('')
            console.log(firstNum, secondNum)
            return add(+firstNum, +secondNum)
    }
}


buttons.forEach((but) => {
    but.addEventListener('click', populateInputArray);
})

equals.addEventListener('click', returnResult)

function add(a,b){
    console.log(a + b)
    display2.textContent = a + b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(op,a,b){
    return operate(a,b);
}


