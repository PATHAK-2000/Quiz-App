import React, { useState, useEffect } from "react";
import "./trivia.css";

import { useSound } from "use-sound";
import play from "../../sounds/play.mp3";
import correct from "../../sounds/correct.mp3";
import wrong from "../../sounds/wrong.mp3";

import { data } from "../../data";
const Trivia = ({ setQuestionNumber, setStop, questionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  let handleClick = (options) => {
    setSelectedAnswer(options);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(options.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (options.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer()
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((options, index) => (
          <div
            className={selectedAnswer === options ? className : "answer"}
            key={index}
            onClick={() => handleClick(options)}
          >
            {options.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
