import {StyleSheet} from 'react-native';
import {metrics, colors} from '../../../core/themes';

export default StyleSheet.create({
  container: {
    flex: metrics.size1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: metrics.size1,
    alignItems: 'center',
  },

  circleContainer: {
    marginTop: metrics.size25,
    justifyContent: 'center',
    alignItems: 'center',
    height: metrics.size300,
    width: metrics.size300,
    borderRadius: metrics.size300 / 2,
  },

  bottomContainer: {
    width: '100%',
    flex: metrics.size1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: metrics.size50,
  },

  listButtonContainer: {
    marginTop: metrics.size25,
  },

  listButtonText: {
    fontSize: metrics.size15,
    color: colors.redOrange,
    letterSpacing: metrics.size0_5,
  },

  arrowImage: {
    height: metrics.size200,
    width: metrics.size200,
    zIndex: metrics.size20,
  },
  pieChart: {
    position: 'absolute',
    height: metrics.size300,
    width: metrics.size300,
  },
});
