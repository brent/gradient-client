import React from 'react';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';

export const EntryDetailView = (props) => {
  const entry = props.location.state.entry;
  return (
    <AppView
      className='entryDetailView'
      style={{ backgroundColor: `#${entry.color}` }}
      type={ appViewType.fullBleed }
    >
      <p className='entryDate'>{ entry.created_at }</p>
      <p className='entryColor'>{ entry.color }</p>
      <ContentCard>
        {
          entry.note_content ? (
            <p
              className='noteContent'
              dangerouslySetInnerHTML={{ __html: entry.note_content }}
            />
          ) : null
        }
        <button
          className='closeBtn'
          style={{ backgroundColor: `#${entry.color}` }}
        >
          Close
        </button>
      </ContentCard>
    </AppView>
  );
}
