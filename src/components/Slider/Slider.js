import React from 'react';
import styles from './styles.module.css';

export const Slider = () => (
  <div className={ styles.sliderWrapper } >
    <input className={ styles.slider } type="range" min="0" max="100" />
  </div>
);
