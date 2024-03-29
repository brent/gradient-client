import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';
import { Slider } from '../Slider';
import { NoteComposer } from '../NoteComposer';
import styles from './styles.module.css';
import GradientGenerator from '../../utils/GradientGenerator/GradientGenerator';
import * as api from '../../api';

export const SentimentCaptureView = () => {
  const colors = GradientGenerator.generate('#E0AF30', '#40AD7E', 100);
  const startIndex = Math.round(colors.length / 2);
  const [currentColor, setCurrentColor] = useState(colors[startIndex]);
  const [sliderPosition, setSliderPosition] = useState(startIndex);
  const [noteVisibility, setNoteVisibility] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const history = useHistory();

  const entryDate = ((date) => {
    const hour = date.get('hour');
    if (hour < 4) {
      return date.set({
        'date': date.get('date') - 1,
        'hour': 10,
        'minute': 0,
        'second': 0,
        'millisecond': 0,
      });
    }
    return date;
  })(moment());
  const currentDate = entryDate.format('dddd, MMMM Do');

  const handleSliderChange = (e) => {
    console.log(`color[${sliderPosition}]: ${currentColor}`);
    setCurrentColor(colors[e.target.value]);
    setSliderPosition(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    api.logEntryForUser({
      entry: {
        sentiment: sliderPosition,
        color: currentColor.split('#')[1],
        date: entryDate.format('YYYY-MM-DD HH:mm:ss'), // 2020-10-08 22:07:28
      },
      noteContent: noteContent,
    })
      .then(res => {
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  const handleClose = (e) => {
    e.preventDefault();
    history.push('/');
  }

  const handleNoteComposerOnChange = (value) => {
    setNoteContent(value);
  }

  const toggleNoteVisibility = (e) => {
    e.preventDefault();
    setNoteVisibility(!noteVisibility);
  }

  return (
    <AppView
      className={ styles.sentimentCaptureView }
      style={{ backgroundColor: `${currentColor}` }}
      type={ appViewType.fullBleed }
    >

      <p className={ styles.currentDate }>{ currentDate }</p>
      {
        !noteVisibility ? (
          <div className={ styles.greeting }>
            <p className={ styles.greetingBigText }>Hey</p>
            <p className={ styles.greetingMedText }>How was your day?</p>
          </div>
        ) : null
      }

      <ContentCard className={ !noteVisibility ? styles.contentCard : styles.contentCard__noteVisible }>
        <Slider
          onChange={ handleSliderChange }
          min='0'
          max={ colors.length - 1 }
          step='1'
        />

        {
          !noteVisibility ? (
            <>
              <div className={ styles.ctaWrapper }>
                <button
                  className={ styles.ctaSecondary }
                  style={{
                    borderColor: `${currentColor}`,
                    color: `${currentColor}`
                  }}
                  onClick={ toggleNoteVisibility }
                >
                  { noteContent === '' ? 'Add note' : 'Edit note' }
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
            </>
          ) : (
            <>
              <NoteComposer
                value={ noteContent }
                onChange= { handleNoteComposerOnChange }
              />
              <div className={ `${styles.ctaWrapper} ${styles.ctaWrapper__noteVisible}` }>
                <button
                  className={ styles.ctaPrimary }
                  style={{ backgroundColor: `${currentColor}` }}
                  onClick={ toggleNoteVisibility }
                >
                  Done
                </button>
              </div>
            </>
          )
        }
      </ContentCard>
    </AppView>
  );
}
