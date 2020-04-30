import React, { useState } from 'react';

import { AppView, appViewType } from '../AppView';
import { Slider } from '../Slider';

import styles from './styles.module.css';

import GradientGenerator from '../../utils/GradientGenerator/GradientGenerator';

export const SentimentCaptureView = () => {
  const colors = GradientGenerator.generate('#E3D483', '#00BFD9', 100);
  const startColor = Math.round(colors.length/2);
  const [ currentColor, setCurrentColor ] = useState(colors[startColor]);

  const handleSliderChange = (e) => {
    setCurrentColor(colors[e.target.value]);
    console.log(`color[${e.target.value}]: ${colors[e.target.value]}`);
  }

  return (
    <AppView
      className={ styles.sentimentCaptureView }
      style={{ backgroundColor: `${currentColor}` }}
      type={ appViewType.fullBleed }
    >
      <Slider
        colors={ colors }
        onChange={ handleSliderChange }
        min='0'
        max='99'
        step='1'
      />
    </AppView>
  );
}
