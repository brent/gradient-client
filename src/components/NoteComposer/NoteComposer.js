import React, { useState } from 'react';

function NoteComposer({ value }) {
  const placeholder = 'Jot down your thoughts';
  const initialNote = value ? value : '';
  const [note, setNote] = useState(initialNote);

  return(
    <div className='noteComposer'>
      <textarea 
        placeholder = { placeholder }
        onChange = { (e) => setNote(e.target.value) }
        value = { note }
      />
    </div>
  );
}

export { 
  NoteComposer,
};
