import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NoteComposer } from '../components/NoteComposer';

describe('NoteComposer', () => {
  let container;

  it('renders', () => {
    const { container } = render(<NoteComposer />);
    expect(container.querySelector('.noteComposer')).toBeTruthy();
  });

  it('has a placeholder', () => {
    const { container } = render(<NoteComposer />);
    const placeholder = 'Jot down your thoughts';
    expect(container.querySelector('.noteComposer textarea').placeholder).toBe(placeholder);
  });

  it('updates a given value on change' , () => {
    let value = '';
    const setValue = (newVal) => value = newVal;
    const { container } = render(
      <NoteComposer value={ value } onChange={ setValue } />
    );
    const noteComposer = container.querySelector('.noteComposer');
    const noteComposerTextarea = noteComposer.querySelector('textarea');
    expect(noteComposerTextarea.value).toBe('');
    userEvent.type(noteComposerTextarea, 'end');
    expect(value).toBe('end');
  });

  it('uses provided value', () => {
    const value = 'test';
    const { container } = render(<NoteComposer value={ value } />);
    const noteComposer = container.querySelector('.noteComposer textarea');
    expect(noteComposer).toHaveValue(value);
  });
});
