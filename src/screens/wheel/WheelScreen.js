import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {connect} from 'react-redux';
import {PieChart} from 'react-native-svg-charts';
import {REQUEST_WORKERS} from './redux';
import {strings} from '../../core/constants';
import {wheelScreenStyles} from './styles';
import {RoundedButton, PieLabel} from '../../core/components';
import {arrow, metrics} from '../../core/themes';
import {workers, data} from '../../core/constants';

const WheelScreen = () => {
  const spinValue = new Animated.Value(0);

  var toValue = metrics.size0;

  const findOutPress = () => {
    Animated.timing(spinValue, {
      toValue: toValue + metrics.size1,
      duration: metrics.size1000,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start(() => {
      toValue = toValue + metrics.size1;
      Animated.timing(spinValue, {
        toValue: toValue + metrics.size1,
        duration: metrics.size2000,
        easing: Easing.out(Easing.circle),
        useNativeDriver: true,
      }).start();
      toValue = toValue + metrics.size3;
    });
  };

  const randomSpin = () => {
    const randomNumber =
      Math.floor(Math.random() * (metrics.size3600 - metrics.size360)) +
      metrics.size3600;
    return `${randomNumber.toString() + 'deg'}`;
  };

  const spin = {
    transform: [
      {
        rotate: spinValue.interpolate({
          inputRange: [
            toValue,
            toValue + metrics.size1,
            toValue + metrics.size2,
          ],
          outputRange: [
            strings.startingPoint,
            strings.fullCircleSpin,
            randomSpin(),
          ],
        }),
      },
    ],
  };

  return (
    <ScrollView
      style={wheelScreenStyles.container}
      contentContainerStyle={wheelScreenStyles.contentContainer}>
      <View style={wheelScreenStyles.circleContainer}>
        <Animated.Image
          source={arrow}
          style={[wheelScreenStyles.arrowImage, spin]}
        />
      </View>
      <PieChart
        style={wheelScreenStyles.pieChart}
        valueAccessor={({item}) => item.amount}
        data={data}
        spacing={metrics.size0}
        outerRadius={'95%'}>
        <PieLabel />
      </PieChart>
      <View style={wheelScreenStyles.bottomContainer}>
        <RoundedButton
          text={strings.buttonText}
          onPress={() => findOutPress()}
        />
        <TouchableOpacity style={wheelScreenStyles.listButtonContainer}>
          <Text style={wheelScreenStyles.listButtonText}>
            {strings.listText}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => ({
  requestWorkers: () => dispatch({type: REQUEST_WORKERS}),
});

export default connect(null, mapDispatchToProps)(WheelScreen);
