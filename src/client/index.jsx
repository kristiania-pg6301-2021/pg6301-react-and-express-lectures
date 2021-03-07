import React from "react";
import ReactDOM from "react-dom";
import {Match} from "./match";
import {selectQuiz} from "./quiz";

ReactDOM.render(<Match quizGenerator={selectQuiz} />, document.getElementById("app"));
