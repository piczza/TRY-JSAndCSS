const $display = document.getElementById('display');
const $result = document.getElementById('result');
let numberClick=false;//true면 숫자를, false면 부호를 눌럿다는 뜻

function add(char){
    if(numberClick==false){
        if(isNaN(char)==true){

        }
        else {
            document.getElementById('display').value += char;
        }
    }
    else {
        document.getElementById('display').value += char;
    }

    if(isNaN(char)==true) numberClick = false;
    else numberClick = true;
}
function calculate(){
    let display=document.getElementById('display');
    result = eval(display.value);
    document.getElementById('result').value=result;
}
function reset(){
    document.getElementById('display').value="";
    document.getElementById('result').value="";
}
