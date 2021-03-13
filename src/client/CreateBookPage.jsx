import React, {useState} from "react";
import {InputField} from "./InputField";


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
        <InputField label={"Title"} value={title} onChange={setTitle}/>
        <InputField label={"Author"} value={author} onChange={setAuthor}/>
        <InputField label={"Year"} value={year} onChange={setYear} type="number"/>
        <button>Submit</button>
    </form>;
}