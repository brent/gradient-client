import React from 'react';

import styles from './styles.module.css';

export const ContentCard = ({ children, className, ...props }) => (
  <div className={ `${styles.contentCard} ${className}` } { ...props }>
    { children }
  </div>
)
