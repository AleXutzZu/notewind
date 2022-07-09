import React, {useEffect, useState} from 'react';
import Note from "../note/Note";
import useWindowHeight from "../../hooks/useWindowHeight";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export interface INote {
    title: string;
    content: string;
}

const App: React.FC = () => {
    const [notes, setNotes] = useState<INote[]>(() => {
        const localNotes = localStorage.getItem('notes');
        return localNotes ? JSON.parse(localNotes) : [];
    });
    const [page, setPage] = useState<number>(1);
    const windowHeight = useWindowHeight();

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const notesPerPage: number = Math.floor(((4.0 / 5.0) * windowHeight - 200) / 58) - 1;
    const notesToShow: INote[] = notes.slice((page - 1) * notesPerPage, page * notesPerPage);


    const deleteNote = (index: number): void => {
        setNotes(notes.filter((_, i) => i !== index));
        if (notesToShow.length === 1 && page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    }

    const createNote = (): void => {
        setNotes(prevNotes => [...prevNotes, {title: 'New Note', content: 'This is a new note'}]);
    }

    const editNoteFactory = (index: number) => {
        return (title: string, content: string): void => {
            setNotes(prevNotes => {
                const newNotes = [...prevNotes];
                newNotes[index] = {title, content};
                return newNotes;
            }
            );
        }
    }

    return (
        <>
            <Header/>
            <main className={"flex flex-col items-center mx-auto py-4 h-4/5"}>
                <section className={"flex flex-col w-full items-center mx-auto"}>
                    {notes.length === 0 && <h2 className={"font-bold text-3xl text-center"}>No notes yet...</h2>}
                    {notesToShow.map((note, index) => (<Note key={index} title={note.title} content={note.content}
                                                             handleDelete={() => deleteNote(index)}
                                                             handleEdit={editNoteFactory(index)}/>))}
                </section>
                <section className={"mt-auto flex items-center justify-center space-x-5"}>
                    <button disabled={page === 1} className={"disabled:opacity-75 group"}
                            onClick={() => setPage(prevPage => prevPage - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-12 w-12 fill-blue-500 transition group-enabled:hover:fill-blue-700"
                             viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        className={"transition bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "}
                        onClick={createNote}>
                        Create note
                    </button>
                    <button disabled={((page - 1) * notesPerPage + notesToShow.length) === notes.length}
                            className={"group disabled:opacity-75"} onClick={() => setPage(prevPage => prevPage + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-12 w-12 fill-blue-500 transition group-enabled:hover:fill-blue-700"
                             viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default App;
