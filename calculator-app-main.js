'use strict'; 

let numOperandsArr=[];
//from calculator.net , my observation.

//IF FIRST AN OPERAND IS ENTERED:
// only one minus is allowed, so only -8 , not --8
//if either a plus, multiply, or divide is entered first , automatically apply the zero after : 0 + , 0 x, 0 / 
//if a minus is first entered, apply after whichever number first is entered: -0 , -4 etc

//WITH NUMBER FIRST, and multiple operands:
//a number then + - and another number
//a number then -- and then another number.




const checkOperands=()=>{
    //This function is to check if operands are correct as at most only -- , and +-  allowed, if multiple operands follow each other. 
    //get the last value entered, check to see if it's an operand.
    const lastChar= numOperandsArr.slice(numOperandsArr.length-1,1);
    //use hex codes for operands: / + - x ,  ex: &#x2215; (hex for / is 2215 in the operands array)
    const allOperands=['2b','2212','2215','2716'];
    if(allOperands.includes(lastChar)){
        //lastChar is an operand
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
    }

    /*tempArr.forEach((numOrOperand)=>{
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
    });*/
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
           //check if two operands one after the other have been added
           checkOperands();

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

