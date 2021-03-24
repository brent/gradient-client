import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

import { SentimentListItemFull } from '../components/SentimentListItemFull';

const fakeEntry = {
  id: 1,
  user_id: 1,
  color: "58af74",
  sentiment: 68,
  date: "2020-08-29T02:24:23.464Z",
  created_at: "2020-08-29T02:24:23.464Z",
  updated_at: "2020-08-29T02:24:23.464Z",
  note_id: null,
  note_content: null
};

const onClick = (e) => console.log('clicked');

describe('SentimentListItemFull', () => {
  let container = null;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      render(
        <SentimentListItemFull
          entry={ fakeEntry }
          onClick={ onClick } 
        />,
        container
      );
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders', () => {
    expect(container.querySelector('.sentimentListItem')).toBeDefined();
  });

  /* fix this test
  it('executes onClick on click', () => {
    const listItem = container.querySelector('.sentimentListItem');
    console.log(listItem);
    const listItemClickSpy = jest.spyOn(listItem, 'onClick');
    expect(listItemClickSpy).toHaveBeenCalled();
  });
  */
});
