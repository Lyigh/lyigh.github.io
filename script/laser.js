

console.log('WIP. This is a slow laser that follows the mouse.')
console.log('First we will be finding a function given the inputs of 3 ordered pairs')

let x1, y1, x2, y2, x3, y3;


function returnSubstitution(x, y) {
    const a = x * x;
    const b = x;
    const c = 1;
    const f = y;
    return [{fValue: f}, {aValue: a}, {bValue: b}, {cValue: c}]
}

//each representing the objects returned by the function above
let functionA, functionB, functionC;

//the goal is to multiply functionA and add to functionB, then do the same with functionC
//we want to return the resulting f, a, and b values

function polarizeAndReturnSum(polarizedFunc, concededFunc) {
    const a1 = polarizedFunc.at('fValue') * -1;
    const b1 = polarizedFunc.at('bValue') * -1;
    const f1 = polarizedFunc.at('fValue') * -1;

    const a2 = concededFunc.at('aValue').value;
    const b2 = concededFunc.at('bValue');
    const f2 = concededFunc.at('fValue');

    const a = a1 + a2;
    const b = b1 + b2;
    const f = f1 + f2;
    //I probably could've reversed the a,b, and f one values in this step, but it seems more clean this way

    return [{fValue: f}, {aValue: a}, {bValue: b}];
}

//step 2
let functionD, functionE;

function simplifyFunction(func) {
    let b = func.bValue;
    let a = func.aValue;
    let f = func.fValue;

    b = b/b;
    a = a/b;
    f = f/b;

    return [{fValue: f}, {aValue: a}, {bValue: b}]
}

//functionD = simplifyFunction(functionD);
//functionE = simplifyFunction(functionE);

//const functionF = polarizeAndReturnSum(functionD, functionE);

//if (functionF.bValue == 0) console.error('functionF didn\'t simplify properly!');

/*
const aResult = functionF.aValue;
const fResult = functionF.fValue;
console.log(`The current functionF is ${aResult}a = ${fResult}`)
*/

const button = document.getElementById('submit-button');
document.addEventListener('click', function (e) {
    if (e.target === button) {
        runCalculations()
    } 
})

/*
we need: to be able to call the numerical inputs and assign them from each box at a moment's notice
we can assign each manually, or we can loop through a list of the keys and get the value

*/

function runCalculations() {
    
    x1 = getNumberInput('x1');
    y1 = getNumberInput('y1');
    x2 = getNumberInput('x2');
    y2 = getNumberInput('y2');
    x3 = getNumberInput('x3');
    y3 = getNumberInput('y3');

    functionA = returnSubstitution(x1, y1);
    console.log(functionA);
    functionB = returnSubstitution(x2, y2);
    functionC = returnSubstitution(x3, y3);

    console.log(functionA.at(1).aValue)

    functionD = polarizeAndReturnSum(functionA, functionB);
    console.log(functionD)
    functionE = polarizeAndReturnSum(functionA, functionC);

    functionD = simplifyFunction(functionD);
    functionE = simplifyFunction(functionE);
    console.log(functionD);
    console.log(functionE);

    const functionF = polarizeAndReturnSum(functionD, functionE);
    if (functionF.bValue != 0) console.error('functionF is not properly simplified!');

    const aResult = functionF.aValue;
    const fResult = functionF.fValue;
    console.log(`The current functionF is ${aResult}a = ${fResult}`)

}

function getNumberInput(v) {
    return Number(document.querySelector(`[data-${v}]`).value);
}




