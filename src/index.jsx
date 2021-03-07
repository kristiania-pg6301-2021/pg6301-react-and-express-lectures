import React from "react";
import ReactDOM from "react-dom";
import {Match} from "./match";

ReactDOM.render(<Match quizGenerator={selectQuiz} />, document.getElementById("app"));
