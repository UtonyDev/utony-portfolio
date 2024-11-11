import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp} from 'react-icons/fa';
import * as math from 'mathjs'
import './utonycalc.css'

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');

  const Buttons = [  
  { label: 'π', value: 'π' },
  { label: '<', value: '<' },
  { label: '>', value: '>' },
  { label: <FaChevronDown />, value: 'expand' },
  { label: <FaChevronUp />, value: 'expand' },

  { label: 'AC', value: 'AC' },
  { label: 'H', value: 'history' },
  { label: '%', value: '%' },
  { label: '÷', value: '÷' },

  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '^', value: '^' },
  { label: '^2', value: '^2' },

  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '×', value: '×' },
  

  { label: '!', value: '!' },
  { label: '√', value: '√' },
  { label: '∛', value: '∛' },
  { label: '10^x', value: '10^' },

  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '+', value: '+' },
  

  { label: 'e', value: 'e' },
  { label: 'ln', value: 'ln(' },
  { label: 'log', value: 'log(' },
  { label: 'INV', value: 'invert' },

  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '-', value: '-' },

  { label: '.', value: '.' },
  { label: '0', value: '0' },
  { label: 'C', value: 'clear' },
  { label: '=', value: '=' },

  { label: 'Sin', value: 'sin(' },
  { label: 'Cos', value: 'cos(' },
  { label: 'Tan', value: 'tan(' },
  { label: 'DEG', value: 'DEG' },

  { label: 'Sin⁻¹', value: 'sin⁻¹(' },
  { label: 'Cos⁻¹', value: 'cos⁻¹(' },
  { label: 'Tan⁻¹', value: 'tan⁻¹(' },  
  { label: 'RAD', value: 'RAD' },


  { label: 'Csc', value: 'csc(' },
  { label: 'Sec', value: 'sec(' },
  { label: 'Cot', value: 'cot(' },
  { label: 'hyp', value: 'Hyp' },

  { label: 'ans', value: 'ans' },

  { label: 'Sinh', value: 'sinh(' },
  { label: 'Cosh', value: 'cosh(' },
  { label: 'Tanh', value: 'tanh(' },

  { label: 'Csc⁻¹', value: 'csc⁻¹(' },
  { label: 'Sec⁻¹', value: 'sec⁻¹(' },
  { label: 'Cot⁻¹', value: 'cot⁻¹(' },

  { label: 'Csch', value: 'csch(' },
  { label: 'Sech', value: 'sech(' },
  { label: 'Coth', value: 'coth(' },
];   

  const err = "math error";

  window.addEventListener("DOMContentLoaded", function() {
    setTimeout( () => {
        const open = this.document.querySelectorAll(".hid");
        
        for (let i = 0; i < open.length; i++) {
            open[i].classList.replace("hid", "rev");
        }
    }, 0o0);
    
})


  const onButtonClick = (e, val) => {
    e.preventDefault();
    
    if (val === '=') {
      try {
        if (inputVal.includes('sin(') 
          || inputVal.includes('cos(') 
          || inputVal.includes('tan(')
        ) {
            const DegButn = document.querySelector('.butnDEG');
             //for evaluation when argument is in degree   
            const DegEvaluate = () => {
              function getsArgument(expression) {
                const regex = /\((\d*\.?\d+)\)/ ; 
                const regexE = /\(\be\b\)/;
                const match1 = expression.match(regex);
                const match2 = expression.match(regexE);
                console.log(match1);
  
                if (match1) {
                  const degrees = parseFloat(match1[match1.length - 1]);
                  const radians = degrees * Math.PI / 180;
                  const replacedExpression = expression.replace(regex, `(${radians})`);
                  return replacedExpression;
                } else if (match2) {
                  const radianE = Math.E * Math.PI / 180;
                  console.log(radianE);
                  const eulerExp = expression.replace(regexE, `(${radianE})`);
                  return eulerExp;
                }
              }
  
              const closedInputVal = inputVal + ")";
              const radExpression = getsArgument(closedInputVal);
              const mathExp = 'Math.' + radExpression;
                  console.log(mathExp)
              const solvedResult = eval(mathExp)
              const approxResult = solvedResult.toFixed(4);
              setInputVal(approxResult);
            }

            //for evaluation when argument is in radians
            const RadEvaluate = () => {
              function getsArgument(expression) {
                const regex = /\((\d*\.?\d+)\)/ ; 
                const regexE = /\(\be\b\)/;
                const match1 = expression.match(regex);
                const match2 = expression.match(regexE);
                console.log(match1);
  
                if (match1) {
                  const degrees = parseFloat(match1[match1.length - 1]);
                  const radians = degrees;
                  const replacedExpression = expression.replace(regex, `(${radians})`);
                  return replacedExpression;
                } else if (match2) {
                  const radianE = Math.E;
                  console.log(radianE);
                  const eulerExp = expression.replace(regexE, `(${radianE})`);
                  return eulerExp;
                }
              }

              const closedInputVal = inputVal + ")";
              const radExpression = getsArgument(closedInputVal);
              const mathExp = 'Math.' + radExpression;
                    console.log(mathExp)
                const solvedResult = eval(mathExp)
                const approxResult = solvedResult.toFixed(4);
                setInputVal(approxResult);
            } 

            
            if (DegButn.classList.contains('DegHide')) {
              RadEvaluate();
              console.log(true)
            } else {
              DegEvaluate();
              console.log(false)
            }

        } else if (inputVal.includes('sin⁻¹(')
          || inputVal.includes('cos⁻¹(')
          || inputVal.includes('tan⁻¹(')) {
            const DegButn = document.querySelector('.butnDEG');

          const degArcTrigEval = () => {
            function evaluateExpression(expression) {
              const modifiedExpression = expression
                .replace(/sin⁻¹\((\d*\.?\d+)/g, 'Math.asin($1)')
                .replace(/cos⁻¹\((\d*\.?\d+)/g, 'Math.acos($1)')
                .replace(/tan⁻¹\((\d*\.?\d+)/g, 'Math.atan($1)')
  
              return modifiedExpression;
            };

            const radExp =  evaluateExpression(inputVal);
            const evalTrig = eval(radExp) * (180 / Math.PI);
            const approxEval = evalTrig.toFixed(4);
            setInputVal(approxEval);
          }

          const radArcTrigEval = () => {
            function evaluateExpression(expression) {
              const modifiedExpression = expression
                .replace(/sin⁻¹\((\d*\.?\d+)/g, 'Math.asin($1)')
                .replace(/cos⁻¹\((\d*\.?\d+)/g, 'Math.acos($1)')
                .replace(/tan⁻¹\((\d*\.?\d+)/g, 'Math.atan($1)')
  
              return modifiedExpression;
            };
      
            const radExp =  evaluateExpression(inputVal);
            const evalTrig = eval(radExp);
            const approxEval = evalTrig.toFixed(4);
            setInputVal(approxEval);
          }

          if (DegButn.classList.contains('DegHide')) {
            radArcTrigEval();
            console.log(true)
          } else {
            degArcTrigEval();
            console.log(false)
          }


        } else if (inputVal.includes('√') || inputVal.includes('∛') ) {
          function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/√(\d*\.?\d+)/g, 'Math.sqrt($1)')
              .replace(/∛(\d*\.?\d+)/g, 'Math.cbrt($1)')
              .replace(/√\be\b/g, 'Math.sqrt(Math.E)')
              .replace(/∛\be\b/g, 'Math.cbrt(Math.E)');

            return modifiedExpression;
          };
    
          const rootVal =  evaluateExpression(inputVal);
          const rootedVal = eval(rootVal);
          setInputVal(rootedVal);
          
        } else if (inputVal.includes('ln(')) {
          function evaluateExpress(express) {
            const modifiedExpress = express
            .replace(/ln\((\d*\.?\d+)/g, 'Math.log($1)')
            .replace(/ln\(\be\b/g, 'Math.log(Math.E)');
            
            return modifiedExpress;
          }
          
          const baseVal = evaluateExpress(inputVal);
          const basedVal = eval(baseVal);
          setInputVal(basedVal);

        } else if ( inputVal.includes('log(')) {
          function evaluateExpress(express) {
            const modifiedExpress = express
            .replace(/log\((\d*\.?\d+)/g, 'Math.log10($1)')
            .replace(/log\(\be\b/g, 'Math.log10(Math.E)');
            
            console.log("Transformed Expression:", modifiedExpress); // Debug output
            return modifiedExpress;
          }
          
          const baseVal = evaluateExpress(inputVal);
          const basedVal = eval(baseVal);
          console.log("Evaluated Expression:", baseVal);
          setInputVal(basedVal);
        } else if (
          inputVal.includes('csc(') ||
          inputVal.includes('sec(') ||
          inputVal.includes('cot(')
        ) {
          const DegButn = document.querySelector('.butnDEG');

             //for evaluation when argument is in degree
             const DegInvEvaluate = () => { 
              function getsArgument(expression) {
                const regex = /\((\d*\.?\d+)\)/ ; 
                const regexE = /\(\be\b\)/;
                const match1 = expression.match(regex);
                const match2 = expression.match(regexE);
  
                if (match1) {
                  const degrees = parseFloat(match1[match1.length - 1]);
                  const radians = degrees * Math.PI / 180;
                  const replacedExpression = expression.replace(regex, `(${radians})`);

                  const modifiedExpression = replacedExpression
                .replace(/csc\((\d*\.?\d+)/g, 'Math.sin($1')
                .replace(/sec\((\d*\.?\d+)/g, 'Math.cos($1')
                .replace(/cot\((\d*\.?\d+)/g, 'Math.tan($1')
  
                return modifiedExpression;
          
                } else if (match2) {
                  const radianE = Math.E * Math.PI / 180;
                  console.log(radianE);
                  const eulerExp = expression.replace(regexE, `(${radianE})`);
                  return eulerExp;
                }
              }
              const closedInputVal = inputVal + ")";
              const radExpression = getsArgument(closedInputVal);
              const mathExp = radExpression;
                  console.log(mathExp)
              const solvedResult = eval(mathExp)
              const invrtResult = 1 / solvedResult
              const approxResult = invrtResult.toFixed(4);
              setInputVal(approxResult);
            }
 
            const RadInvEvaluate = () => { 
              function getsArgument(expression) {
                const regex = /\((\d*\.?\d+)\)/ ; 
                const regexE = /\(\be\b\)/;
                const match1 = expression.match(regex);
                const match2 = expression.match(regexE);
  
                if (match1) {
                  const degrees = parseFloat(match1[match1.length - 1]);
                  const radians = degrees ;
                  const replacedExpression = expression.replace(regex, `(${radians})`);

                  const modifiedExpression = replacedExpression
                .replace(/csc\((\d*\.?\d+)/g, 'Math.sin($1')
                .replace(/sec\((\d*\.?\d+)/g, 'Math.cos($1')
                .replace(/cot\((\d*\.?\d+)/g, 'Math.tan($1')
  
                return modifiedExpression;
          
                } else if (match2) {
                  const radianE = Math.E * Math.PI / 180;
                  console.log(radianE);
                  const eulerExp = expression.replace(regexE, `(${radianE})`);
                  return eulerExp;
                }
              }
              const closedInputVal = inputVal + ")";
              const radExpression = getsArgument(closedInputVal);
              const mathExp = radExpression;
                  console.log(mathExp)
              const solvedResult = eval(mathExp)
              const invrtResult = 1 / solvedResult
              const approxResult = invrtResult.toFixed(4);
              setInputVal(approxResult);
            }

            if (DegButn.classList.contains('DegHide')) {
              RadInvEvaluate();
              console.log(true)
            } else {
              DegInvEvaluate();
              console.log(false)
            }
          } else if (inputVal.includes('π') 
            || inputVal.includes('×')
            || inputVal.includes('÷')
          ) {

            function evaluateExpression(expression) {
              const modifiedExpression = expression
                .replace(/π/g, 'Math.PI')
                .replace(/×/g, '*')
                .replace(/÷/g, '/');
               
              return modifiedExpression;
            };

            const pieExp = evaluateExpression(inputVal);
            const pie = eval(pieExp);
            setInputVal(pie);  
          } else if (inputVal.includes('sinh(')
            || inputVal.includes('cosh(') 
            || inputVal.includes('tanh(')
        )  {
          //for evaluation when argument is in degree and radian since its hyperbolic
           function getsArgument(expression) {
             const regex = /\((\d*\.?\d+)\)/ ; 
             const regexE = /\(\be\b\)/;
             const match1 = expression.match(regex);
             const match2 = expression.match(regexE);
             console.log(match1);

             if (match1) {
               const degrees = parseFloat(match1[match1.length - 1]);
               const radians = degrees;
               const replacedExpression = expression.replace(regex, `(${radians})`);
               return replacedExpression;
             } else if (match2) {
               const radianE = Math.E;
               console.log(radianE);
               const eulerExp = expression.replace(regexE, `(${radianE})`);
               return eulerExp;
             }
           }

           const closedInputVal = inputVal + ")";
           const radExpression = getsArgument(closedInputVal);
           const mathExp = 'Math.' + radExpression;
               console.log(mathExp)
           const solvedResult = eval(mathExp)
           const approxResult = solvedResult.toFixed(4);
           setInputVal(approxResult);

          } else if (inputVal.includes('csc⁻¹(')
            || inputVal.includes('sec⁻¹(')
            || inputVal.includes('cot⁻¹(')) {

          const DegButn = document.querySelector('.butnDEG');
          //for evaluation when argument is in degree   
         const DegEvaluate = () => {
           function getsArgument(expression) {
             const regex = /\((\d*\.?\d+)\)/ ; 
             const regexE = /\(\be\b\)/;
             const match1 = expression.match(regex);
             const match2 = expression.match(regexE);

             if (match1) {
               const degrees = parseFloat(match1[match1.length - 1]);
               const arg = degrees;
               const invArg = 1 / arg;
               console.log(arg);
               console.log(invArg);
               const replacedExpression = expression.replace(regex, `(${invArg})`);
               const modifiedExpression = replacedExpression
               .replace(/csc⁻¹\((\d*\.?\d+)/g, 'Math.asin($1')
               .replace(/sec⁻¹\((\d*\.?\d+)/g, 'Math.acos($1')
               .replace(/cot⁻¹\((\d*\.?\d+)/g, 'Math.atan($1')
               return modifiedExpression;             
              } 
               else if (match2) {
               const argE = Math.E;
               const invArgE = 1 / argE;
               console.log(invArgE);
               const eulerExp = expression.replace(regexE, `(${invRadianE})`);
               return eulerExp;
             }
           }

           const closedInputVal = inputVal + ")";
           const Expression = getsArgument(closedInputVal);
           console.log(Expression)
           const solvedExp = eval(Expression);
           console.log(solvedExp)
           const solvedinDeg = solvedExp * (180 / Math.PI);
           const approxinDeg = solvedinDeg.toFixed(4);
          setInputVal(approxinDeg);       
         }
         DegEvaluate();
         //for evaluation when argument is in radians

            }  
            else if (inputVal.includes('csch(')
              || inputVal.includes('sech(') 
              || inputVal.includes('coth(')
          )  {
            function getsArgument(expression) {
              const regex = /\((\d*\.?\d+)\)/ ; 
              const regexE = /\(\be\b\)/;
              const match1 = expression.match(regex);
              const match2 = expression.match(regexE);
              console.log(match1);
 
              if (match1) {
                const degrees = parseFloat(match1[match1.length - 1]);
                const radians = degrees;
                const replacedExpression = expression.replace(regex, `(${radians})`);

                const modifiedExpression = replacedExpression
                .replace(/csch\((\d*\.?\d+)/g, 'Math.sinh($1')
                .replace(/sech\((\d*\.?\d+)/g, 'Math.cosh($1')
                .replace(/coth\((\d*\.?\d+)/g, 'Math.tanh($1')
  
                return modifiedExpression;              
              } else if (match2) {
                const radianE = Math.E;
                console.log(radianE);
                const eulerExp = expression.replace(regexE, `(${radianE})`);
                return eulerExp;
              }
            }
 
            const closedInputVal = inputVal + ")";
            const radExpression = getsArgument(closedInputVal);
            const mathExp = radExpression;
            const EvaluatedExp = eval(mathExp);
            console.log(EvaluatedExp);
            const invResult = 1 / EvaluatedExp;
            console.log(invResult);
            setInputVal(invResult);

          }
        else {
            const solvedResult = math.evaluate(inputVal);
            setInputVal(solvedResult);
          }
      } catch {
        setInputVal(err);
      }
    } else if (val === 'clear') {
      setInputVal(inputVal.slice(0, -1));
    } else if (val === 'AC') {
      setInputVal('');
    } else if (val === "expand") {

      if (window.innerWidth <= 768) {
        
        const butn =  document.querySelectorAll("#butns");
        const showAllButn = document.querySelector("#calccon")
        const chevUp = document.querySelector('.chevUp');

        if (showAllButn.classList.contains('cont')) {
          chevUp.classList.add('overlayChev');
        } else {
          chevUp.classList.remove('overlayChev');
        }

        butn.forEach((button) => {
          if (button.classList.contains('butnHid')) {
            button.classList.replace("butnHid", "butnShow");
          } else {
            button.classList.replace("butnShow", "butnHid");
          }
        });

        if (showAllButn.classList.contains("cont")) {
          showAllButn.classList.replace("cont", "fullCont");
        } else {
          showAllButn.classList.replace("fullCont", "cont");
        }
      } else if (window.innerWidth >= 768) {
        showAllButn.classList.replace("fullCont", "cont");
      }

    } 
    else if (val === 'DEG') {
      const RadButn = document.querySelector('.butnRAD');
      const DegButn = document.querySelector('.butnDEG');
      DegButn.classList.toggle('DegHide');     
      RadButn.classList.toggle('RadShow');
    }
     else if (val === 'RAD') {
      const RadButn = document.querySelector('.butnRAD');
      const DegButn = document.querySelector('.butnDEG');
      DegButn.classList.toggle('DegHide');     
      RadButn.classList.toggle('RadShow');
    } 
    else if (val === 'invert') {
      const hiddenButns = document.querySelectorAll('.invButns');
      const TrigButns = document.querySelectorAll('.trigButns');
      const InvButn = document.querySelector('.butnInvert');
      InvButn.classList.toggle('invClr');

      for (let i = 0; i < hiddenButns.length; i++ ) {
        hiddenButns[i].classList.toggle('invsButnShow');
        TrigButns[i].classList.toggle('trigButnsHide');
      }
    } 
    else if (val === 'Hyp') {
      const hiddenButns = document.querySelectorAll('.invHyp');
      const HypButns = document.querySelector('.butnHyp');
      HypButns.classList.toggle('hypHighlgt');

      for (let i = 0; i < hiddenButns.length; i++ ) {
        hiddenButns[i].classList.toggle('hypShow');
      }
    } 
    else if (val === 'ans') {

    }
    else {
      setInputVal(inputVal + val);
    }
    clrField();
  };

  const clrField = () => {
    if (onButtonClick && inputVal === "math error") {
      setInputVal('');
    }
  };

  return (
    <>
    <div className="calcparent" id='target'>
    <Link to="/UHomepage" className='back'>
    <i className="fa-solid fa-chevron-left"></i> Home </Link>
    <form> 
      <label> 
      <div className="calccont">

        <div className='cont' id='calccon'> 
             <input type="text" name='calc' value={inputVal} 
             className='inputField' 
             
             />

          {Buttons.map((buttons, index) => (
  <button
    key = {index} 
    id ="butns"
    className={` 
      ${
        index === 0 || index === 1
        || index === 2 || index === 3 || index === 4 
        ? 'topKeys' : 'butns'
      }

      ${index === 0 ? 'butnPie' : ''}
      ${index === 1 ? 'shiftLeft' : ''}
      ${index === 2 ? 'shiftRight' : ''}
      ${index === 3 ? 'chevDown' : ''}
      ${index === 4 ? 'chevUp': '' }

      ${index === 5 ? 'butnAC': '' }
      ${index === 6 ? 'butnHist': '' }
      ${index === 7 ? 'butnPercent': '' }
      ${index === 8 ? 'butnDivide' : ''}

      ${index === 9 ? 'bracOpen' : ''}
      ${index === 10 ? 'bracClose' : ''}
      ${index === 11 ? 'powerButn' : ''}
      ${index === 12 ? 'sqrButn': '' }

      ${index === 13 ? 'butn1': '' }
      ${index === 14 ? 'butn2': '' }
      ${index === 15 ? 'butn3': '' }
      ${index === 16 ? 'butnTimes' : ''}

      ${index === 17 ? 'butnFact': '' }
      ${index === 18 ? 'butnSqrt': '' }
      ${index === 19 ? 'butnCbrt': '' }
      ${index === 20 ? 'butnExp': '' }

      ${index === 21 ? 'butn4': ''}
      ${index === 22 ? 'butn5': ''}
      ${index === 23 ? 'butn6': ''}
      ${index === 24 ? 'butnPlus': ''}
        
      ${index === 25 ? 'butnEuler' : ''}
      ${index === 26 ? 'butnNatLog' : ''}
      ${index === 27 ? 'butnLog' : ''}
      ${index === 28 ? 'butnInvert' : ''}

      ${index === 29 ? 'butn7' : ''}
      ${index === 30 ? 'butn8' : ''}
      ${index === 31 ? 'butn9' : ''}
      ${index === 32 ? 'butnMinus' : ''} 

      ${index === 33 ? 'butnPoint' : ''}
      ${index === 34 ? 'butnZero' : ''}
      ${index === 35 ? 'butnClear' : ''}
      ${index === 36 ? 'butnEqual' : ''}

      ${index === 37 ? "butnSin trigButns" : ''}
      ${index === 38 ? "butnCos trigButns" : ''}
      ${index === 39 ? "butnTan trigButns" : ''}
      ${index === 40 ? "butnDEG " : ''}

      ${index === 41 ? "butnArcSin invButns" : ''}
      ${index === 42 ? "butnArcCos invButns" : ''}
      ${index === 43 ? "butnArcTan invButns" : ''}
      ${index === 44 ? "butnRAD RadHide" : ''}

      ${index === 45 ? "butnCsc trigButns" : ''}
      ${index === 46 ? "butnSec trigButns" : ''}
      ${index === 47 ? "butnCot trigButns" : ''}
      ${index === 48 ? "butnHyp " : ''}

      ${index === 49 ? "butnAns butnHid butnc" : ''}

      ${index === 50 ? "butnSinh butnHid invHyp hypHide" : ''}
      ${index === 51 ? "butnCosh butnHid invHyp hypHide" : ''}
      ${index === 52 ? "butnTanh butnHid invHyp hypHide" : ''}

      ${index === 53 ? "butnArcCsc butnHid invButns" : ''}
      ${index === 54 ? "butnArcSec butnHid invButns" : ''}
      ${index === 55 ? "butnArcCot butnHid invButns" : ''}

      ${index === 56 ? "butnCsch butnHid invHyp hypHide" : ''}
      ${index === 57 ? "butnSech butnHid invHyp hypHide" : ''}
      ${index === 58 ? "butnCoth butnHid invHyp hypHide" : ''}


      ${index === 6 || index === 7
        || index === 8 || index === 16
        || index === 24 || index === 32
        ? "butnc" : ""}

      ${index === 9 || index === 10 || index === 11 || index === 12 
        || index === 17 || index === 18 || index === 19 || index === 20
        || index === 25 || index === 26 || index === 27 || index === 28
        || index === 37 || index === 38 || index === 39 || index === 40
        || index === 41 || index === 42 || index === 43 || index === 44
        || index === 45 || index === 46 || index === 47 || index === 48
        || index === 49 || index === 50

        ? 'butnHid': ''}

    `}
    onClick={(e) => onButtonClick(e, buttons.value)}
  >
    {buttons.label}
  </button>
))}        </div>
</div>
      </label>
    </form>
    </div>    
    </>
  );
}

export default UTonyCalc

