import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {REQUEST_WORKERS} from './redux';
import {strings} from '../../core/constants';
import {wheelScreenStyles} from './styles';
import {RoundedButton} from '../../core/components';
import {arrow} from '../../core/themes';

const WheelScreen = () => {
  return (
    <ScrollView
      style={wheelScreenStyles.container}
      contentContainerStyle={wheelScreenStyles.contentContainer}>
      <View style={wheelScreenStyles.circleContainer}>
        <Image source={arrow} style={wheelScreenStyles.arrowImage} />
      </View>
      <View style={wheelScreenStyles.bottomContainer}>
        <RoundedButton text={strings.buttonText} />
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
