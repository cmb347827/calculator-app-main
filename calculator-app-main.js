'use strict'; 

let numOperandsArr=[];


const checkOperands=()=>{
    const tempArr= numOperandsArr.slice(numOperandsArr.length-2);
    //use ascii codes with includes for operands: / + - x
    const operands=['&#x2b','&#x2212','&#8725','&#x2716'];
    tempArr.forEach((operand)=>{
        console.log('in check',tempArr,' ',operand);
       if(operands.includes(operand)){
          console.log('yes');
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

