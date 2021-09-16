import Mole from './Mole';
import { useEffect, useState, useRef, useCallback } from 'react';

import { usePersistData } from '../hooks/usePersistData';

import { global } from '../global';
import { getRandomNumber } from '../utils';

function App() {

  // state hooks
  const [gameBoard, setGameBoard] = usePersistData(
    'gameBoard',
    new Array(global.BOARDGAME_CELLS).fill(false)
  );
  const [time, setTime] = usePersistData('time', global.START_TIME);
  const [score, setScore] = usePersistData('score', 0);
  const [playing, setPlaying] = useState(false);

  // refs
  const timeRef: { current: any } = useRef(global.START_TIME);
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    timeRef.current = time;
  });

  // show random set of moles each second
  const addMolesToBoard = useCallback(() => {
    setGameBoard((prevState: boolean[]) => {
      const tempGameBoard = [...prevState];

      // get random number of moles 1-5
      const numberOfMoles = getRandomNumber(6);

      // get vacant cells
      const emptyHomes = tempGameBoard.reduce<number[]>(
        (a, b, index) => (!b ? a.concat(index) : a),
        []
      );

      // fill random cells with random number of moles
      const newMolesByIndex = emptyHomes
        .sort(() => 0.5 - Math.random())
        .slice(0, numberOfMoles);

      newMolesByIndex.forEach((item) => {
        tempGameBoard[item] = true;
      });
      return tempGameBoard;
    });
  }, [setGameBoard]);

  // remove a mole from game board
  const removeMole = useCallback(
    (index) => {
      setGameBoard((prevState: boolean[]) => {
        const tempGameBoard = [...prevState];
        tempGameBoard[index] = false;
        return tempGameBoard;
      });
    },
    [setGameBoard]
  );

  // click handler to start game
  const startTimer = useCallback(() => {
    setPlaying(true);
    addMolesToBoard();
    timerRef.current = setInterval(() => {
      addMolesToBoard();
      setTime(timeRef.current - 1);
    }, 1000);
  }, [addMolesToBoard]);

  // click handler to reset game once it ends
  const resetGame = useCallback(() => {
    setTime(global.START_TIME);
    setGameBoard(new Array(global.BOARDGAME_CELLS).fill(false));
    setScore(0);
  }, [setTime, setGameBoard, setScore]);

  // when time is done, end game
  useEffect(() => {
    if (time <= global.END_TIME) {
      setPlaying(false);
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [time, setPlaying]);

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
          className={`game-board ${!playing && 'game-finished'}`}
          data-testid="game-board"
        >
          <span className="top left"></span>
          <span className="top right"></span>
          <span className="bottom left"></span>

          {gameBoard.map((moleIsPresent: boolean, index: number) => (
            <div className="mole-home" key={index}>
              {moleIsPresent && (
                <Mole
                  removeMole={removeMole}
                  index={index}
                  setScore={setScore}
                  playing={playing}
                />
              )}
            </div>
          ))}
        </section>

        <section className="game-buttons">
          {time === global.END_TIME ? (
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
