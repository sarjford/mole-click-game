import moleImage from "./mole.png";
import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";

import { usePersistData } from "./usePersistData";

function App() {
  const startTime = 60;
  const endTime = 0;

  const [time, setTime] = usePersistData("time", startTime);
  const [gameBoard, setGameBoard] = usePersistData(
    "gameBoard",
    new Array(24).fill(false)
  );
  const [score, setScore] = usePersistData("score", 0);
  const [playing, setPlaying] = useState(false);
  const timeRef = useRef(startTime);
  const timerRef = useRef(null);

  useEffect(() => {
    timeRef.current = time;
  });

  function updateGameBoard() {
    // get available cells to fill with moles
    const emptyHomes = gameBoard.reduce(
      (a, b, index) => (!b ? a.concat(index) : a),
      []
    );
    // get random number of moles between 1 and 5
    const numberOfMoles = Math.floor(Math.random() * (6 - 1) + 1);
    // randomly select from available cells to fill with moles
    const newMolesByIndex = emptyHomes
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfMoles);
    // reset state with new filled mole homes
    setGameBoard((prevState) => {
      const tempGameBoard = [...prevState];
      newMolesByIndex.forEach((item) => {
        tempGameBoard[item] = true;
      });
      return tempGameBoard;
    });
  }

  function startTimer() {
    updateGameBoard();
    timerRef.current = setInterval(() => {
      updateGameBoard();
      setTime(timeRef.current - 1);
    }, 1000);
    setPlaying(true);
  }

  function endTimer() {
    clearInterval(timerRef.current);
    setPlaying(false);
  }

  // click handler to reset game once it ends
  const resetGame = useCallback(() => {
    setTime(startTime);
    setGameBoard(new Array(24).fill(false));
    setScore(0);
  }, []);

  // click handler to click mole
  const clickMole = useCallback(
    (index) => {
      if (playing) {
        if (gameBoard[index]) {
          const tempGameBoard = [...gameBoard];
          tempGameBoard[index] = false;
          setGameBoard(tempGameBoard);
          setScore(score + 1);

        }
      }
    },
    [gameBoard, score, playing]
  );

  // when time is done, end game
  useEffect(() => {
    if (time <= endTime) {
      endTimer();
    }
  }, [time]);

  return (
    <div className="App">
      <header>
        <h1>mole click game</h1>
      </header>
      <main>
        <section className="game-stats">
          <div>
            Score<span>{score}</span>
          </div>
          <div>
            Time<span>{time}</span>
          </div>
        </section>

        <section
          className={`game-board ${!playing && "game-finished"}`}
          data-testid="game-board">
          <span className="top left"></span>
          <span className="top right"></span>
          <span className="bottom left"></span>

          {gameBoard.map((moleIsPresent, index) => (
            <div
              className="mole-home"
              key={index}
              onClick={clickMole.bind(this, index)}
            >
              {moleIsPresent && <img src={moleImage} />}
            </div>
          ))}
        </section>

        <section className="game-buttons">
          {time === endTime ? (
            <button onClick={resetGame}>RESET GAME</button>
          ) : (
            <button onClick={startTimer} disabled={playing}>
              START
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
