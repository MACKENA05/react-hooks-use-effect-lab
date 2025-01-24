import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // If timeRemaining is greater than 0, start the countdown
    if (timeRemaining > 0) {
      const timeoutId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1); // Decrease timeRemaining by 1 every second
      }, 1000);

      // Clean up the timeout on unmount or when timeRemaining changes
      return () => clearTimeout(timeoutId);
    } else {
      // If the timeRemaining reaches 0, reset it back to 10 seconds and call onAnswered(false)
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Only run this effect when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is selected
    onAnswered(isCorrect); // Call the onAnswered callback with the result
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
