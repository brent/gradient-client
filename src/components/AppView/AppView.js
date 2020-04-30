import React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './styles.module.css';

export const appViewType = {
  fullBleed: 'fullBleed',
}

const CoreAppView = ({ children, className, ...props }) => (
  <div className={ `${styles.appView} ${className}` }
    { ...props }
  >
    { children }
  </div>
)

const FullBleedAppView = ({ children, ...props }) => (
  <CoreAppView { ...props }>
    { children }
  </CoreAppView>
)

const DefaultAppView = ({ children, ...props }) => (
  <CoreAppView { ...props }>
    <Header />
    { children }
    <Footer />
  </CoreAppView>
);

export const AppView = ({ type, ...props }) => {
  let view;

  switch (type) {
    case appViewType.fullBleed:
      view = <FullBleedAppView { ...props } />;
      break;
    default:
      view = <DefaultAppView { ...props } />;
  }

  return view;
}
