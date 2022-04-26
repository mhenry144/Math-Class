import React, { useState } from "react";
import axios from "axios";
import "../styles/Maths.css";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

export default function Maths() {
  // Generate random equation
  function askQuestions() {
    // Generate random Integers
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);
    const op = ["+", "-", "*"];
    // Generate random Operators
    var rop = op[(Math.random() * op.length) | 0];
    // Math Equation
    return a + " " + rop + " " + b;
  }

  const [question, setQuestion] = useState(askQuestions);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const submitHandler = (e) => {
    // Math.js expression format
    var sendAnswer = {
      expr: [question],
      precision: 14,
    };
    //console.log(question)
    e.preventDefault();

    // if no answer is submitted prompt user to enter a value
    if (answer.length > 0) {
      // Math.js api post method
      axios
        .post("http://api.mathjs.org/v4/", sendAnswer)
        .then((response) => {
          // Math.js api response in console
          console.log(response.data.result[0]);
          if (answer === response.data.result[0]) {
            Swal.fire("Correct!", "", "success");
            setQuestion(askQuestions);
            setAnswer("");
            setScore(score + 1);
          } else {
            Swal.fire("Incorrect!", "Try again.", "error");
            if (score > 0) {
              setScore(score - 1);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire("Please Enter a value.", "Try again.", "error");
    }
  };

  return (
    <div className="maths__app">
      <h3 className="score">Score: {score}</h3>
      {/* Math Problem */}
      <div className="math__question">{question}</div>
      <form onSubmit={submitHandler}>
        {/* Input Box */}
        <div>
          <input
            type="text"
            name="answer"
            className="input__box"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <div className="submit__button">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
