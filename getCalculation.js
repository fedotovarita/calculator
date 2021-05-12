const getCalculation = (n1, n2, operator) =>  {
    let result = '';
        switch (operator) {
            case 'add':
                result = parseFloat(n1) + parseFloat(n2);
                break;
            case 'multiply': 
                result = parseFloat(n1) * parseFloat(n2);
                break;
            case 'subtract':
                result = parseFloat(n1) - parseFloat(n2);
                break;
            case 'divide':
                result = parseFloat(n1) / parseFloat(n2);
                break;
        }
    return result;
}
export default getCalculation;