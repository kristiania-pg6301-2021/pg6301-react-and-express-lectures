import React, {useState, useEffect} from "react";
import {LoadingView} from "./LoadingView";

export function BookListPage() {
    const [books, setBooks] = useState();
    const [error, setError] = useState();
    
    async function loadBooks() {
        try {
            const res = await fetch("/api/books");
            if (!res.ok) {
                throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
            }

            const json = await res.json();
            setBooks(json);
        } catch (e) {
            setError(e);
        }
    }
    
    useEffect(loadBooks, []);
    
    if (error) {
        return <div>Something went wrong</div>;
    }
    
    
    if (!books) {
        return <LoadingView/>;
    }
    
    
    return <>
        <h1>List books</h1>
        {books.map(({id, title}) => (
            <li key={id}>{title}</li>
        ))}
        </>;
}