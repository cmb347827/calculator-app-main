'use strict'; 

let numOperandsArr=[];
//use hex codes for operands: / + - x ,  ex: &#x2215; (hex for / is 2215 in the allOperands array)
const allOperands=['2b','2212','2215','2716'];
let oneMinus= true;


const testOperands=(operand)=>{
    const hex =operand.charCodeAt(0).toString(16);
    return allOperands.includes(hex);
};
const testPreviousChar=()=>{
    //WITH a NUMBER FIRST, and multiple operands:
    // +- or -- are allowed in multiple operands
    // x- and /- are allowed as well.
    
    //the number/operand entered is not the first,minimum 2 operators/operands have been added, check the last two numOperandsArr values.
    const charArr = numOperandsArr.slice(numOperandsArr.length-2);
    const bothOperands= charArr.every(testOperands);
    if(bothOperands){
        const secondOperand = numOperandsArr.slice(numOperandsArr.length-1,1);
        switch(secondOperand){
            case '2212':
                //second operand is -,the first operand can be anything. Do nothing, but only do nothing if oneMinus= true;
                //if oneMinus=false, it means the user is trying to enter two minuses before the first operator: -- number.
                //if oneMinus=== false, splice the second minus.

                break;
            case '2b':
            case '2215':
            case '2716':
                //second operand is non-minus , so ignore the second operand(delete it)
                numOperandsArr = numOperandsArr.splice(numOperandsArr.length-1,1);
                break;
        }
    }
}


const firstIsOperand=(firstChar)=>{
    //from calculator.net , my observations.
   //IF FIRST AN OPERAND IS ENTERED:
   //if either a plus, multiply, or divide is entered first , automatically apply the zero after : 0 + , 0 x, 0 / 
   //if a minus is first entered, apply after whichever number first is entered: -0 , -4 etc, can't be --4 
   switch(firstChar){
        case '2b':
            //firstChar is +
            //return 0+

            break;
        case '2212':
            //firstChar is -
           //do nothing , stays just - 
            oneMinus=false;
            break;
        case '2215':
            //firstChar is divide
            //return 0/

            break;
        case '2716':
            //firstChar is multiply
            //return 0 x 

            break;
    }
};


const checkEntered=()=>{
    //This function is to check if operands are correct as at most only -- , and +-  allowed, if multiple operands follow each other.
    // or it checks to see if first a number is entered. 
    
    

    if(numOperandsArr.length>1){
        testPreviousChar();
    }else if(numOperandsArr.length===1){
         //get the last value entered
         const firstChar= numOperandsArr.slice(numOperandsArr.length-1,1);
         firstIsOperand(firstChar);
         
    }
 
    
};

const calcAnswer=()=>{
    console.log('in calc');
};
const deleteNum=()=>{
   console.log('in dele');
};
const reset=()=>{
   console.log('in reset');
};

const buttonListeners=()=>{
    document.querySelectorAll('.calc-button').forEach((btn)=>{
       btn.addEventListener('click',()=>{
           //add pressed button value to numOperandsArr[]
           numOperandsArr.push(btn.textContent);
           //check to see if an operand was entered first or a number
           checkEntered();

           if(btn.textContent==='=' || btn.textContent==='reset' || btn.textContent==='del'){
                 const value= btn.textContent;

                 switch(value){
                      case '=':
                           calcAnswer();
                           break;
                      case 'del':
                           deleteNum();
                           break;
                      case 'reset':
                           reset();
                           break;
                 }
           }
       });
    });
};



addEventListener("load", (event) => {
     buttonListeners();

});

