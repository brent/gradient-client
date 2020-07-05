import React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './styles.module.css';

export const appViewType = {
  fullBleed: 'fullBleed',
  borderless: 'borderless',
}

const CoreAppView = ({ children, ...props }) => (
  <div { ...props } className={ `${styles.appView} ${props.className}` }>
    { children }
  </div>
)

const FullBleedAppView = ({ children, ...props }) => (
  <CoreAppView { ...props }>
    { children }
  </CoreAppView>
)

const BorderlessAppView = ({ children, ...props }) => {
  return (
    <CoreAppView
      { ...props }
      className={ `${props.className} ${styles.borderless}` }
    >
      <Header />
      { children }
      <Footer />
    </CoreAppView>
  );
};

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
    case appViewType.borderless:
      view = <BorderlessAppView { ...props } />;
      break;
    default:
      view = <DefaultAppView { ...props } />;
  }

  return view;
}
