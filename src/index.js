function eval() {
    // Do not use eval!!!
    return;
}
const methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b === 0) throw new Error("TypeError: Division by zero.");
      return a / b;
    }
  };
  
  function checkBrackets(str) {
    let countOpen = str.split('').filter(el => el === '(').length;
    let countClose = str.split('').filter(el => el === ')').length;
    if (countOpen !== countClose) throw new Error("ExpressionError: Brackets must be paired");
  }
  
  function expressionCalculator(expr) {
    checkBrackets(expr);
    expr = expr
      .split("")
      .filter(el => el !== " ")
      .join("");
    let exp = /\([^()]*\)/; // RegExp for expression in brackets
    while (expr.includes("(")) {
      expr = expr.replace(exp, withoutBracketsCalc);
    }
    expr = withoutBracketsCalc(expr);
    return +expr.toFixed(4);
  }
  
  function withoutBracketsCalc(expr) {
    if (expr.includes("(")) {
      expr = expr.slice(1, -1);
    }
    let exp1 = /\d+\.?\d*\s*[*/]\s*\-?\d+\.?\d*/;
    let exp2 = /\-?\d+\.?\d*\s*[+-]\s*\-?\d+\.?\d*/;
  
    while (exp1.test(expr)) {
      expr = expr.replace(exp1, calcString);
    }
    while (exp2.test(expr)) {
      expr = expr.replace(exp2, calcString);
    
    }
    return +expr;
  }
  
  function calcString(str) {
    let reg = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;
    let arr = str.match(reg);
    let a = +arr[1],
      op = arr[2],
      b = +arr[3];
    
    return methods[op](a, b);
  }
  
module.exports = {
    expressionCalculator
}