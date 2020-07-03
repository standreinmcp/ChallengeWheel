import { metrics } from '../themes';
import { workers } from '../constants';
import { calculateValidWorkers } from '.';

export const randomSpin = () => {
  let randomNumber = Math.ceil(Math.random() * metrics.size360);
  var validWorkers = calculateValidWorkers();
  const winnerIndex = validWorkers[Math.floor(Math.random() * validWorkers.length)];
  randomNumber = Math.ceil(Math.random() * 36) + winnerIndex * 36;
  randomNumber += 3600;
  return {
    random: `${randomNumber.toString() + 'deg'}`,
    winnerIndex: winnerIndex,
    spin: validWorkers.length !== 0,
  };
};
