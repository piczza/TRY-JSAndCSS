const list = document.getElementById('todo-list');
const createBt = document.getElementById('header__bt-newItem');

//아이템 정보를 넣을 배열 선언
let todos = [];
//아이템 생성 버튼에 '클릭'이벤트 생기면 createNewTodo함수 호출
// createBt.addEventListener('click', createNewTodo);
createBt.addEventListener('click', ()=>{createNewTodo()});
function createNewTodo(){
    //만들 아이템 정보의 key값과 초기 value값.
    const item = {
        id: new Date().getTime(), 
        text: '', 
        complete: false,
    };
    //위 정보값을 일단 todos배열 맨 앞에 넣음.
    todos.unshift(item);
    //위의 아이템 정보값을 넣은 createTodoElement를 호출, 구조까지 다 짜인 아이템을 짠 만듦.
    const {itemEl, inputEl, editBtEl, deleteBtEl} = createTodoElement(item);
 
    //list의 첫번째 자식 으로 itemEl를 자식요소로 추가
    list.prepend(itemEl);
    //텍스트 속성 설정: 첫 생성시에는 활성 및 포커스.
    inputEl.removeAttribute('disabled');
    inputEl.focus();

    //로컬저장소에 데이터 저장(아이템 생성할때마다 저장!)
    saveToLocalStorage();
}

//요소 생성 함수
const createTodoElement = function(item){
    //부모아이템 생성
    const itemEl = document.createElement('div')
    itemEl.classList.add('list-item');

    //checkBoxEl 생성
    const checkBoxEl = document.createElement('input');
    checkBoxEl.type = 'checkbox';
    checkBoxEl.checked = item.complete;
    if(item.complete){
        itemEl.classList.add('complete');
    }
    checkBoxEl.addEventListener('change', ()=> {
        item.complete = checkBoxEl.checked;
        if(item.complete) itemEl.classList.add('complete');
        else itemEl.classList.remove('complete');
        //박스체크 여부도 로컬 데이터 저장!
        saveToLocalStorage();
    })

    //inputEl 생성
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.spellcheck = false;
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');
    inputEl.addEventListener('input', ()=>{
        item.text = inputEl.value;
    })
    inputEl.addEventListener('blur', ()=>{
        inputEl.setAttribute('disabled', '');
        //텍스트 작성 끝날때마다 로컬 데이터 저장!
        saveToLocalStorage();
    })
    inputEl.addEventListener('keydown', (event)=>{
        if(event.key === "Enter") {
            inputEl.setAttribute('disabled', '');
            inputEl.blur();
        }
    })

    const actionEl = document.createElement('div');
    actionEl.classList.add('actions');

    //editBt 생성
    const editBtEl = document.createElement('button');
    editBtEl.classList.add('material-icons', 'item-bt__amend');
    editBtEl.innerText = 'edit';
    editBtEl.addEventListener('click', ()=> {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })
    
    //deleteBt 생성
    const deleteBtEl = document.createElement('button');
    deleteBtEl.classList.add('material-icons', 'item-bt__delete');
    deleteBtEl.innerText = 'remove_circles';
    deleteBtEl.addEventListener('click', ()=>{
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })

    itemEl.append(checkBoxEl);
    itemEl.append(inputEl);
    itemEl.append(actionEl);
    actionEl.append(editBtEl);
    actionEl.append(deleteBtEl);

    //만들어진 요소들 리턴!
    return {itemEl, inputEl, editBtEl, deleteBtEl};
}

//my_todos 라는 이름으로 데이터 저장
const saveToLocalStorage = function (){
    const data = JSON.stringify(todos);
    localStorage.setItem('my_todos', data);
}
//my_todos 라는 데이터 불러오기!
const loadFromLocalStorage = function (){
    const data = localStorage.getItem('my_todos');
    if(data){
        todos = JSON.parse(data);
    }
}
//불러온 데이터대로 화면 출력을 위해 다시 요소 생성해주기
const displayTodos = function() {
    loadFromLocalStorage();
    for(let i = 0; i<todos.length; i++){
        const item = todos[i];
        const {itemEl} = createTodoElement(item);
        list.append(itemEl);
    }
}

displayTodos();