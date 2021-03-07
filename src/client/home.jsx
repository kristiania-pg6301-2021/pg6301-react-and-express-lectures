import React from "react";
import {Link} from "react-router-dom";

export function HomePage() {
    return <>
        <h1>Home Page</h1>
        <Link to={"/match"}>New match</Link>
    </>;
}