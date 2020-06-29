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
import { PrivateRoute } from '../PrivateRoute';

export const App = () => {
  return (
    <div className={ styles.app } >
      <Router>
        <Switch>
          <Route path="/login" component={ LoginView } />
          <PrivateRoute path="/logout" component={ LogoutView } />
          <PrivateRoute path="/create" component={ SentimentCaptureView } />
          <PrivateRoute path="/" component={ SentimentListView } />
        </Switch>
      </Router>
    </div>
  );
}
