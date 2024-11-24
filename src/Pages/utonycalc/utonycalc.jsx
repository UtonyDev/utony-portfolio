import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaCommentsDollar} from 'react-icons/fa';
import * as math from 'mathjs'
import './utonycalc.css'

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');
  const [cursorPos, setCursorPos] = useState(0);
  const [newResult, setNewResult] = useState(inputVal);
  const [isFirstExecution, setIsFirstExecution] = useState(true);

  const Buttons = [  
  { label: 'H', value: 'history' },
  { label: '←', value: '←' },
  { label: '→', value: '→' },
  { label: <FaChevronDown />, value: 'expand' },
  { label: <FaChevronUp />, value: 'expand' },

  { label: 'AC', value: 'AC' },
  { label: 'π', value: 'π' },
  { label: '%', value: '%' },
  { label: '÷', value: '÷' },

  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '^', value: '^' },
  { label: 'x² ', value: '²' },

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

    const err = "math error";
    let preciseResult;
    let enteredExpression;
    let historyElement; 
    let butn =  document.querySelectorAll("#butns");
    let showAllButn = document.querySelector("#calccon")
    let chevUp = document.querySelector('.chevUp');

    function renderHistory(calculationHistory) {
      const historyContainer = document.getElementById('history');
      if (!historyContainer) {
        console.error('History container element not found.');
        return;
      }
      historyContainer.innerHTML = '';
    
      calculationHistory.forEach(item => {
        const historyItemDiv = document.createElement('div');
        historyItemDiv.classList.add('historyItem'); 
    
        // Create paragraph for enteredExpression
        const enteredExpressionP = document.createElement('p');
        enteredExpressionP.textContent = item.enteredExpression;
        enteredExpressionP.classList.add('entered-expression');
        // Add click event listener to enteredExpressionP
        enteredExpressionP.addEventListener('click', () => {
          let histExpression = item.enteredExpression; // or enteredExpressionP.textContent
          console.log(histExpression);
          let currentValue = inputVal + histExpression;
          setCursorPos(currentValue.toString().length);
          setInputVal(currentValue);
        });
    
        // Create paragraph for preciseResult
        const preciseResultP = document.createElement('p');
        preciseResultP.textContent = item.preciseResult;
        preciseResultP.classList.add('precise-result');
        // Add click event listener to preciseResultP
        preciseResultP.addEventListener('click', () => {
          let histResult = preciseResultP.textContent; 
          console.log(histResult);
          let currentValue = inputVal + histResult;
          setCursorPos(currentValue.toString().length);
          setInputVal(currentValue);
        });
    
        // Create paragraph for horizontal demarcator
        const horizonLine = document.createElement('hr');
        horizonLine.classList.add('horizontal-Line'); 
    
        // Append the paragraphs to the history item div
        historyItemDiv.appendChild(enteredExpressionP);
        historyItemDiv.appendChild(preciseResultP);
        historyItemDiv.appendChild(horizonLine);
    
        // Append the history item div to the container
        historyContainer.appendChild(historyItemDiv);
      });
    }
    
    function showFunctKeys() {
      if (window.innerWidth <= 768) {
        
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

    if (val === '=') {

      try {
      // converts the argument between radian and degree
        function getArgument(expression) {
          const regex = /\((\d*\.?\d+)\)/;
          const regexE = /\(\be\b\)/;
          const match1 = expression.match(regex);
          const match2 = expression.match(regexE); 
          const DegButn = document.querySelector('.butnDEG');

          if (match1) {
            const degrees = parseFloat(match1[1]);
            const radians = DegButn.classList.contains('DegHide') ? degrees : degrees * Math.PI / 180;
            return expression.replace(regex, `(${radians})`);
          } else if (match2) {
            const radianE = DegButn.classList.contains('DegHide') ? Math.E : Math.E * Math.PI / 180;
            return expression.replace(regexE, `(${radianE})`);
          } 
          return expression;
        }
      // Adds the symbol (*) between a number preceding a Math. function.
        function pushTimesSign(expression) {
        // Regex to match a number followed by a Math expression
        const regex = /(\d)(Math\.\w+)/g;
        // Replace matches with the number followed by * and the Math expression
        const correctedExpression = expression.replace(regex, '$1*$2');
      
        return correctedExpression;
        }
      // Adds closing parenthesis
        function addClosingParentheses(expression) {
          const openCount = (expression.match(/\(/g) || []).length;
          const closeCount = (expression.match(/\)/g) || []).length;
          if (openCount > closeCount) {
            return expression + ')';
          }
          return expression;      
        }
      // rounds result appropriately 
        function adjustPrecision(result, precision = 10, tolerance = 1e-10) {
          const roundedResult = Math.round(result * 10 ** precision) / 10 ** precision;
          if (Math.abs(result - roundedResult) < tolerance) {

            return roundedResult; // Return rounded value
          }
          return parseFloat(result.toFixed(precision));        
        }
        let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory'))
        || [];

      // Logs the expression and result into the array.
        function logHistory(enteredExpression, preciseResult) {
          const historyItem = { enteredExpression, preciseResult };
          calculationHistory.unshift(historyItem);

          if (calculationHistory.length > 30 ) {
            console.log('thats enough');
            calculationHistory.pop();
          }
    
          // Save updated history to localStorage
          localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
          // Debugging: Check history in the console
          console.log('Calculation History:', calculationHistory);
        }        
    
        if (
        inputVal.includes('sin(') || 
        inputVal.includes('cos(') || 
        inputVal.includes('tan(')
        ) {
        // Converts the expression to its valid format and evaluates it.
          function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/sin\((\d*\.?\d+)/g, 'Math.sin($1')
              .replace(/cos\((\d*\.?\d+)/g, 'Math.cos($1')
              .replace(/tan\((\d*\.?\d+)/g, 'Math.tan($1')
              .replace(/×/g, '*')
              .replace(/÷/g, '/');

              console.log('moded Expression:' + modifiedExpression);
              const newModExpression =pushTimesSign(modifiedExpression);

              console.log(newModExpression);

            const result = eval(newModExpression);
            return result.toFixed(4);
          }

          const closedInputVal = addClosingParentheses(inputVal);
          const radExpression = getArgument(closedInputVal);
          const result = evaluateExpression(radExpression);
          preciseResult = adjustPrecision(result);      
          enteredExpression = closedInputVal;
          localStorage.setItem('question', enteredExpression);
          localStorage.setItem('answer', preciseResult);
          logHistory(enteredExpression, preciseResult);
        // Add value input to field.
          function setInputValue() {
            return new Promise(resolve => {
              setInputVal(enteredExpression.toString());
              setNewResult(preciseResult.toString());
              setCursorPos(enteredExpression.toString().length);
              resolve();
            });
          }
        // Moves answer to the top after second click of equals to.
          function newInputValue() {
            setInputVal(preciseResult.toString());
            setNewResult("");
            setCursorPos(preciseResult.toString().length);
          }
        // displays result and expression
          async function handleInputDisplay() {
              if (isFirstExecution) {
                await setInputValue(); // Wait for setInputValue to complete
                setIsFirstExecution(false); // Mark as completed
              } else {
                newInputValue(); // Execute newInputValue.
                setIsFirstExecution(true); // Reset for next cycle
              }
          }
          handleInputDisplay();

        } else if (
          inputVal.includes('csc(') ||
          inputVal.includes('sec(') ||
          inputVal.includes('cot(')
        ) {
        // Converts the expression to its valid format, resolve its inverse and evaluates it.
          function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/csc\((\d*\.?\d+)/g, 'Math.sin($1')
              .replace(/sec\((\d*\.?\d+)/g, 'Math.cos($1')
              .replace(/cot\((\d*\.?\d+)/g, 'Math.tan($1')
              .replace(/×/g, '*')
              .replace(/÷/g, '/');
              console.log('moded Expression:' + modifiedExpression);
              const newModExpression = pushTimesSign(modifiedExpression);
              console.log(newModExpression);
          
            const result = 1 / eval(newModExpression);
            return result.toFixed(4);
          }
          const closedInputVal = addClosingParentheses(inputVal);
          const radExpression = getArgument(closedInputVal);        
          const result = evaluateExpression(radExpression);
          const preciseResult = adjustPrecision(result);
          const enteredExpression = closedInputVal;      
          localStorage.setItem('question', enteredExpression);        
          localStorage.setItem('answer', preciseResult);
          logHistory(enteredExpression, preciseResult);
        // Add value input to field.
          function setInputValue() {
            return new Promise(resolve => {
              setInputVal(enteredExpression.toString());
              setNewResult(preciseResult.toString());
              setCursorPos(enteredExpression.toString().length);
              resolve();
            });
          }
        // Moves answer to the top after second click of equals to.
          function newInputValue() {
            setInputVal(preciseResult.toString());
            setNewResult("");
            setCursorPos(preciseResult.toString().length);
          }
        // displays result and expression
          async function handleInputDisplay() {
            if (isFirstExecution) {
              await setInputValue(); // Wait for setInputValue to complete
              setIsFirstExecution(false); // Mark as completed
            } else {
              newInputValue(); // Execute newInputValue.
              setIsFirstExecution(true); // Reset for next cycle
            }
          }
          handleInputDisplay();

        } else if (
          inputVal.includes('sin⁻¹(') || 
          inputVal.includes('cos⁻¹(') || 
          inputVal.includes('tan⁻¹(')) {

            function evaluateInverseTrig(expression) {
              const modifiedExpression = expression
                .replace(/sin⁻¹\((\d*\.?\d+)/g, 'Math.asin($1')
                .replace(/cos⁻¹\((\d*\.?\d+)/g, 'Math.acos($1')
                .replace(/tan⁻¹\((\d*\.?\d+)/g, 'Math.atan($1');
                console.log('moded Expression:' + modifiedExpression);
            const newModExpression = addClosingParentheses(pushTimesSign(modifiedExpression));
            console.log(newModExpression);
                
              const DegButn = document.querySelector('.butnDEG');
              const result = eval(newModExpression);
              return DegButn.classList.contains('DegHide') ? result : result * 180 / Math.PI;
            }
            const result = evaluateInverseTrig(inputVal);
            const preciseResult = adjustPrecision(result);
          // Store preciseResult in localStorage
            const enteredExpression = addClosingParentheses(inputVal);    
            console.log(enteredExpression);
            localStorage.setItem('question', enteredExpression);        
            localStorage.setItem('answer', preciseResult);
            logHistory(enteredExpression, preciseResult);
// Add value input to field.
          function setInputValue() {
            return new Promise(resolve => {
              setInputVal(enteredExpression.toString());
              setNewResult(preciseResult.toString());
              setCursorPos(enteredExpression.toString().length);
              resolve();
            });
          }
        // Moves answer to the top after second click of equals to.
          function newInputValue() {
            setInputVal(preciseResult.toString());
            setNewResult("");
            setCursorPos(preciseResult.toString().length);
          }
        // displays result and expression
          async function handleInputDisplay() {
            if (isFirstExecution) {
              await setInputValue(); // Wait for setInputValue to complete
              setIsFirstExecution(false); // Mark as completed
            } else {
              newInputValue(); // Execute newInputValue.
              setIsFirstExecution(true); // Reset for next cycle
            }
          }
          handleInputDisplay();
          
        } else if (
          inputVal.includes('csc⁻¹(') || 
          inputVal.includes('sec⁻¹(') || 
          inputVal.includes('cot⁻¹(')) {

          const DegButn = document.querySelector('.butnDEG');
           function getsArgument(expression) {
             const regex = /\((\d*\.?\d+)\)/ ; 
             const regexE = /\(\be\b\)/;
             const match1 = expression.match(regex);
             const match2 = expression.match(regexE);

             if (match1) {
               const degrees = parseFloat(match1[match1.length - 1]);
               const arg = degrees ;
               const invArg = 1 / arg;
               console.log(arg);
               console.log(invArg);
               const replacedExpression = expression.replace(regex, `(${invArg})`);
               const modifiedExpression = replacedExpression
               .replace(/csc⁻¹\((\d*\.?\d+)/g, 'Math.asin($1')
               .replace(/sec⁻¹\((\d*\.?\d+)/g, 'Math.acos($1')
               .replace(/cot⁻¹\((\d*\.?\d+)/g, 'Math.atan($1');
               console.log('moded Expression:' + modifiedExpression);
            const newModExpression = addClosingParentheses(pushTimesSign(modifiedExpression));
            console.log(newModExpression);
               return newModExpression;             
              } 
               else if (match2) {
               const argE = Math.E;
               const invArgE = 1 / argE;
               console.log(invArgE);
               const eulerExp = expression.replace(regexE, `(${invRadianE})`);
               return eulerExp;
             }
           }

           const closedInputVal = addClosingParentheses(inputVal);
           const Expression = getsArgument(closedInputVal);
           const solvedExp = eval(Expression);
           const result = DegButn.classList.contains('DegHide') ?  solvedExp : 
            solvedExp * (180 / Math.PI);
            const preciseResult = adjustPrecision(result);
          // Store preciseResult in localStorage
            const enteredExpression = closedInputVal;      
            console.log(enteredExpression);
            localStorage.setItem('question', enteredExpression);          
            localStorage.setItem('answer', preciseResult);
            console.log('Stored Result:', preciseResult);
            logHistory(enteredExpression, preciseResult);
            function setInputValue() {
              return new Promise(resolve => {
                setInputVal(enteredExpression.toString());
                setNewResult(preciseResult.toString());
                setCursorPos(enteredExpression.toString().length);
                resolve();
              });
            }
          // Moves answer to the top after second click of equals to.
            function newInputValue() {
              setInputVal(preciseResult.toString());
              setNewResult("");
              setCursorPos(preciseResult.toString().length);
            }
          // displays result and expression
            async function handleInputDisplay() {
              if (isFirstExecution) {
                await setInputValue(); // Wait for setInputValue to complete
                setIsFirstExecution(false); // Mark as completed
              } else {
                newInputValue(); // Execute newInputValue.
                setIsFirstExecution(true); // Reset for next cycle
              }
            }
            handleInputDisplay();
  
        } else if (
          inputVal.includes('sinh(') || 
          inputVal.includes('cosh(') || 
          inputVal.includes('tanh(')
        )  {
          //for evaluation when argument is in degree and radian since its hyperbolic
          function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/sinh\((\d*\.?\d+)/g, 'Math.sinh($1')
              .replace(/cosh\((\d*\.?\d+)/g, 'Math.cosh($1')
              .replace(/tanh\((\d*\.?\d+)/g, 'Math.tanh($1')
              .replace(/×/g, '*')
              .replace(/÷/g, '/');
              console.log('moded Expression:' + modifiedExpression);
            const newModExpression = pushTimesSign(modifiedExpression);
            console.log(newModExpression);
          
            const result = eval(newModExpression);
            return result.toFixed(4);
          }  
          const closedInputVal = addClosingParentheses(inputVal);
          const result = evaluateExpression(closedInputVal);
          const preciseResult = adjustPrecision(result);
        // Store preciseResult in localStorage
          const enteredExpression = closedInputVal;      
          console.log(enteredExpression);
          localStorage.setItem('question', enteredExpression);        
          localStorage.setItem('answer', preciseResult);
          console.log('Stored Result:', preciseResult);
          logHistory(enteredExpression, preciseResult);
          function setInputValue() {
            return new Promise(resolve => {
              setInputVal(enteredExpression.toString());
              setNewResult(preciseResult.toString());
              setCursorPos(enteredExpression.toString().length);
              resolve();
            });
          }
        // Moves answer to the top after second click of equals to.
          function newInputValue() {
            setInputVal(preciseResult.toString());
            setNewResult("");
            setCursorPos(preciseResult.toString().length);
          }
        // displays result and expression
          async function handleInputDisplay() {
            if (isFirstExecution) {
              await setInputValue(); // Wait for setInputValue to complete
              setIsFirstExecution(false); // Mark as completed
            } else {
              newInputValue(); // Execute newInputValue.
              setIsFirstExecution(true); // Reset for next cycle
            }
          }
          handleInputDisplay();
    
        } else if (
          inputVal.includes('csch(') || 
          inputVal.includes('sech(') || 
          inputVal.includes('coth(')
        )  {
            function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/csch\((\d*\.?\d+)/g, 'Math.sinh($1')
              .replace(/sech\((\d*\.?\d+)/g, 'Math.cosh($1')
              .replace(/coth\((\d*\.?\d+)/g, 'Math.tanh($1')
              .replace(/×/g, '*')
              .replace(/÷/g, '/');
              console.log('moded Expression:' + modifiedExpression);
            const newModExpression = pushTimesSign(modifiedExpression);
            console.log(newModExpression);
          
            const result = eval(newModExpression);
            return result.toFixed(4);
          }  
          const closedInputVal = addClosingParentheses(inputVal);
          const result = 1 / evaluateExpression(closedInputVal);
          const preciseResult = adjustPrecision(result);
        // Store preciseResult in localStorage
          const enteredExpression = closedInputVal;      
          console.log(enteredExpression);
          localStorage.setItem('question', enteredExpression);        
          localStorage.setItem('answer', preciseResult);
          console.log('Stored Result:', preciseResult);
          logHistory(enteredExpression, preciseResult);
          setInputVal(enteredExpression);
          setNewResult(preciseResult);
          setCursorPos(enteredExpression.toString().length);
                           
        } else if (
          inputVal.includes('ln(') ||
          inputVal.includes('log(')
        ) {
          function evaluateExpression(expression) {
            const modifiedExpression = expression
            .replace(/log\((\d*\.?\d+|e|π)/g, (match, group) => 
              `Math.log10(${group === 'e' ? 'Math.E' : group === 'π' ? 
                'Math.PI' : group})`)
            .replace(/ln\((\d*\.?\d+|e|π)/g, (match, group) => 
              `Math.log(${group === 'e' ? 'Math.E' : group === 'π' ? 
                'Math.PI' : group})`);
            console.log('moded Expression:' + modifiedExpression);
              
            const newModExpression = 
              pushTimesSign(modifiedExpression);

            return newModExpression;
          };


          const symbolExp = evaluateExpression(inputVal);
          console.log(symbolExp);
          const result = eval(symbolExp);
          const preciseResult = adjustPrecision(result);
          // Store preciseResult in localStorage
          const enteredExpression = inputVal;      
          console.log(enteredExpression);
          localStorage.setItem('question', enteredExpression);          
          localStorage.setItem('answer', preciseResult);
          console.log('Stored Result:', preciseResult);
          logHistory(enteredExpression, preciseResult);
          function setInputValue() {
            return new Promise(resolve => {
              setInputVal(enteredExpression.toString());
              setNewResult(preciseResult.toString());
              setCursorPos(enteredExpression.toString().length);
              resolve();
            });
          }
        // Moves answer to the top after second click of equals to.
          function newInputValue() {
            setInputVal(preciseResult.toString());
            setNewResult("");
            setCursorPos(preciseResult.toString().length);
          }
        // displays result and expression
          async function handleInputDisplay() {
            if (isFirstExecution) {
              await setInputValue(); // Wait for setInputValue to complete
              setIsFirstExecution(false); // Mark as completed
            } else {
              newInputValue(); // Execute newInputValue.
              setIsFirstExecution(true); // Reset for next cycle
            }
          }
          handleInputDisplay();

        } else if (
          inputVal.includes('π') ||
          inputVal.includes('×') || 
          inputVal.includes('÷') || 
          inputVal.includes('√') ||
          inputVal.includes('∛')
        ) {
          function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/×/g, '*')
              .replace(/÷/g, '/')  
              .replace(/\^/g, '**')             
              .replace(/√(\d*\.?\d+)/g, 'Math.sqrt($1)')
              .replace(/∛(\d*\.?\d+)/g, 'Math.cbrt($1)')             
              .replace(/\be\b/g, 'Math.E')
              .replace(/π/g, 'Math.PI');
              console.log('moded Expression:' + modifiedExpression);
            const newModExpression = pushTimesSign(modifiedExpression);
            console.log(newModExpression);

            return newModExpression;
          };

          const symbolExp = evaluateExpression(inputVal);
          const result = eval(symbolExp);
          const preciseResult = adjustPrecision(result);
          // Store preciseResult in localStorage
          const enteredExpression = inputVal;      
          console.log(enteredExpression);
          localStorage.setItem('question', enteredExpression);          
          localStorage.setItem('answer', preciseResult);
          console.log('Stored Result:', preciseResult);
          logHistory(enteredExpression, preciseResult);
          function setInputValue() {
            return new Promise(resolve => {
              setInputVal(enteredExpression.toString());
              setNewResult(preciseResult.toString());
              setCursorPos(enteredExpression.toString().length);
              resolve();
            });
          }
        // Moves answer to the top after second click of equals to.
          function newInputValue() {
            setInputVal(preciseResult.toString());
            setNewResult("");
            setCursorPos(preciseResult.toString().length);
          }
        // displays result and expression
          async function handleInputDisplay() {
            if (isFirstExecution) {
              await setInputValue(); // Wait for setInputValue to complete
              setIsFirstExecution(false); // Mark as completed
            } else {
              newInputValue(); // Execute newInputValue.
              setIsFirstExecution(true); // Reset for next cycle
            }
          }
          handleInputDisplay();

        } else if (
          inputVal.includes('²')){
            function sqr(Expression) {
              const modifiedExpression = Expression
              .replace(/\u00B2/g, '');

              return modifiedExpression;
            } 

            const num = sqr(inputVal);
            const result = num * num;
            const preciseResult = adjustPrecision(result);
            const enteredExpression = inputVal;      
            localStorage.setItem('question', enteredExpression);          
            localStorage.setItem('answer', preciseResult);
            logHistory(enteredExpression, preciseResult);
            function setInputValue() {
              return new Promise(resolve => {
                setInputVal(enteredExpression.toString());
                setNewResult(preciseResult.toString());
                setCursorPos(enteredExpression.toString().length);
                resolve();
              });
            }
          // Moves answer to the top after second click of equals to.
            function newInputValue() {
              setInputVal(preciseResult.toString());
              setNewResult("");
              setCursorPos(preciseResult.toString().length);
            }
          // displays result and expression
            async function handleInputDisplay() {
              if (isFirstExecution) {
                await setInputValue(); // Wait for setInputValue to complete
                setIsFirstExecution(false); // Mark as completed
              } else {
                newInputValue(); // Execute newInputValue.
                setIsFirstExecution(true); // Reset for next cycle
              }
            }
            handleInputDisplay();
  
        } else {
            const result = math.evaluate(inputVal);
            const preciseResult = adjustPrecision(result);          
            const enteredExpression = inputVal;      
            console.log(enteredExpression);
            localStorage.setItem('question', enteredExpression);          
            localStorage.setItem('answer', preciseResult);
            console.log('Stored Result:', preciseResult);
            logHistory(enteredExpression, preciseResult);           
            function setInputValue() {
              return new Promise(resolve => {
                setInputVal(enteredExpression.toString());
                setNewResult(preciseResult.toString());
                setCursorPos(enteredExpression.toString().length);
                resolve();
              });
            }
          // Moves answer to the top after second click of equals to.
            function newInputValue() {
              setInputVal(preciseResult.toString());
              setNewResult("");
              setCursorPos(preciseResult.toString().length);
            }
          // displays result and expression
            async function handleInputDisplay() {
              if (isFirstExecution) {
                await setInputValue(); // Wait for setInputValue to complete
                setIsFirstExecution(false); // Mark as completed
              } else {
                newInputValue(); // Execute newInputValue.
                setIsFirstExecution(true); // Reset for next cycle
              }
            }
            handleInputDisplay();
            }
      } catch {
        setInputVal(err);
        setCursorPos(cursorPos + 9);
      }

    } else if (val === 'clear') {
      if (cursorPos > 0) {
        const newInput = inputVal.slice(0, cursorPos - 1) + inputVal.slice(cursorPos);
        setInputVal(newInput);
        setCursorPos(cursorPos - 1);
      }
    } else if (val === '←') {
      if (cursorPos > 0) {
        const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
        const valueLength = newInput.length;
        console.log(newInput);

        if (inputVal.includes('sin(') || inputVal.includes('cos(') ||
         inputVal.includes('tan(') || inputVal.includes('csc(') ||
         inputVal.includes('sec(') || inputVal.includes('cot(') ) {
          setCursorPos(cursorPos - 4);
        } else if (inputVal.includes('sinh(')) {
          setCursorPos(cursorPos - 5);
        } else {
          setCursorPos(cursorPos - 1);
        }
      } 
      console.log(cursorPos);
    }
    else if (val === '→') {
      if (cursorPos < inputVal.length) {
        const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
        const valueLength = newInput.length;
        console.log(newInput);

        if (inputVal.includes('sin(') || inputVal.includes('cos(') ||
         inputVal.includes('tan(') || inputVal.includes('csc(') ||
         inputVal.includes('sec(') || inputVal.includes('cot(')) {
          setCursorPos(cursorPos + 4);
        } else if (inputVal.includes('sinh(')) {
          setCursorPos(cursorPos + 5); 
        } else {
          setCursorPos(cursorPos + 1);
        }      }       
      console.log(cursorPos);
    }
    else if (val === 'AC') {
      setInputVal('');
      setNewResult('')
      setCursorPos(0, cursorPos);
      console.log(cursorPos);
    } else if (val === "expand") {
    showFunctKeys();

  } else if (val === 'DEG') {
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
    else if (val === '10^') {
      const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
      console.log('exponent clicked');      
      setCursorPos(cursorPos + 4);
      setInputVal(newInput);
      console.log(cursorPos);    
    } else if (val === 'ans') {
      const storedResult = localStorage.getItem('answer');
      console.log('Retrieved Result:', storedResult);
      const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
      const valueLength = newInput.length;
      const resultLength = storedResult.length;
      setCursorPos(cursorPos + resultLength);
      setInputVal(storedResult);

    } else if (val === 'history') {
        // Display the history in an element 
        historyElement = document.getElementById('history');
        if (historyElement.classList.contains("hideHistory")) {
          historyElement.classList.replace('hideHistory', 'showHistory');
        } else {
          historyElement.classList.replace('showHistory', 'hideHistory');
        }
        const storedHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
        console.log(storedHistory);
        renderHistory(storedHistory);
        
    } else  {
      const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
      const valueLength = newInput.length;
      if (
      (val === 'sin(') || (val === 'cos(') || (val === 'tan(') ||
      (val === 'csc(') || (val === 'sec(') || (val === 'cot(') ||
      (val === 'sin⁻¹(') || (val === 'cos⁻¹(') || (val === 'tan⁻¹(') ||
      (val === 'csc⁻¹(') || (val === 'sec⁻¹(') || (val === 'cot⁻¹(') ||
      (val === 'sinh(') || (val === 'cosh(') || (val === 'tanh(') ||
      (val === 'csch(') || (val === 'sech(') || (val === 'coth(') ||
      (val === 'log(') || (val === 'ln(') 
      ) {
        console.log(valueLength);      
        setCursorPos(cursorPos + valueLength);
        setInputVal(newInput);
        console.log(cursorPos);  
      } else {
        console.log(valueLength);      
        setCursorPos(cursorPos + 1);
        setInputVal(newInput);
        console.log(cursorPos);  
      }
    }
    clrField();
  };

  const clrField = () => {
    if (onButtonClick && inputVal === "math error") {
      setInputVal('');
    }
  };

  let left; 
  let right;
  const trackCursor = (inputVal) => {
    // Insert a vertical line to indicate cursor position.
    left = inputVal.slice(0, cursorPos);
    right = inputVal.slice(cursorPos);
    return `${left}|${right}`;
  };

  return (
    <>
    <div className="calcparent" id='target'>
     <Link to="/UHomepage" className='back'>
    <i className="fa-solid fa-chevron-left"></i> Home </Link>
    <form> 
      <label> 
      <div className="calccont">
         <div id="history" className='hideHistory'> </div>
        <div className='cont' id='calccon'> 
            <div className="virtualInputField">
              <p className="enteredExpression">{trackCursor(inputVal )}</p>
              <p className="preciseResult">{newResult}</p>
            </div>
             <input type="text" name='calc' value={trackCursor(inputVal )} 
             className='inputField' 
              readOnly/>

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

      ${index === 0 ? 'butnHist' : ''}
      ${index === 1 ? 'shiftLeft' : ''}
      ${index === 2 ? 'shiftRight' : ''}
      ${index === 3 ? 'chevDown' : ''}
      ${index === 4 ? 'chevUp': '' }

      ${index === 5 ? 'butnAC': '' }
      ${index === 6 ? 'butnPie': '' }
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

