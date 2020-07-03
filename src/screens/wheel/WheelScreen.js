import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { PieChart } from 'react-native-svg-charts';
import { UPDATE_WORKERS_WATCHER, REQUEST_WORKERS_WATCHER } from './redux';
import { wheelScreenStyles } from './styles';
import { RoundedButton, PieLabel } from '../../core/components';
import { arrow, metrics, colors } from '../../core/themes';
import { data, strings } from '../../core/constants';
import { randomSpin, resetList } from '../../core/helperFunctions';
import firestore from '@react-native-firebase/firestore';

const WheelScreen = ({ requestWorkers, workersStore, updateWorkers }) => {
  const spinValue = new Animated.Value(0);
  var toValue = metrics.size0;
  const [state, setState] = useState(randomSpin());
  const [winner, setWinner] = useState();
  const [workers, setWorkers] = useState(workersStore);

  useEffect(() => {
    const fetchData = async () => {
      const db = firestore();
      const data = await db.collection('employees').get();
      console.log(data);
    };
    fetchData();
  }, []);

  const animation = () => {
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
      }).start(() => {
        setWinner(state.winnerIndex);
        var updatedWorkers = JSON.parse(JSON.stringify(workers));
        updatedWorkers.data[state.winnerIndex].lastSelected = Date.now();
        updatedWorkers.data[state.winnerIndex].doneShifts += 1;
        console.log(updatedWorkers, 'updated');
        updateWorkers(updatedWorkers);
        setState(randomSpin());
      });
      toValue = toValue + metrics.size3;
      data[state.winnerIndex].svg.fill = colors.shuttleGrey;
    });
  };

  const spin = {
    transform: [
      {
        rotate: spinValue.interpolate({
          inputRange: [toValue, toValue + metrics.size1, toValue + metrics.size2],
          outputRange: [strings.startingPoint, strings.fullCircleSpin, state.random !== 'NaNdeg' ? state.random : '3601deg'],
        }),
      },
    ],
  };

  return (
    <ScrollView style={wheelScreenStyles.container} contentContainerStyle={wheelScreenStyles.contentContainer}>
      <View style={wheelScreenStyles.circleContainer}>
        <PieChart style={wheelScreenStyles.pieChart} valueAccessor={({ item }) => item.amount} data={data}>
          <PieLabel />
        </PieChart>
        <Animated.Image source={arrow} style={[wheelScreenStyles.arrowImage, spin]} />
      </View>
      {!!winner && (
        <View style={wheelScreenStyles.winnerContainer}>
          <Text>{`${workers.data[winner].name}`}</Text>
        </View>
      )}
      <View style={wheelScreenStyles.bottomContainer}>
        <RoundedButton
          text={strings.buttonText}
          onPress={() => {
            if (state.spin !== false) {
              animation();
            }
          }}
        />
        <TouchableOpacity style={wheelScreenStyles.listButtonContainer} onPress={() => resetList()}>
          <Text style={wheelScreenStyles.listButtonText}>{strings.resetList}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { workersStore } = state.worker.workersReducer;
  return { workersStore };
};

const mapDispatchToProps = (dispatch) => ({
  requestWorkers: () => dispatch({ type: REQUEST_WORKERS_WATCHER }),
  updateWorkers: (updatedWorkers) => dispatch({ type: UPDATE_WORKERS_WATCHER, payload: updatedWorkers }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WheelScreen);
