'use strict'; 

let outputArr=[]; 
let isMinus=false; //let twoOperands=true;
//use hex codes for operands: / + - x .   ex: &#x2215; (hex for / is 2215 in the allOperands array)
const allOperands=['2b','2d','2f','2a','2e'];
let theme = JSON.parse(localStorage.getItem("theme12345abcdef")) || '1';
const output = document.querySelector('.output');



//next three functions together convert and test the operands
const testOperands=(operand)=>{
    if(operand){
        const hex =convertHexOperand(operand);
        return allOperands.includes(hex);  
    } else{
        reset();
    }
};
const convertHexOperand=(operand)=>{
   /*if(allOperands.includes(operand)){
      return operand.charCodeAt(0).toString(16);
   }*/
   if(operand){
      return operand.charCodeAt(0).toString(16);
   }else{
       reset();
   }
};

const checkMinus=()=>{
       
            if(outputArr.length===1){
                const lastChar = convertHexOperand(outputArr[outputArr.length-1]);
                
                switch(lastChar){
                //case if operand entered first. check if operand is minus
                case '2d':
                    //if it is minus, set isMinus=true so can't be --, or --number 
                    isMinus=true;
                    output.textContent =outputArr.join('');
                    break;
                    case '2b':
                    case '2f':
                    case '2a':
                    case  '2e':
                    //case all other operand entered first, return 0 with operand (unshift 0)
                    outputArr.unshift('0');
                    output.textContent=outputArr.join('');
                    break;
                    default:
                    //entered a number
                    output.textContent=outputArr.join('');
                    break;
                }
            } else if(outputArr.length===2){
                    //either for instance :  number- , -number, -+, +- etc
                    const charArr = outputArr.slice(outputArr.length-2);
                    const bothOperands= charArr.every(testOperands);
                    const lastChar = convertHexOperand(outputArr[outputArr.length-1]);

                    if(bothOperands){ //++,*/, +- etc
                        //due to !isMinus , first operand is not a minus.
                        //bothOperands true, test second operand. if minus, leave operands as is , return 0 with operands
                        if(lastChar==='2d' && !isMinus){
                            // +- are allowed in multiple operands (with a default zero or entered number)
                            // x- and /- are allowed as well
                            outputArr.unshift('0');
                            output.textContent=outputArr.join('');
                        }else{
                            //++ , /*, etc not allowed 
                            //splice the second operand, so ++ is just +, and /* is just /                 
                            outputArr.splice(outputArr.length-1,1);
                        }
                    }
                    else { //number- , -number
                        output.textContent=outputArr.join('');
                    }

            } else if(outputArr.length >=3){
                // can't do 3+-----4 so,can be -3+, -33, 3+-, 3.. etc , check the last three values.
                const charArr = outputArr.slice(outputArr.length-3);
                const allOperand= charArr.every(testOperands);
                if(allOperand){
                    //is ex: -+/ ,+--, remove last operand
                    outputArr.splice(outputArr.length-1,1);
                }
                //could be -33 , 3-3, 3-- , 3-+, 3+/ etc
                isMinus=false;
                
                if(convertHexOperand(outputArr[outputArr.length-1])!=='2d'){
                    //last value is not a minus.
                    //check for 3+/, 3x+,3-+,3-/,3-* etc then remove second operand
                    //first see if last two values are operands
                    const charArr = outputArr.slice(outputArr.length-2);
                    const bothOperands= charArr.every(testOperands);
                    if(bothOperands){
                       outputArr.splice(outputArr.length-1,1);
                    }
                }else if(convertHexOperand(outputArr[outputArr.length-1])==='2d'){
                    //of these 33-,3--, 3+-,3/-,3*- always good. ignore these case, will be default
                    output.textContent=outputArr.join('');
                } 
            } else {
                output.textContent=outputArr.join('');
            }
};





//actual calculations after first calling removeZero , and then calcAnswer from buttonListerns()
function parse(str) {
    if(str){
        return Function(`'use strict'; return (${str})`)();
    }
}
const removeLeadingZeros=(item)=>{
    //remove leading zeros.
    // for instance 20/001 becomes 20/1 
    return parseInt(item,10);
}
const removeZero=()=>{
    outputArr= outputArr.join('');
    //remove zeros from start if there are any ,ocatal literal bug fix: 03*3 , 08/2 , 000004/3 , 03/0 (becomes 3/0) etc 
    //0002000 00450 becomes  2000 and 450
    //ignores .04 .009 .0004  8008 9000 etc.
    const zeroNumbers=/\b(?<!\.)(0+\d+)\b/g;
    outputArr = outputArr.replaceAll(zeroNumbers,removeLeadingZeros);
    
    //takes care of the divide by 0 bug : 03/0  3/0  0/0
    const divideZeroRegex=/([-+\/x]*\d*(0(?!.)))/g;
    const affirmDivideZero= outputArr.match(divideZeroRegex);
    if(affirmDivideZero){
        //or could have simply returned zero.
        outputArr= outputArr.replace('/0','/1');
    }
    outputArr=[...outputArr];
}
const calcAnswer=()=>{
    output.textContent=parse(outputArr.join(''));
    outputArr=[output.textContent];
    const testArr= [...outputArr[0]];
    if(testArr.length>1){
          //takes care of the -num answer bug: instead of just one entry in outputArr ex: -3 , it's now - and 3 , as it should be treated
          //also prevents a zero be added 
          outputArr=[...testArr];
    }
};




//delete number and reset  and fixPlusMinus functions , called in buttonListeners() below
const deleteNum=()=>{
    if(outputArr.length>1){
        outputArr.splice(outputArr.length-1,1);
        output.textContent=outputArr.join('');
    }else if(outputArr.length===1){
        output.textContent=0;
        outputArr=[0];
    }else if(outputArr.length===0){
        output.textContent=0;
    }
};
const reset=()=>{
   outputArr=[];
   output.textContent=0;
   clearLocalStorage();
};

const fixPlusMinus=()=>{
    const minusMinusRegex=/([-+\/x]*\d*--\d*[-+\/X]*\d*)+/g;
    const plusMinusRegex=/([-+\/x]*\d*(\+-)\d*[-+\/X]*\d*)+/g;
    
    outputArr= outputArr.join('');
    const affirmMinus= outputArr.match(minusMinusRegex);     
    const affirmPlusMin= outputArr.match(plusMinusRegex);

    if(affirmMinus){
        outputArr= outputArr.replace('--','+');
    }
    if(affirmPlusMin){
        outputArr= outputArr.replace('+-','-');
    }
    outputArr=[...outputArr];
}




const buttonListeners=()=>{
    //the 1,2,3,del,reset etc buttons
    document.querySelectorAll('button.calculate').forEach((btn)=>{
       btn.addEventListener('click',()=>{
           //add pressed button value to numOperandsArr[]
           
           if(btn.value!=='=' && btn.value!=='reset' && btn.value!=='del'){
              if(btn.value==='x'){
                outputArr.push('*');
              }else if(btn.value==='2b'){
                outputArr.push('+'); 
              }else if(btn.value==='2d'){
                outputArr.push('-');
              }else if(btn.value==='2f'){
                outputArr.push('/');
              }else{
                outputArr.push(btn.value);
              }
              //check to see if an operand was entered first or a number
              checkMinus();
           }
           output.textContent=outputArr.join('');
           if(btn.value==='=' || btn.value==='reset' || btn.value==='del'){
                 const value= btn.value;
                 
                    switch(value){
                        case '=':
                            fixPlusMinus();
                            removeZero();
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
function saveToStorage(theme){
    //whenever the messages are updated , will be saved in local storage.
    localStorage.setItem('theme12345abcdef',JSON.stringify(theme));//to json string
}
function loadFromStorage(){
	theme = JSON.parse(localStorage.getItem('theme12345abcdef'));  //to js object
    document.querySelectorAll('input.theme-change').forEach((btn)=>{
        if(btn.value===theme){
            btn.checked=true;
            loadTheme(btn.value);
        }
    });
}
function clearLocalStorage(){
   localStorage.clear();
}
const loadTheme=(theme)=>{
    if(theme==='1'){
        document.body.classList =["default-color-scheme"];
    } else if(theme==='2'){
        document.body.classList =["theme2"];
    } else if(theme==='3'){
        document.body.classList =["theme3"];
    }
}

const themeListeners=()=>{
    document.querySelectorAll('input.theme-change').forEach((btn)=>{
        btn.addEventListener('click',()=>{
             saveToStorage(btn.value);
             loadTheme(btn.value);
        });
    });
}


addEventListener("load", (event) => {
     loadFromStorage();
     buttonListeners();
     themeListeners();
});

