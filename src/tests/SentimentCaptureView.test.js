import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

import { SentimentCaptureView } from '../components/SentimentCaptureView';

describe('SentimentCaptureView', () => {
  let container;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      render(<SentimentCaptureView />, container);
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should render', () => {
    expect(container.querySelector('.sentimentCaptureView')).toBeTruthy();
  });

  it('should render the date', () => {
    expect(container.querySelector('.currentDate')).toBeTruthy();
    expect(container.querySelector('.currentDate').textContent)
      .toContain('day');
  });

  it('should render the greeting', () => {
    expect(container.querySelector('.greeting')).toBeTruthy();
    expect(container.querySelector('.greetingBigText').textContent)
      .toContain('Hey');
    expect(container.querySelector('.greetingMedText').textContent)
      .toContain('How was your day?');
  });

  it('should render the slider', () => {
    expect(container.querySelector('.slider')).toBeTruthy();
  });

  it('should render the done button', () => {
    expect(container.querySelector('.ctaPrimary')).toBeTruthy();
  });

  it('should render the add note button', () => {
    expect(container.querySelector('.ctaSecondary')).toBeTruthy();
  });

  it('should render the close button', () => {
    expect(container.querySelector('.closeCta')).toBeTruthy();
  });
});
