let inputNum='';
let displayNum='';
let operator='';
let resultNum='';

function displayValue(value){
  if(value == 'AC'){
    //입력 삭제
    displayClear();
  }
  else if(displayNum =='' && (value == '-'|| value == '+' || value == '*' || value == '/')){
    //연산자 먼저는 입력 불가
  }
  else if(value == '-'|| value == '+' || value == '*' || value == '/' ){
    //연산자 연속 입력 불가
    if(operator==''){
      operator+= value;
      inputNum += value;
      displayNum += value;
      document.querySelector('.display').value = displayNum;
    }
    else if(operator!==''){
    }
  }
  else{
    //입력
  inputNum += value;
  displayNum += value;
  document.querySelector('.display').value = displayNum;
  }
}

function calculate(){
  let calculation= inputNum.split(operator);
  let leftNum = parseFloat(calculation[0]);
  let rightNum = parseFloat(calculation[1]);
  switch(operator){
    case '+':
      resultNum = leftNum + rightNum;
      break;
    case '-':
      resultNum = leftNum - rightNum;
      break;
    case '/':
      resultNum = leftNum / rightNum;
      break;
    case '*':
      resultNum = leftNum * rightNum;
      break;
    default:
      resultNum = '';
  }
  document.querySelector('.display').value = resultNum;
  inputNum=resultNum;
  displayNum=resultNum;
  operator='';
  resultNum='';

}

function displayClear(){
  if(displayNum.slice(-1) == '-' || displayNum.slice(-1) == '+' || displayNum.slice(-1) == '/' || displayNum.slice(-1) == '*'){
    operator='';
    console.log("dogb");
  }
  inputNum = inputNum.slice(0,-1);
  displayNum = displayNum.slice(0,-1);
  document.querySelector('.display').value=displayNum;
}