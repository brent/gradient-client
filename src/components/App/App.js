import React from 'react';
import styles from './styles.module.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { SentimentCaptureView } from '../SentimentCaptureView';
import { SentimentListView } from '../SentimentListView';
import { LoginView } from '../LoginView';
import { LogoutView } from '../LogoutView';

export const App = () => {
  return (
    <div className={ styles.app } >
      <Router>
        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>

          <Route path="/logout">
            <LogoutView />
          </Route>

          <Route path="/create">
            <SentimentCaptureView />
          </Route>

          <Route path="/">
            <SentimentListView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
