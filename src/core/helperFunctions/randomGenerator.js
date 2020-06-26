import {metrics} from '../themes';
import {workers} from '../constants';

export const randomSpin = () => {
  const randomNumber = Math.ceil(Math.random() * metrics.size360);
  var valids = [2, 3, 6];
  var result = randomNumber;
  //   const winnerIndex = Math.floor(result / (360 / workers.data.length)) % 10;
  const winnerIndex = valids[Math.floor(Math.random() * valids.length)];
  result = Math.ceil(Math.random() * 36) + winnerIndex * 36;
  result += 3600;
  return {random: `${result.toString() + 'deg'}`, winnerIndex: winnerIndex};
};
