import React from 'react';
import styles from './styles.module.css';

export const Slider = ({ colors, onChange, ...props }) => {
  return (
    <div className={ styles.sliderWrapper } >
      <input className={ styles.slider }
        onChange={ onChange }
        type="range"
        { ...props }
      />
    </div>
  );
}
