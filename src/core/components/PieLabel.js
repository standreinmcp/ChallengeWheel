import React from 'react';
import {Circle, G, Image} from 'react-native-svg';
import {linkedInImage} from '../themes';

const PieLabel = ({slices, height, width}) => {
  return slices.map((slice, index) => {
    const {labelCentroid, pieCentroid, data} = slice;
    return (
      <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
        <Circle r={18} fill={'white'} />
        <Image
          x={-10}
          y={-10}
          width={30}
          height={30}
          preserveAspectRatio="xMidYMid slice"
          opacity="1"
          href={linkedInImage}
        />
      </G>
    );
  });
};

export default PieLabel;
