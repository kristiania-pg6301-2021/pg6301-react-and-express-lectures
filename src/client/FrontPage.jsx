import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link to="/profile">Profile page</Link>
        </li>
        <li>
          <a href="/login" target="_self">
            Login
          </a>
        </li>
      </ul>
    </div>
  );
}
