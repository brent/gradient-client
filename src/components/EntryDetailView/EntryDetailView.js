import React from 'react';
import { AppView, appViewType } from '../AppView';
import { ContentCard } from '../ContentCard';

export const EntryDetailView = ({ entry }) => {
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
          entry.noteContent ? (
            <p
              className='noteContent'
              dangerouslySetInnerHTML={{ __html: entry.noteContent }}
            />
          ) : null
        }
      </ContentCard>
      <button
        className='closeBtn'
        style={{ backgroundColor: `#${entry.color}` }}
      >
        Close
      </button>
    </AppView>
  );
}
