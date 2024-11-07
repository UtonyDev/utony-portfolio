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
  { label: 'ln', value: 'ln(' },
  { label: 'log', value: 'log(' },
  { label: 'INV', value: 'invert' },

  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '×', value: '*' },

  { label: '.', value: '.' },
  { label: '0', value: '0' },
  { label: '⇐', value: 'clear' },
  { label: '=', value: '=' },

  { label: 'Sin', value: 'sin(' },
  { label: 'Cos', value: 'cos(' },
  { label: 'Tan', value: 'tan(' },
  { label: 'DEG', value: 'DEG' },

  { label: <FaChevronUp />, value: 'expand' },

  { label: 'RAD', value: 'RAD' },
  { label: 'Sin⁻¹', value: 'sin⁻¹(' },
  { label: 'Cos⁻¹', value: 'cos⁻¹(' },
  { label: 'Tan⁻¹', value: 'tan⁻¹(' },

  { label: 'π', value: 'π' },
  { label: '<', value: '<' },
  { label: '>', value: '>' }
  
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
            const DEgButn = document.querySelector('.itemsF16');
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

            
            if (DEgButn.classList.contains('DegButn')) {
              RadEvaluate();
              console.log(true)
            } else {
              DegEvaluate();
              console.log(false)
            }

        } else if (inputVal.includes('sin⁻¹(')
          || inputVal.includes('cos⁻¹(')
          || inputVal.includes('tan⁻¹(')) {
            const DEgButn = document.querySelector('.itemsF16');

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

          if (DEgButn.classList.contains('DegButn')) {
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
      const radTogg = document.querySelector('.RadToggle');
      const DEgButn = document.querySelector('.itemsF16');
      DEgButn.classList.toggle('DegButn');     
      radTogg.classList.toggle('radShow');
      console.log(DEgButn);
      console.log(radTogg);

    }
     else if (val === 'RAD') {
      const radTogg = document.querySelector('.RadToggle');
      const DEgButn = document.querySelector('.itemsF16');
      DEgButn.classList.toggle('DegButn');     
      radTogg.classList.toggle('radShow');
      console.log(DEgButn);
      console.log(radTogg);

    } 
    else if (val === 'invert') {
      const inverseButns = document.querySelectorAll('.invButns');
      const TrigButns = document.querySelectorAll('.trigButns');
      console.log(inverseButns);

      for (let i = 0; i < inverseButns.length; i++ ) {
        inverseButns[i].classList.toggle('invsButnShow');
        TrigButns[i].classList.toggle('trigButnsHide');
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

        ${index === 8 ? 'bno1' : ''}
        ${index === 9 ? 'bno2' : ''}
        ${index === 10 ? 'bno3' : ''}

        ${index === 16 ? 'bno4' : ''}
        ${index === 17 ? 'bno5' : ''}
        ${index === 18 ? 'bno6' : ''}

        ${index === 24 ? 'bno7' : ''}
        ${index === 25 ? 'bno8' : ''}
        ${index === 26 ? 'bno9' : ''}

        ${index === 29 ? 'butnZero' : ''}


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

      ${index === 32 ? 'itemsF13 trigButns': ''}
      ${index === 33 ? 'itemsF14 trigButns': ''}
      ${index === 34 ? 'itemsF15 trigButns': ''}
      ${index === 35 ? 'itemsF16 trigButns': ''}

      ${index === 36 ? "chevUp" : ''}

      ${index === 37 ? "RadToggle butnHid radShow" : ''}

      ${index === 38 ? "sinInv invButns butnHid" : ''}
      ${index === 39 ? "cosInv invButns butnHid " : ''}
      ${index === 40 ? "tanInv invButns butnHid" : ''}

      ${index === 41 ? "mathPie butnHid" : ''}
      ${index === 42 ? "shiftLeft butnHid" : ''}
      ${index === 43 ? "shiftRight invButns butnHid" : ''}

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

