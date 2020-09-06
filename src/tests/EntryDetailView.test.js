import React from 'react';
import { render } from '@testing-library/react';

import { EntryDetailView } from '../components/EntryDetailView';

describe('EntryDetailView', () => {
  let container;

  beforeEach(() => {
    const entry = {
      color: 777777,
      created_at: '202009052134',
      noteContent: 'test note',
    }
    container = render(<EntryDetailView entry={entry} />).container;
  });

  it('renders', () => {
    expect(container.querySelector('.entryDetailView')).toBeTruthy();
  });

  it('has the entry date', () => {
    expect(container.querySelector('.entryDate')).toBeTruthy();
  });

  it('has the entry color', () => {
    expect(container.querySelector('.entryColor')).toBeTruthy();
  });

  it('displays a note if one exists', () => {
    expect(container.querySelector('.noteContent')).toBeTruthy();
  });

  it('does not display a note if one doesn\'t exist', () => {
    const entryWithoutNote = {
      color: 555555,
      created_at: '202009052135',
    };
    const container2 = render(<EntryDetailView entry={entryWithoutNote} />).container;
    expect(container2.querySelector('.noteContent')).not.toBeTruthy();
  });

  it('displays the close button', () => {
    expect(container.querySelector('.closeBtn')).toBeTruthy();
  });
});
