'use strict'; 

let numOperandsArr=[]; 
let isMinus=false;
//use hex codes for operands: / + - x ,  ex: &#x2215; (hex for / is 2215 in the allOperands array)
const allOperands=['2b','2212','2215','2716'];
const calculations=(a,b,operand)=>{
    switch(operand){
        case '+': 
           return a+b;
           break;
        case '-':
            return a-b;
            break;
        case 'x':
            return a*b;
            break;
        case '/':
            return a/b;
            break;
    }
};
const output = document.querySelector('#output');


const testOperands=(operand)=>{
    const hex =convertHexOperand(operand);
    return allOperands.includes(hex);      //
};
const convertHexOperand=(operand)=>{
   return operand.charCodeAt(0).toString(16);
};

const checkMinus=()=>{
    const lastChar = convertHexOperand(numOperandsArr[numOperandsArr.length-1]);

    if(numOperandsArr.length===1){
       switch(lastChar){
           //case if operand entered first. check if operand is minus
           case '2212':
              //if it is minus, set isMinus=true (so can't be --number as only entry)
              isMinus=true;
              output.textContent =numOperandsArr.join('');
              break;
            case '2b':
            case '2215':
            case '2716':
              //case all other operand entered first, return 0 with operand (unshift 0)
              numOperandsArr.unshift('0');
              output.textContent=numOperandsArr.join('');
              break;
            default:
              output.textContent=numOperandsArr.join('');
              break;
       }
    } else if(numOperandsArr.length===2){
            //either for instance :  number- , -number
            
            
            const charArr = numOperandsArr.slice(numOperandsArr.length-2);
            const bothOperands= charArr.every(testOperands);
        
            const lastChar = convertHexOperand(numOperandsArr[numOperandsArr.length-1]);
            if(bothOperands){
                //due to !isMinus , first operand is not a minus.
                //if bothOperands, test second operand. if minus, leave operands as is , return 0 with operands
                if(lastChar==='2212' && !isMinus){
                    // +- are allowed in multiple operands (with a default zero or entered number)
                    // x- and /- are allowed as well
                    numOperandsArr.unshift('0');
                    output.textContent=numOperandsArr.join('');
                }else{
                     //++ , -+ , etc not allowed , and -- not allowed if no number entered yet.
                     //splice the second operand, so ++ is just +
                    numOperandsArr=numOperandsArr.splice(numOperandsArr.length-1,1);
                }
            }
            else {
                output.textContent=numOperandsArr.join('');
            }
            

    } else if(numOperandsArr.length ===3){
        isMinus=false;
        //could be -33 , 3-3, 3-- etc

    } else if(numOperandsArr.length>3){

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
           //isMinus=false;
           //add pressed button value to numOperandsArr[]
           numOperandsArr.push(btn.textContent);
           //check to see if an operand was entered first or a number
           checkMinus();
           output.textContent=numOperandsArr.join('');
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

