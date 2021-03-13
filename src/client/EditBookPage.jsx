import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {LoadingView} from "./LoadingView";

export function EditBookPage({bookApi}) {
    const {search} = useLocation();
    const [book, setBook] = useState();
    const [error, setError] = useState();
    
    useEffect(async () => {
        try {
            const id = new URLSearchParams(search).get("id");
            setBook(await bookApi.fetchBook(id));
        } catch (e) {
            setError(e);
        }
    }, [search]);
    
    if (error) {
        return <div>An error occurred: {error.toString()}</div>
    }
    if (!book) {
        return <LoadingView />;
    }
    
    const {title} = book;
    return <h1>Edit book: {title}</h1>;
}