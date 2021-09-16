import moleImage from '../assets/mole.png';
import { useEffect, useState } from 'react';
import { getRandomNumber } from '../utils';

interface MoleProps {
  index: number;
  removeMole: (index: number) => void;
  playing: boolean;
  setScore: (value: number | ((prevScore: number) => number)) => void;
}

function Mole(props: MoleProps) {
  const { index, removeMole, playing, setScore } = props;

  const [moleIsHit, setMoleIsHit] = useState(false);

  // on click, show hit success UI and remove mole
  const handleClick = () => {
    if (playing) {
      setMoleIsHit(true);
      const timer = setTimeout(() => {
        setMoleIsHit(false);
        setScore((prevScore: number) => prevScore + 1);
        removeMole(index);
      }, 300);
      return () => clearTimeout(timer);
    }
  };

  // remove mole after 1-3 seconds
  useEffect(() => {
    if (playing) {
      const duration = getRandomNumber(4) * 1000;
      const timer = setTimeout(() => {
        removeMole(index);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [playing]);

  return (
    <div onClick={handleClick} className={`${moleIsHit && 'hit'}`}>
      <img src={moleImage} alt="Brown mole illustration" />
    </div>
  );
}

export default Mole;
