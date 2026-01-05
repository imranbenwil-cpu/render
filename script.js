(function(){
  const displayEl = document.getElementById('display');
  let expr = '';

  function updateDisplay(){
    displayEl.textContent = expr === '' ? '0' : expr;
  }

  function append(str){
    expr += str;
    updateDisplay();
  }

  function back(){
    expr = expr.slice(0,-1);
    updateDisplay();
  }

  function clearAll(){ expr = ''; updateDisplay(); }

  function safeEval(input){
    // allow only digits, whitespace, operators and parentheses
    if(!/^[0-9+\-*/().\s]+$/.test(input)) throw new Error('Invalid characters');
    // prevent sequences like "*/" at start? rely on Function to error
    // use Function to evaluate in strict mode
    return Function('"use strict";return (' + input + ')')();
  }

  function calculate(){
    try{
      if(expr.trim()==='') return;
      const result = safeEval(expr);
      expr = String(result);
      updateDisplay();
    }catch(e){
      displayEl.textContent = 'Error';
      expr = '';
    }
  }

  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const v = btn.dataset.value;
      const action = btn.dataset.action;
      if(action==='clear') clearAll();
      else if(action==='back') back();
      else if(action==='equals') calculate();
      else if(action==='paren') append(v || btn.textContent);
      else if(v) append(v);
    });
  });

  window.addEventListener('keydown',(e)=>{
    const key = e.key;
    if(key === 'Enter') { e.preventDefault(); calculate(); }
    else if(key === 'Backspace') back();
    else if(key === 'Escape') clearAll();
    else if(/^[0-9+\-*/().]$/.test(key)) { append(key); }
  });

  updateDisplay();
})();