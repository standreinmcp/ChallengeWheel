import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../core/themes';

export default StyleSheet.create({
  headerTitleStyle: {
    fontSize: metrics.size15,
    letterSpacing: metrics.size0_5,
    color: colors.black,
  },
  headerStyle: {
    shadowColor: 'transparent',
    elevation: metrics.size0,
    shadowOpacity: metrics.size0,
  },
});
