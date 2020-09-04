import React from 'react';

function NoteComposer({ value, onChange }) {
  const placeholder = 'Jot down your thoughts';

  return(
    <div className='noteComposer'>
      <textarea 
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
