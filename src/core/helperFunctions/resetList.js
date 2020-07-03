import { workers, data } from '../constants';
import { metrics, colors } from '../themes';

export const resetList = () => {
  for (let index = 0; index < workers.data.length; index++) {
    workers.data[index] = {
      name: workers.data[index].name,
      age: workers.data[index].age,
      doneShifts: 0,
      lastSelected: null,
    };
  }
  for (let index = 0; index < data.length; index++) {
    data[index] = {
      key: data[index].key,
      amount: metrics.size50,
      svg: { fill: colors.redOrange },
    };
  }
};
