import { metrics } from '../themes';
import { calculateValidWorkers } from '.';

export const randomSpin = () =>
  calculateValidWorkers().then((validWorkers) => {
    let randomNumber = Math.ceil(Math.random() * metrics.size360);
    let winnerIndex = validWorkers[Math.floor(Math.random() * validWorkers.length)];
    randomNumber = Math.ceil(Math.random() * 36) + winnerIndex * 36;
    randomNumber += 3600;
    return {
      random: `${randomNumber.toString() + 'deg'}`,
      winnerIndex: winnerIndex,
      spin: validWorkers.length !== 0,
    };
  });
