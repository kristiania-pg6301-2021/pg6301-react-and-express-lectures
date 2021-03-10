import React, {useState} from "react";


export function CreateBookPage() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    
    async function submit(e) {
        e.preventDefault();
        console.log("Submitting", {title, author, year});
        await fetch("/api/books", {
            method: "POST",
            body: JSON.stringify({title, author, year}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    
    
    
    return <form onSubmit={submit}>
        <h1>Create new book</h1>
        <div><label>Title: <input type="text" value={title} onChange={e => setTitle(e.target.value)}/></label></div>
        <div><label>Author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/></label></div>
        <div><label>Year: <input type="number" value={year} onChange={e => setYear(e.target.value)}/></label></div>
        <button>Submit</button>
        </form>;
}