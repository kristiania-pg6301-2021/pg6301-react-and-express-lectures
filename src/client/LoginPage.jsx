import React, {useState} from "react";
import {HttpError} from "./HttpError";
import {useHistory} from "react-router";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const history = useHistory();
    
    async function handleSubmit(e) {
        e.preventDefault();
        const result = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!result.ok) {
            throw new HttpError(result);
        }
        history.push("/");
    }
    
    return <form onSubmit={handleSubmit}><h1>Log in</h1>
        <input type="username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Log in</button>
    </form>;
}