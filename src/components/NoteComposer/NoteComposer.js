import React from 'react';
import styles from './styles.module.css';

function NoteComposer({ value, onChange }) {
  const placeholder = 'Jot down your thoughts';

  return(
    <div className={ styles.noteComposer }>
      <textarea 
        className={ styles.noteComposerEntry }
        placeholder = { placeholder }
        onChange = { (e) => onChange(e.target.value) }
        value = { value }
      />
    </div>
  );
}

export { 
  NoteComposer,
};
