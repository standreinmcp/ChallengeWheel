import {StyleSheet} from 'react-native';
import {metrics, colors} from '../../themes/';

export default StyleSheet.create({
  container: {
    height: metrics.size50,
    backgroundColor: colors.redOrange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: metrics.size25,
    width: '80%',
  },
  textStyle: {
    color: colors.white,
    fontSize: metrics.size14,
    fontWeight: 'bold',
  },
});
