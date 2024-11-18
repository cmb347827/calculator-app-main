'use strict'; 


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

