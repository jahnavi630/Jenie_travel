
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  destination: string;
  fact: string;
}

const TravelTrivia: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  
  const triviaQuestions: TriviaQuestion[] = [
    {
      question: "Which of these is NOT one of the Seven Wonders of the World?",
      options: [
        "Great Wall of China",
        "Eiffel Tower",
        "Taj Mahal",
        "Christ the Redeemer"
      ],
      correctAnswer: 1,
      destination: "Paris, France",
      fact: "While not one of the Seven Wonders, the Eiffel Tower is visited by around 7 million people annually, making it the most-visited paid monument in the world."
    },
    {
      question: "Varanasi is one of the oldest continuously inhabited cities in the world. How old is it believed to be?",
      options: [
        "Around 1,000 years old",
        "Around 2,000 years old",
        "Around 3,500 years old",
        "Around 5,000 years old"
      ],
      correctAnswer: 2,
      destination: "Varanasi, India",
      fact: "Varanasi, also known as Banaras or Kashi, is believed to be around 3,500 years old and is considered one of the holiest cities in Hinduism."
    },
    {
      question: "Which country has the most islands in the world?",
      options: [
        "Indonesia",
        "Philippines",
        "Japan",
        "Sweden"
      ],
      correctAnswer: 3,
      destination: "Stockholm Archipelago, Sweden",
      fact: "Sweden has an estimated 267,570 islands, though only about 1,000 are inhabited. The Stockholm Archipelago alone contains about 30,000 islands and islets."
    },
    {
      question: "Which city is known as the 'City of Canals'?",
      options: [
        "Amsterdam",
        "Venice",
        "Bangkok",
        "Copenhagen"
      ],
      correctAnswer: 1,
      destination: "Venice, Italy",
      fact: "Venice is built on 118 small islands separated by canals and connected by over 400 bridges. The entire city is listed as a UNESCO World Heritage site."
    },
    {
      question: "Which mountain range contains Mount Everest?",
      options: [
        "Alps",
        "Andes",
        "Himalayas",
        "Rockies"
      ],
      correctAnswer: 2,
      destination: "Everest Base Camp, Nepal",
      fact: "Mount Everest stands at 29,032 feet (8,849 meters) above sea level. The Everest Base Camp trek is one of the most popular trekking routes in the world."
    }
  ];
  
  useEffect(() => {
    getRandomQuestion();
  }, []);
  
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    setCurrentQuestion(triviaQuestions[randomIndex]);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };
  
  const handleOptionSelect = (index: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(index);
    }
  };
  
  const checkAnswer = () => {
    if (selectedOption !== null && currentQuestion) {
      setIsAnswerChecked(true);
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
    }
  };
  
  if (!currentQuestion) {
    return (
      <div className="trivia-container">
        <p>Loading trivia questions...</p>
      </div>
    );
  }
  
  return (
    <div className="trivia-container">
      <h3 className="trivia-title">Travel Trivia Challenge</h3>
      <p className="trivia-score">Score: {score}</p>
      
      <div className="trivia-question">
        {currentQuestion.question}
      </div>
      
      <div className="trivia-options">
        {currentQuestion.options.map((option, index) => (
          <div 
            key={index} 
            className={`trivia-option ${selectedOption === index ? 'selected' : ''} 
                      ${isAnswerChecked && index === currentQuestion.correctAnswer ? 'correct' : ''}
                      ${isAnswerChecked && selectedOption === index && index !== currentQuestion.correctAnswer ? 'incorrect' : ''}`}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>
      
      {isAnswerChecked ? (
        <>
          <div className="trivia-destination-info">
            <p className="trivia-destination">
              Destination Spotlight: {currentQuestion.destination}
            </p>
            <p className="trivia-fact">
              {currentQuestion.fact}
            </p>
          </div>
          
          <Button 
            onClick={getRandomQuestion}
            className="next-question-btn"
            variant="outline"
          >
            Next Question
          </Button>
        </>
      ) : (
        <Button 
          onClick={checkAnswer}
          className="check-answer-btn"
          disabled={selectedOption === null}
        >
          Check Answer
        </Button>
      )}
    </div>
  );
};

export default TravelTrivia;
