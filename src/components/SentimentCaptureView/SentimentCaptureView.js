import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';
import { Slider } from '../Slider';
import styles from './styles.module.css';
import GradientGenerator from '../../utils/GradientGenerator/GradientGenerator';
import { api } from '../../api';

export const SentimentCaptureView = () => {
  const colors = GradientGenerator.generate('#E0AF30', '#40AD7E', 100);
  const startIndex = Math.round(colors.length / 2);
  const [ currentColor, setCurrentColor ] = useState(colors[startIndex]);
  const [ sliderPosition, setSliderPosition ] = useState(startIndex);
  const history = useHistory();
  const currentDate = moment().format('dddd, MMMM Do');

  const handleSliderChange = (e) => {
    console.log(`color[${sliderPosition}]: ${currentColor}`);
    setCurrentColor(colors[e.target.value]);
    setSliderPosition(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    api.logEntryForUser({ entry: {
      sentiment: sliderPosition,
      color: currentColor.split('#')[1],
    }})
      .then(res => {
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  const handleClose = (e) => {
    e.preventDefault();
    history.push('/');
  }

  return (
    <AppView
      className={ styles.sentimentCaptureView }
      style={{ backgroundColor: `${currentColor}` }}
      type={ appViewType.fullBleed }
    >

      <p className={ styles.currentDate }>{ currentDate }</p>
      <div className={ styles.greeting }>
        <p className={ styles.greetingBigText }>Hey</p>
        <p className={ styles.greetingMedText }>How was your day?</p>
      </div>

      <div>
        <ContentCard className={ styles.contentCard }>
          <Slider
            onChange={ handleSliderChange }
            min='0'
            max={ colors.length - 1 }
            step='1'
          />

          <div className={ styles.ctaWrapper }>
            <button
              className={ styles.ctaSecondary }
              style={{ 
                borderColor: `${currentColor}`,
                color: `${currentColor}`
              }}
              onClick={ () => console.log('add note pressed')}
            >
              Add note
            </button>
            <button
              className={ styles.ctaPrimary }
              style={{ backgroundColor: `${currentColor}` }}
              onClick={ handleSubmit }
            >
              Done
            </button>
          </div>
          <div className={ styles.ctaWrapper }>
            <button
              className={ styles.closeCta }
              onClick={ handleClose }
            >
              Close
            </button>
          </div>
        </ContentCard>
      </div>
    </AppView>
  );
}
