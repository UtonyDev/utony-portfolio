import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp} from 'react-icons/fa';
import * as math from 'mathjs'
import './utonycalc.css'

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');

  const Buttons = [
  { label: 'AC', value: 'AC' },
  { label: <FaChevronDown />, value: 'expand' },
  { label: '%', value: '%' },
  { label: '÷', value: '/' },

  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '^', value: '^' },
  { label: '^2', value: '^2' },

  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '+', value: '+' },

  { label: '!', value: '!' },
  { label: '√', value: '√' },
  { label: '∛', value: '∛' },
  { label: '10^x', value: '10^' },

  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '-', value: '-' },

  { label: 'e', value: 'e' },
  { label: 'ln', value: 'ln' },
  { label: 'log(', value: 'log(' },
  { label: 'INV', value: 'inv' },

  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '×', value: '*' },

  { label: '.', value: '.' },
  { label: '0', value: '0' },
  { label: '⇐', value: 'clear' },
  { label: '=', value: '=' },

  { label: 'sin', value: 'sin(' },
  { label: 'cos', value: 'cos(' },
  { label: 'tan', value: 'tan(' },
  { label: 'DEG', value: 'DEG' },

  { label: <FaChevronUp />, value: 'expand' },

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
                return expression;
              }
            }

            const closedInputVal = inputVal + ")";
                const radExpression = getsArgument(closedInputVal);
            const solvedResult = math.evaluate(radExpression);
            const approxResult = solvedResult.toFixed(4);
            setInputVal(approxResult);

        } else if (inputVal.includes('√') || inputVal.includes('∛') ) {
          function evaluateExpression(expression) {
            const modifiedExpression = expression
              .replace(/√(\d+)/g, 'Math.sqrt($1)')
              .replace(/∛(\d+)/g, 'Math.cbrt($1)');
          
            return modifiedExpression;
          };
    
          const rootVal =  evaluateExpression(inputVal);
          const rootedVal = eval(rootVal);
          setInputVal(rootedVal);
        } else {
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
        const chevButn = document.querySelector('.chevs');
        const chevUp = document.querySelector('.chevUp');

        if (showAllButn.classList.contains('cont')) {
          chevUp.classList.add('overlayChev');
        } else {
          chevUp.classList.remove('overlayChev');
        }

        butn.forEach((button) => {
          const chevUp = document.querySelector('.chevUp');

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
             className='item1' disabled readOnly/>

          {Buttons.map((buttons, index) => (
  <button
    key = {index} 
    id ="butns"
    className={`
      ${index === 0 ? 'but1 butnc' : ''}
      ${index === 1 ? 'chevDown butnc showAll chevs' : ''}
      ${index === 2 ? 'but3 butnc' : ''}
      ${index === 3 ? 'but4 butnc' : ''}
      ${index === 11 ? 'butPlus butnc' : ''}
      ${index === 19 ? 'butMinus butnc' : ''}
      ${index === 27 ? 'butTimes butnc' : ''}      
      ${index === 28 ? 'butPoint butnc' : ''}
      ${index === 30 ? 'butClear butnc' : ''}
      ${index === 31 ? 'butEqual butnc' : ''}

      ${index === 11 || index === 19 
        || index === 27 || index === 31
        ? "butnc" : ""}

      ${index === 4 || index === 5 || index === 6 || index === 7 
        || index === 12 || index === 13 || index === 14 || index === 15
        || index === 20 || index === 21 || index === 22 || index === 23
        || index === 32 || index === 33 || index === 34 || index === 35
        ? 'butnHid': 'butn'}

      ${index === 4 ? 'itemsF1': '' }
      ${index === 5 ? 'itemsF2': '' }
      ${index === 6 ? 'itemsF3': '' }
      ${index === 7 ? 'itemsF4': '' }

      ${index === 12 ? 'itemsF5': '' }
      ${index === 13 ? 'itemsF6': '' }
      ${index === 14 ? 'itemsF7': '' }
      ${index === 15 ? 'itemsF8': '' }

      ${index === 20 ? 'itemsF9': '' }
      ${index === 21 ? 'itemsF10': '' }
      ${index === 22 ? 'itemsF11': '' }
      ${index === 23 ? 'itemsF12': '' }

      ${index === 32 ? 'itemsF13': ''}
      ${index === 33 ? 'itemsF14': ''}
      ${index === 34 ? 'itemsF15': ''}
      ${index === 35 ? 'itemsF16': ''}

      ${index === 36 ? "chevUp" : ''}

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

