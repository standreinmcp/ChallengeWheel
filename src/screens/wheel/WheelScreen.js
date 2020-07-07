import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { PieChart } from 'react-native-svg-charts';
import { UPDATE_WORKERS_WATCHER, RESET_LIST, SET_WORKERS } from './redux';
import { wheelScreenStyles } from './styles';
import { RoundedButton, PieLabel } from '../../core/components';
import { arrow, metrics, colors } from '../../core/themes';
import { data, strings } from '../../core/constants';
import { randomSpin } from '../../core/helperFunctions';
import firestore from '@react-native-firebase/firestore';

const WheelScreen = ({ updateWorkers, workersStore, resetList, setWorkers }) => {
  const spinValue = new Animated.Value(0);
  var toValue = metrics.size0;

  const [state, setState] = useState();
  const [winner, setWinner] = useState();

  useEffect(() => {
    const setValues = async () => {
      const response = await randomSpin();
      setState(response);
    };
    setValues();
  }, []);

  const fetchData = useCallback(async () => {
    const db = firestore();
    const employeesCollection = await db.collection('employees').get();
    const employees = {
      data: [],
    };
    employeesCollection.docs.map((item) => employees.data.push(item._data));
    setWorkers(employees);
  }, []);

  useEffect(() => {
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
      }).start(async () => {
        setWinner(state.winnerIndex);
        updateWorkers(state.winnerIndex);
        const result = await randomSpin();
        setState(result);
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
          outputRange: [
            strings.startingPoint,
            strings.fullCircleSpin,
            state?.random !== 'NaNdeg' ? (state?.random ? state.random : '3601deg') : '3601deg',
          ],
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
                    <Text style={wheelScreenStyles.congratsText}>{strings.congratulations}</Text>
          <Text style={wheelScreenStyles.winnerText}><Text style={wheelScreenStyles.winnerLabel}>{strings.winner}</Text>{`${workersStore.data[winner].name}`}</Text>
        </View>
      )}
      <View style={wheelScreenStyles.bottomContainer}>
        <RoundedButton
          text={strings.buttonText}
          onPress={() => {
            if (state?.spin !== false) {
              animation();
            }
          }}
        />
        <TouchableOpacity
          style={wheelScreenStyles.listButtonContainer}
          onPress={() => {
            resetList();
            fetchData();
            for (let index = 0; index < workersStore.data.length; index++) {
              data[index].svg.fill = colors.redOrange;
            }
            setWinner(null);
          }}>
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
  updateWorkers: (updatedWorkers) => dispatch({ type: UPDATE_WORKERS_WATCHER, payload: updatedWorkers }),
  setWorkers: (workers) => dispatch({ type: SET_WORKERS, payload: workers }),
  resetList: () => dispatch({ type: RESET_LIST }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WheelScreen);
