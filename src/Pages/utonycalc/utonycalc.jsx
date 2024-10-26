import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as math from 'mathjs'
import './utonycalc.css'

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');
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
          || inputVal.includes('tan(')) {
            
            // Matches and gets digit within a parentheses
            function getsArgument(expression) {
              const regex = /\((\d+)\)/; 
              const match = expression.match(regex);

              if (match) {
                const degrees = parseFloat(match[match.length - 1]);
                const radians = degrees * Math.PI / 180;
                const replacedExpression = expression.replace(regex, `(${radians})`);
                return replacedExpression;
              } else {
                return expression; // No degrees found
              }
            }

const closedInputVal = inputVal + ")";
           const radExpression = getsArgument(closedInputVal);
      const solvedResult = math.evaluate(radExpression);
      const approxResult = solvedResult.toFixed(4);
      setInputVal(approxResult);

          } else {
            const solvedResult = math.evaluate(inputVal);
            setInputVal(solvedResult);
          }
      } catch {
        setInputVal(err);
      }
    } else if (val === 'C') {
      setInputVal(inputVal.slice(0, -1));
    } else if (val === 'AC') {
      setInputVal('');
    } else {
      setInputVal(inputVal + val);
    }
    clrField();
  };

  const clrField = () => {
    if (onButtonClick && inputVal === "math error") {
      setInputVal('');
    }
  }
  
  const Buttons = [
    'AC', '↓', '%', '÷',
    '(', ')', '1/x',
    '1', '2', '3', '+',
    '^2', '^3', '^',
    '4', '5','6', '-',
    '!', 'sqrt', 'xsqrt',
     '7', '8', '9', '×',
     'e', 'ln', 'log(',
     '.', '0',  'C', '=',
     'sin(', 'cos(', 'tan('
    ];

   
  return (
    <>
    <div className="calcparent" id='target'>
    <Link to="/UHomepage" className='back'>
    <i className="fa-solid fa-chevron-left"></i> Home </Link>
    <form> 
      <label> 
      <div className="calccont">

        <div className='cont'> 
             <input type="text" name='calc' value={inputVal} className='item1' disabled readOnly/>

          {Buttons.map((buttons, index) => (
  <button
    key = {buttons}
    className={`
      ${index === 0 ? 'but1 butnc' : ''}
      ${index === 1 ? 'but2 butnc' : ''}
      ${index === 2 ? 'but3 butnc' : ''}
      ${index === 3 ? 'but4 butnc' : ''}
      ${index === 10 || index === 17 
        || index === 24 || index === 31 ? "butnc" : ""}
      ${index === 4 || index === 5 || index === 6
        || index === 11 || index === 12 || index === 13 
        || index === 18 || index === 19 || index === 20
        || index === 25 || index === 26 || index === 27
        || index === 32 || index === 33 || index === 34 
        ? 'butnHid': 'butn'}
    `}
    onClick={(e) => onButtonClick(e, buttons)}
  >
    {buttons}
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

