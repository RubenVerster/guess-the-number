import React, { useEffect, useState } from 'react';

const Game = () => {
  const [lowerBound, setLowerBound] = useState(69);
  const [upperBound, setUpperBound] = useState(420);
  const [guess, setGuess] = useState(0);
  const [numberToMatch, setNumberToMatch] = useState(333);

  const [guessMessage, setGuessMessage] = useState('Try and guess the number I am thinking of! :D');
  const [guessedState, setGuessedState] = useState<boolean | null>(null);

  const handleLowerBoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) > upperBound) {
      setUpperBound(parseFloat(e.target.value) + 1);
    }
    setLowerBound(parseFloat(e.target.value));
  };
  const handleUpperBoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) < lowerBound) {
      setLowerBound(parseFloat(e.target.value) - 1);
    }
    setUpperBound(parseFloat(e.target.value));
  };
  const handleUserGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(parseFloat(e.target.value));
  };

  const generateNewNumberToGuess = () => {
    setNumberToMatch(Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound);
  };
  useEffect(() => {
    generateNewNumberToGuess();
  }, [lowerBound, upperBound]);

  const handleGuess = (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newMsg = '';
    if (guess < lowerBound || guess > upperBound) {
      setGuessMessage('Your guess is out of bounds... :P');
      setGuessedState(false);
      return;
    }
    if (guess > numberToMatch) {
      newMsg = 'Your guess is like Snoop Dogg, too high! Guess lower! :(';
      setGuessedState(false);
    }
    if (guess < numberToMatch) {
      newMsg = 'Your guess is like Bitcoin price, too low! Guess higher! :(';
      setGuessedState(false);
    }

    if (guess === numberToMatch) {
      newMsg = 'You guessed the number! Congratulations! Now guess again! ;D';
      setGuessedState(true);
      generateNewNumberToGuess();
    }
    setGuessMessage(newMsg);
  };

  return (
    <div className='game-box'>
      <h1 className='margin_bottom-small'>
        Guess The Number Between {lowerBound} and {upperBound}!
      </h1>

      <h3
        className={`${
          guessedState === true ? 'correct' : guessedState === false ? 'incorrect' : ''
        } margin_bottom-small`}
      >
        {guessMessage}
      </h3>

      <form onSubmit={(e) => handleGuess(e)}>
        <input
          type='number'
          value={guess}
          onChange={(e) => handleUserGuessChange(e)}
          placeholder='Your Guess'
        />
        <div>
          <button className='w-100' onSubmit={(e) => handleGuess(e)}>
            Guess!
          </button>
        </div>
      </form>

      <div>
        <h2 className='margin_bottom-small'>Game Configuration</h2>
        <div>
          <label className='margin_right-tiny' htmlFor='lowerBound'>
            Lower Bound
          </label>
          <input
            className='w-50'
            type='number'
            name='lowerBound'
            placeholder='Lower Bound'
            value={lowerBound}
            onChange={(e) => handleLowerBoundChange(e)}
          />
        </div>
        <label className='margin_right-tiny' htmlFor='upperBound'>
          Upper Bound
        </label>
        <input
          className='w-50'
          type='number'
          name='upperBound'
          placeholder='Upper Bound'
          value={upperBound}
          onChange={(e) => handleUpperBoundChange(e)}
        />
      </div>
      {/* {numberToMatch} */}
    </div>
  );
};

export default Game;
