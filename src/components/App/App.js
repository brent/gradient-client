import React, { useState } from 'react';
import styles from './styles.module.css';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Slider } from '../Slider';

import GradientGenerator from '../../utils/GradientGenerator/GradientGenerator';

export const App = () => {
  const colors = GradientGenerator.generate('#E3D483', '#00BFD9', 100);
  const startColor = Math.round(colors.length/2);
  const [ currentColor, setCurrentColor ] = useState(colors[startColor]);

  const handleSliderChange = (e) => {
    setCurrentColor(colors[e.target.value]);
    console.log(`color[${e.target.value}]: ${colors[e.target.value]}`);
  }

  return (
    <div className={ styles.app }
      style={{ backgroundColor: `${currentColor}` }}
    >
      <Header />
      <Slider
        colors={ colors }
        onChange={ handleSliderChange }
        min='0'
        max='99'
        step='1'
      />
      <Footer />
    </div>
  );
}
