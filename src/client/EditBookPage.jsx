import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {LoadingView} from "./LoadingView";
import {InputField} from "./InputField";

export function EditBookPage({bookApi}) {
    const {search} = useLocation();
    const [book, setBook] = useState();
    const [error, setError] = useState();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    
    useEffect(async () => {
        try {
            const id = new URLSearchParams(search).get("id");
            let book = await bookApi.fetchBook(id);
            setBook(book);
            setTitle(book.title);
            setAuthor(book.author);
            setYear(book.year);
        } catch (e) {
            setError(e);
        }
    }, [search]);
    
    function handleSubmit(e) {
        e.preventDefault();
    }
    
    if (error) {
        return <div>An error occurred: {error.toString()}</div>
    }
    if (!book) {
        return <LoadingView />;
    }
    
    return <form onSubmit={handleSubmit}><h1>Edit book: {title}</h1>
        <InputField label={"Title"} value={title} onChange={setTitle}/>
        <InputField label={"Author"} value={author} onChange={setAuthor}/>
        <InputField label={"Year"} value={year} onChange={setYear} type="number"/>
        <button>Submit</button>
        </form>;
}