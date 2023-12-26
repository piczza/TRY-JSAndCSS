import { NoteCard } from "../components"
import { NotesContainer } from "../styles/styles"
import { Note } from "../types/note"

//노트 표시 방법!
const filteredNotes = (notes: Note[], filter: string) => {

    const lowPriority = notes.filter(({ priority }) => priority === "low"); //중요도 낮음
    const highPriority = notes.filter(({ priority }) => priority === "high");//중요도 높음

    //정렬방법
    if (filter === "low") {              //중요도 낮음 순
        return [...lowPriority, ...highPriority];
    } else if (filter === "high") {     //중요도 높음 순
        return [...highPriority, ...lowPriority];
    } else if (filter === 'latest') {   //최신 순
        return notes.sort((a, b) => b.createdTime - a.createdTime);
    } else if (filter === "created") {  //생성순
        return notes.sort((a, b) => a.createdTime - b.createdTime);
    } else if (filter === "edited") {   //수정순
        const editedNotes = notes.filter(({ editedTime }) => editedTime);
        const normalNotes = notes.filter(({ editedTime }) => !editedTime);

        const sortEdited = editedNotes.sort((a, b) => ((b.editedTime as number) - (a.editedTime as number)));
        return [...sortEdited, ...normalNotes];
    } else {
        return notes;
    }

}



//모든 노트 표시
const getAllNotes = (mainNotes: Note[], filter: string) => {

    const pinned = mainNotes.filter(({ isPinned }) => isPinned);    //중요 노트
    const normal = mainNotes.filter(({ isPinned }) => !isPinned);   //일반 노트

    //일반 노트가 있고, 중요 노트가 없을 때.
    if (normal.length !== 0 && pinned.length === 0) {
        return (
            <>
                <div className="allNotes__notes-type">
                    All Notes <span>({normal.length})</span>
                </div>
                <NotesContainer>
                    {filteredNotes(normal, filter).map((note) => (
                        <NoteCard key={note.id} note={note} type="notes" />
                    ))}
                </NotesContainer>
            </>
        )
    }

    //중요 노트가 있고, 일반 노트가 없을 때.
    if (pinned.length !== 0 && normal.length === 0) {
        return (
            <>
                <div className="allNotes__notes-type">
                    Pinned Notes <span>({pinned.length})</span>
                </div>
                <NotesContainer>
                    {filteredNotes(pinned, filter).map((note) => (
                        <NoteCard key={note.id} note={note} type="notes" />
                    ))}
                </NotesContainer>
            </>
        )
    }

    //일반 노트도 중요 노트도 있을 때.
    if (pinned.length !== 0 && normal.length !== 0) {
        return (
            <>
                <div>
                    <div className="allNotes__notes-type">
                        Pinned Notes <span>({pinned.length})</span>
                    </div>
                    <NotesContainer>
                        {filteredNotes(pinned, filter).map((note) => (
                            <NoteCard key={note.id} note={note} type="notes" />
                        ))}
                    </NotesContainer>
                </div>
                <div>
                    <div className="allNotes__notes-type">
                        All Notes <span>({normal.length})</span>
                    </div>
                    <NotesContainer>
                        {filteredNotes(normal, filter).map((note) => (
                            <NoteCard key={note.id} note={note} type="notes" />
                        ))}
                    </NotesContainer>
                </div>
            </>
        )
    }
}

export default getAllNotes;