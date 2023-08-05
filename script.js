//화면
const playground = document.querySelector(".playground > ul");
//세팅
const GAME_ROWS = 20;
const GAME_COLS = 10;
//변수선언
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
const BLOCKS = {
    tree: [
        [[0,0],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}
const movingItem = {
    type:"tree",
    direction: 0,
    top: 0,
    left: 0,
};

init();

//함수들
function init(){//시작하면 호출되는 함수 
    tempMovingItem = {...movingItem};
    for(let i=0; i<20; i++){
        prependNewLine();
    }
    renderBlocks();
}
function prependNewLine(){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j=0; j < GAME_COLS; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}
function renderBlocks(){
    const {type, direction, top, left} = tempMovingItem;
    
    BLOCKS[type][direction].forEach(block => {
        const x = block[0];
        const y = block[1];
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        target.classList.add(type);
    });
}