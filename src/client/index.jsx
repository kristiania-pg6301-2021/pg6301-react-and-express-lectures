import React from "react";
import ReactDOM from "react-dom";

function Application() {
  return (
    <>
      <header>
        <h1>Chat application</h1>
      </header>
      <main>
        <h2>Chat started...</h2>
      </main>
      <footer>
        <form>
          <input autoFocus={true} />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
