import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

import * as api from '../api';
import { SentimentListView } from '../components/SentimentListView';

jest.mock('../api', () => ({
  ...jest.requireActual('../api'),
  getEntriesForUser: jest.fn(() => ([
    {
      id: 2,
      user_id: 1,
      color: "58af74",
      sentiment: 68,
      date: "2020-08-30T03:07:03.490Z",
      created_at: "2020-08-30T03:07:03.490Z",
      updated_at: "2020-08-30T03:07:03.490Z",
      note_id: null,
      note_content: null
    },
    {
      id: 1,
      user_id: 1,
      color: "58af74",
      sentiment: 68,
      date: "2020-08-29T02:24:23.464Z",
      created_at: "2020-08-29T02:24:23.464Z",
      updated_at: "2020-08-29T02:24:23.464Z",
      note_id: null,
      note_content: null
    }
  ])),
}));

describe('SentimentListView', () => {
  let container = null;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      render(<SentimentListView />, container);
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders', () => {
    expect(container.querySelector('.sentimentListView')).toBeDefined();
  });

  it('renders entries', () => {
    const sentimentListViewWrapper = container.querySelector('.sentimentListViewWrapper');
    const sentimentListItems = sentimentListViewWrapper.querySelector('.sentimentListItem').children;
    expect(sentimentListViewWrapper).not.toBeNull();
    expect(sentimentListItems.length).toBe(2);
  });

  it('renders the log entry CTA', () => {
    const logSentimentCtaBtn = container.querySelector('.logSentimentCtaBtn');
    expect(logSentimentCtaBtn).not.toBeNull();
  });
});
