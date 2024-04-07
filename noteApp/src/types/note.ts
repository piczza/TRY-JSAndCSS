import { Tag } from "./tag";

//각 노트가 가지고 있는 속성들
export interface Note {
    title: string;          //노트이름
    content: string;        //노트 내용
    tags: Tag[];            //태그
    color: string;          //배경색
    priority: string;       //?
    isPinned: boolean;      //핀설정 했는지 여부
    isRead: boolean;        //뭐지? 읽었는지?
    date: string;           //날짜
    createdTime: number;    //생성 날짜
    editedTime: null | number;//수정된 시간?
    id: string;             //노트 아이디
}