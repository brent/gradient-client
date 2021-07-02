import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';
import { LineChart } from '../LineChart';
import styles from './styles.module.css';
import moment from 'moment';
import * as api from '../../api';
import { getDensityValues } from '../../utils/ChartHelpers';

export const EntryDetailView = (props) => {
  const history = useHistory();
  const entry = props.location.state.entry;
  const [insights, setInsights] = useState(null);
  const [allDaysChartData, setAllDaysChartData] = useState(null);
  const [yearChartData, setYearChartData] = useState(null);
  const [monthChartData, setMonthChartData] = useState(null);
  const dayOfWeek = moment(entry.date).format('dddd');
  const date = moment(entry.date).format('MMM Do, YYYY');

  useEffect(() => {
    api.getEntryForUser(entry.id)
      .then(res => {
        console.log('res', res);
        return res.insights
      })
      .then(insights => setInsights(insights))
  }, []);

  useEffect(() => {
    if (insights) {
      let allDaysSentiments = insights.allSentiment.map(entry => entry.sentiment);
      const allDaysDensity = getDensityValues(allDaysSentiments);
      setAllDaysChartData({
        labels: [...allDaysDensity.map(d => `${d[0]}`)],
        datasets: [
          {
            data: [...allDaysDensity.map(d => `${d[1]}`)],
            fill: true,
            backgroundColor: 'rgba(255,255,255,0.33)',
            borderColor: 'rgb(255,255,255)',
            tension: 0.33,
          },
        ],
      });

      const entriesInYear = getEntriesInYear(insights.allSentiment);
      const yearSentiments = entriesInYear.map(entry => entry.sentiment);
      const yearDensity = getDensityValues(yearSentiments);
      setYearChartData({
        labels: [...yearDensity.map(d => `${d[0]}`)],
        datasets: [
          {
            data: [...yearDensity.map(d => `${d[1]}`)],
            fill: true,
            backgroundColor: 'rgba(255,255,255,0.33)',
            borderColor: 'rgb(255,255,255)',
            tension: 0.33,
          },
        ],
      });

      const entriesInMonth = getEntriesInMonth(insights.allSentiment);
      const monthSentiments = entriesInMonth.map(entry => entry.sentiment);
      const monthDensity = getDensityValues(monthSentiments);
      setMonthChartData({
        labels: [...monthDensity.map(d => `${d[0]}`)],
        datasets: [
          {
            data: [...monthDensity.map(d => `${d[1]}`)],
            fill: true,
            backgroundColor: 'rgba(255,255,255,0.33)',
            borderColor: 'rgb(255,255,255)',
            tension: 0.33,
          },
        ],
      });
    }
  }, [insights]);

  const getEntriesInYear = (entries) => {
    const year = moment(entry.date).year();
    const entriesInYear = entries.filter((entry) => moment(entry.date).year() === year);
    return entriesInYear;
  };

  const getEntriesInMonth = (entries) => {
    const month = moment(entry.date).month();
    const entriesInMonth = entries.filter((entry) => moment(entry.date).month() === month);
    return entriesInMonth;
  };

  const handleCloseBtnPress = (e) => {
    e.preventDefault();
    history.goBack();
  }

  return (
    <AppView
      className={ styles.entryDetailView }
      style={{ backgroundColor: `#${entry.color}` }}
      type={ appViewType.fullBleed }
    >
      <div className={ styles.entryMetadata }>
        <p className={ styles.entryDate }>{ date }</p>
        <p className={ styles.entryDay }>{ dayOfWeek }</p>
        <p className={ styles.entryColor }>#{ entry.color }</p>
        <LineChart
          data={monthChartData}
          annotation={entry.sentiment}
          label={`TODAY vs ${moment(entry.date).format('MMMM')}`}
        />
        <LineChart
          data={yearChartData}
          annotation={entry.sentiment}
          label={`TODAY vs ${moment(entry.date).format('YYYY')}`}
        />
        <LineChart 
          data={allDaysChartData}
          annotation={entry.sentiment}
          label='TODAY vs ALL DAYS'
        />
      </div>
      <ContentCard className={ styles.noteContentWrapper }>
        {
          entry.note_content ? (
            <p className={ styles.noteContent } >
              { entry.note_content }
            </p>
          ) : null
        }
        <button
          className={ styles.closeBtn }
          style={{ backgroundColor: `#${entry.color}` }}
          onClick={ handleCloseBtnPress }
        >
          Close
        </button>
      </ContentCard>
    </AppView>
  );
}
