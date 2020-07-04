import { fetchEmployees } from '.';

export const calculateValidWorkers = () =>
  fetchEmployees().then((workers) => {
    const validWorkersIndex = [];
    for (let index = 0; index < workers.data.length; index++) {
      if (workers.data[index].doneShifts < 2) {
        if (workers.data[index].lastSelected !== 0) {
          let currentDate = Date.now();
          let lastDay = 1000 * 60 * 60 * 24;
          if (currentDate - lastDay > workers.data[index].lastSelected) {
            validWorkersIndex.push(index);
          }
        } else {
          validWorkersIndex.push(index);
        }
      }
    }
    return validWorkersIndex;
  });
