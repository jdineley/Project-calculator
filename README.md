# Project-calculator
Calculator web app


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