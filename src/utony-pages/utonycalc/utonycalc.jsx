import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as math from 'mathjs'
import './utonycalc.css'

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');
  const [result, showResult] = useState("");
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
        const solvedResult = math.evaluate(inputVal);
        setInputVal(solvedResult);
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
  };
  

  const Buttons = [
    'AC', 'C', 
    '(', ')', '1/x',
    '1', '2', '3', '+',
    '^2', '^3', '^',
    '4', '5','6', '-',
    '!', 'sqrt', 'xsqrt',
     '7', '8', '9', '*',
     'e', 'ln', 'log',
     '.', '0',  '/', '=',
     'sin', 'cos', 'tan'
    ];

   
  return (
    <> 
    <div className="name hid"> 
      <span className='gb hid'>U</span>Tony Calc 
      </div>
            <div className="hme" >  <Link to="/"> Home </Link> </div>

    <form>
      <label> 
        <div className='cont'> 
          <input type="text" value={inputVal} className='item1' disabled readOnly/>

          {Buttons.map((buttons, index) => (
  <button
    key = {buttons}
    className={`
      ${index === 0 ? 'but1 ' : 'butn'}
      ${index === 1 ? 'but2' : 'butn'}
      ${index === 2 || index === 3 || index === 4 
        || index === 9 || index === 10 || index === 11 
        || index === 16 || index === 17 || index === 18 
        || index === 23 || index === 24 || index === 25 
        || index === 30 || index === 31 || index === 32 
        ? 'butnHid': ''}
    `}
    onClick={(e) => onButtonClick(e, buttons)}
  >
    {buttons}
  </button>
))}        </div>
      </label>
    </form>    
    </>
  );
}

export default UTonyCalc

