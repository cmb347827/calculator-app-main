'use strict'; 

let numOperandsArr=[];

//WITH NUMBER FIRST, and multiple operands:
//a number then + - and another number
//a number then -- and then another number.

const firstOperand=(lastChar)=>{
    //from calculator.net , my observations.
   //IF FIRST AN OPERAND IS ENTERED:
   // only one minus is allowed, so only -8 , not --8
   //if either a plus, multiply, or divide is entered first , automatically apply the zero after : 0 + , 0 x, 0 / 
   //if a minus is first entered, apply after whichever number first is entered: -0 , -4 etc
   switch(lastChar){
        case '2b':
            //lastChar is +

            break;
        case '2212':
            //lastChar is -

            break;
        case '2215':
            //lastChar is divide
            break;
        case '2716':
            //lastChar is multiply

            break;
    }
};


const checkEntered=()=>{
    //This function is to check if operands are correct as at most only -- , and +-  allowed, if multiple operands follow each other.
    // or it checks to see if first a number is entered. 
    //get the last value entered, check to see if it's an operand.
    const lastChar= numOperandsArr.slice(numOperandsArr.length-1,1);
    //use hex codes for operands: / + - x ,  ex: &#x2215; (hex for / is 2215 in the allOperands array)
    const allOperands=['2b','2212','2215','2716'];

    //convert calculator operand to it's hexadecimal value (to ensure if it's different = + etc all are passable)
    /*const hex =lastChar.charCodeAt(0).toString(16);
    if(allOperands.includes(hex)){
        //lastChar is an operand
        //if numOperandsArr.length ===1 , then lastChar is the first operand entered.
        if(numOperandsArr.lenght===1){
            firstOperand(lastChar);
        }else if(numOperandsArr.length>1){
            //the operand entered is not the first , check to see if previous value in numOperandsArr is also an operand.
            const charArr = numOperandsArr.slice(numOperandsArr.length-2);
            charArr.forEach((numOrOperand)=>{
                 //convert calculator operand to it's hexadecimal value (to ensure if it's different = + etc all are passable)
                 const hex =numOrOperand.charCodeAt(0).toString(16);
                 //check to see if operands have been added
                if(allOperands.includes(hex)){
                   //an operand has been added , check to see if it's either
                   if(countOps >=2){
                      //tempArr contains three operands one after the other.
                      //Remove the last operand from numOperandsArr, so only the first two operands added are applied: example +- is -  etc
                      numOperandsArr.splice(numOperandsArr.length-1,1);
                      console.log('2de', numOperandsArr);
                    }
                }
            });
        }
    }*/
   if(numOperandsArr.length>1){
        const containsOperand=false;
        //the number or operand entered is not the first , check the last two numOperandsArr values.
        const charArr = numOperandsArr.slice(numOperandsArr.length-2);
        charArr.forEach((numOrOperand)=>{
            //convert calculator operand to it's hexadecimal value (to ensure if it's different = + etc all are passable)
            const hex =numOrOperand.charCodeAt(0).toString(16);
            //check to see if operands have been added
            if(allOperands.includes(hex)){
              //an operand has been added , will need to check the next value in charArr
               containsOperand=true;
            }
        });
   }else if(numOperandsArr.length===1){

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

