import getCalculation from './getCalculation.js'

const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelector('.keys');

buttons.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('pressed'));

        if (!action) {
            if (displayedNum === '0' ||
                previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;                
            }
            calculator.dataset.previousKeyType = 'number';
        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstNumber = '';
                calculator.dataset.operator = '';
                calculator.dataset.unchangeNumber = '';
                calculator.dataset.previousKeyType = '';
            } else {
                key.textContent = 'AC';
            }
            display.textContent = '0';
            calculator.dataset.previousKeyType = 'clear';
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } 
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            }  
            calculator.dataset.previousKeyType = 'decimal';
        }
        
        if (action === 'percent') {
            let firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let secondNumber = firstNumber / 100 * displayedNum;

            if (displayedNum !== '0') {
                display.textContent = displayedNum / 100;
            }

            if (firstNumber) {
                if (previousKeyType === 'percent') {
                    firstNumber = displayedNum;
                    secondNumber = calculator.dataset.unchangeNumber;
                }
                display.textContent = getCalculation(firstNumber, secondNumber, operator);
            }
            calculator.dataset.unchangeNumber = secondNumber;
            calculator.dataset.previousKeyType = 'percent';
        }

        if (action === 'add' ||
            action === 'multiply' ||
            action === 'subtract' ||
            action === 'divide') {
                key.classList.add('pressed');
                
                const firstNumber = calculator.dataset.firstNumber;
                const operator = calculator.dataset.operator;
                const secondNumber = displayedNum;

                if (firstNumber && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                    let newValue = getCalculation(firstNumber, secondNumber, operator);
                    display.textContent = newValue;
                    calculator.dataset.firstNumber = newValue;
                } else {
                    calculator.dataset.firstNumber = displayedNum;
                }

                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.operator = action;
        }
        if (action === 'calculate') {
            let firstNumber = calculator.dataset.firstNumber;
            const operator = calculator.dataset.operator;
            let secondNumber = displayedNum;

            if (firstNumber) {
                if (previousKeyType === 'calculate') {
                    firstNumber = displayedNum;
                    secondNumber = calculator.dataset.unchangeNumber;
                }
                display.textContent = getCalculation(firstNumber, secondNumber, operator);
            }

            calculator.dataset.unchangeNumber = secondNumber;
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})