import { workers } from '../constants';

export const calculateValidWorkers = () => {
  const validWorkersIndex = [];
  for (let index = 0; index < workers.data.length; index++) {
    if (workers.data[index].doneShifts < 2) {
      if (workers.data[index].lastSelected !== null) {
        let currentDate = Date.now();
        let lastDay = 1000 * 60 * 60 * 24;
        let currentLastDay = new Date(Date.now() - lastDay);
        if (currentDate - workers.data[index].lastSelected > currentDate - currentLastDay) {
          validWorkersIndex.push(index);
        }
      } else {
        validWorkersIndex.push(index);
      }
    }
  }
  return validWorkersIndex;
};
