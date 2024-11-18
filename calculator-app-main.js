'use strict'; 

let numOperandsArr=[];


const checkOperands=()=>{
    console.log('1st ',numOperandsArr);
    let firstOp = false;
    const tempArr= numOperandsArr.slice(numOperandsArr.length-2);
    //use hex codes for operands: / + - x ,  ex: &#x2215; (hex for / is 2215 in the operands array)
    const allOperands=['2b','2212','2215','2716'];
    tempArr.forEach((numOrOperand)=>{
        //convert calculator operand to it's hexadecimal value (to ensure if it's different = + etc all are passable)
        const hex =numOrOperand.charCodeAt(0).toString(16);
        if(firstOp){
            //tempArr contains two operands one after the other.
            //Remove the pre-last operand from numOperandsArr, so only the last operand added is applied.
            numOperandsArr.splice(numOperandsArr.length-2,1);
            console.log('2de', numOperandsArr);
        }
        if(allOperands.includes(hex)){
            //one is an operand set firstOp to true
             firstOp=true;
        }
    });
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

