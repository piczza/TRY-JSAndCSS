const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

// 셀에 넣을 정보 생성 및 초기화
class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

// 저장버튼 누르면
exportBtn.onclick = function (e) {
    let csv = "";
    for (let i = 0; i < spreadsheet.length; i++) {
        if (i === 0) continue;
        //??뭐하는 구조지
        // 그러니까 배열 값중에 "헤더가 아닌걸 골라서" -> "데이터가 존재하는 것만 골라서" -> "쉼표로 구분한 문자열로 바꾸고 줄바꿈" 인가
        csv +=
            spreadsheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(',') + "\r\n";
    }
    // 위 데이터 값을 Blob객체로 만듦.. 아무튼 큰 데이터를 관리하기 편하게 해주는듯
    const csvObj = new Blob([csv]);
    console.log('csvObj', csvObj);

    //주어진 객체를 가르키는 URL을 DOMString으로 변환? 자신을 생성한 document가 사라지면 함께 무효화?
    //그러니까 url을 만들어 가지고 있는데? 그걸 document의 HTML요소값으로 바꿀수있는데? 그 파일 내에 document도 있으니까? 무효화가 안되는건가?
    const csvUrl = URL.createObjectURL(csvObj);
    console.log('csvUrl', csvUrl);

    // url을 document에 연결?
    const a = document.createElement("a");
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}

// 스프레드시트 생성
initSpreadsheet();
function initSpreadsheet() {
    // ROWS만큼 가로줄을 순회
    for (let i = 0; i < ROWS; i++) {
        // 각 가로줄마다 spreadsheetRow 배열 추가
        let spreadsheetRow = [];
        // COLS만큼 각 가로줄마다의 세로줄 순회
        for (let j = 0; j < COLS; j++) {
            //이 변수 세개는 여기서 매 셀마다 설정 초기화.
            let cellData = '';      //헤더셀 위치 정보
            let isHeader = false;   //헤더셀 여부
            let disabled = false;   //입력 불가 여부

            // 모든 row 첫 번째 컬럼에 숫자 넣기
            // 첫번째 세로줄은 곧 가로줄의 헤더니까 이렇게 쓰면 되는구나
            if (j === 0) {
                cellData = i;       //헤더에 셀 위치정보(숫자)넣기
                isHeader = true;    //헤더임
                disabled = true;    //해더니까 입력 불가로
            }
            //이건 첫번째 가로줄을 각 세로의 헤더로.
            if (i === 0) {
                cellData = alphabets[j - 1]; //헤더에 셀 위치정보(알파벳)넣기. 인덱스에 -1 해줘서 다음 칸부터 A로.
                isHeader = true;
                disabled = true;
            }
            //이건 뭐지.. 이미 기본 셀 데이터가 공란 아닌가? 왜 또 공란으로 해주지? undefind때문인가?
            // 첫 번째 row의 컬럼은 "";
            if (!cellData) {
                cellData = "";
            }
            //셀 위치값을 각 셀마다 지정해주기
            const rowName = i;
            const columnName = alphabets[j - 1];
            //셀 정보 가져와서 초기화
            //(isHeader, disabled, data, row, column, rowName, columnName, active = false)
            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            //각 셀 정보를 spreadsheetRow배열에 넣기.
            spreadsheetRow.push(cell);
        }
        //완성된 spreadsheetRow배열을 또 spreadsheet배열에 넣어서 2차원 배열로.
        spreadsheet.push(spreadsheetRow);
    }
    //모든 셀 정보 지정이 끝나면 시트 그려주기
    drawSheet();
    // console.log(spreadsheet);
}

//각 셀 만드는 함수!
function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column; 
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;
    //헤더면 헤더 클래스 이름 넣어주는거
    if (cell.isHeader) {
        cellEl.classList.add("header");
    }

    cellEl.onclick = () => handleCellClick(cell); //클릭되면 해당 셀 좌표표시 함수
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell); //input값 변하면 cell값에 넣어주기

    return cellEl;
}

function handleOnChange(data, cell) {
    cell.data = data;
}

//클릭 된 셀의 좌표를 표시하는 함수
function handleCellClick(cell) {
    //이전에 표시된 좌표의 헤더표시를 지워주기
    clearHeaderActiveStates();
    //표시할 헤더 좌표 가져오기
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    //표시한 헤더 요소 자체를 가져오기
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    //표시 활성화
    columnHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');
    // console.log('clicked cell', columnHeaderEl, rowHeaderEl); 왼쪽위 텍스트에 표시셀 위치값 넣기
    document.querySelector("#cell-status").innerHTML = cell.columnName + cell.rowName;
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');

    headers.forEach((header) => {
        header.classList.remove('active');
    })
}

function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col);
}

//HTML에 시트 출력. 이중배열로 각 가로 줄의 div 만들어주고, 또 각 셀에 접근해서 각 셀 생성 함수 호출.
function drawSheet() {
    for (let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl = document.createElement("div");
        rowContainerEl.className = "cell-row";
        // 각 셀에 [i][j]값으로 접근 및 HTML 요소 생성. 
        for (let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellEl(cell));
        }
        //HTML의 시트 담을 디브에 시트 출력해주기
        spreadSheetContainer.append(rowContainerEl);
    }
}