import React from 'react';
import {ClipPath, Image, Defs, G, Circle} from 'react-native-svg';
import {metrics, colors, linkedInImage} from '../themes';
import {workers} from '../constants/';

const PieLabel = ({slices, height, width}) => {
  return slices.map((slice, index) => {
    const {labelCentroid} = slice;
    return (
      <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
        <Defs>
          <ClipPath id="clip">
            <Circle r={metrics.size20} />
          </ClipPath>
        </Defs>
        <Image
          x={-metrics.size20}
          y={-metrics.size20}
          width={metrics.size40}
          height={metrics.size40}
          preserveAspectRatio="xMidYMid slice"
          opacity="1"
          href={linkedInImage}
          clipPath="url(#clip)"
        />
      </G>
    );
  });
};

export default PieLabel;
