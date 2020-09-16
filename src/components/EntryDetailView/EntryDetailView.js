import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';
import styles from './styles.module.css';
import moment from 'moment';

export const EntryDetailView = (props) => {
  const history = useHistory();
  const entry = props.location.state.entry;
  const dayOfWeek = moment(entry.created_at).format('dddd');
  const date = moment(entry.created_at).format('MMM Do, YYYY');

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
