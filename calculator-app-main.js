'use strict'; 

let numOperandsArr=[];
//use hex codes for operands: / + - x ,  ex: &#x2215; (hex for / is 2215 in the allOperands array)
const allOperands=['2b','2212','2215','2716'];


const testOperands=(operand)=>{
    const hex =operand.charCodeAt(0).toString(16);
    return allOperands.includes(hex);
};
const testPreviousChar=()=>{
    //WITH NUMBER FIRST, and multiple operands:
    //a number then + - and another number
    //a number then -- and then another number.
    //the number or operand entered is not the first , check the last two numOperandsArr values.
    const charArr = numOperandsArr.slice(numOperandsArr.length-2);
    const bothOperands= charArr.every(testOperands);
    if(bothOperands){
        const firstOperand = numOperandsArr.slice(numOperandsArr.length-2,1);
        switch(firstOperand){
            case '2b':
                //first operand is +, for the second operand only a - is allowed
                
                break;
            case '2212':
                //first operand is - , for the second operand only a - is allowed
    
                break;
            case '2215':
                //first operand is divide
            case '2716':
                //first operand is multiply
                //first operand is either a / or x , remove second operand.
                break;
        }
    }
    
           
           
        
    
}
//
//if number first: 
//if operand first: zie onder

const firstIsOperand=(firstChar)=>{
    //from calculator.net , my observations.
   //IF FIRST AN OPERAND IS ENTERED:
   // only one minus is allowed, so only -8 , not --8
   //if either a plus, multiply, or divide is entered first , automatically apply the zero after : 0 + , 0 x, 0 / 
   //if a minus is first entered, apply after whichever number first is entered: -0 , -4 etc
   switch(firstChar){
        case '2b':
            //firstChar is +
            //disable x, +, and /
            break;
        case '2212':
            //firstChar is -

            break;
        case '2215':
            //firstChar is divide
            break;
        case '2716':
            //firstChar is multiply

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

