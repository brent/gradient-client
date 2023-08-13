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
import { SignUpView } from '../SignUpView';
import { LogoutView } from '../LogoutView';
import { PrivateRoute } from '../PrivateRoute';
import { EntryDetailView } from '../EntryDetailView';
import { MonthDetailView } from '../MonthDetailView';

export const App = () => {
  return (
    <div className={ styles.app } >
      <Router>
        <Switch>
          <Route path="/login" component={ LoginView } />
          <Route path="/signup" component={ SignUpView } />
          <PrivateRoute path="/logout" component={ LogoutView } />
          <PrivateRoute path="/create" component={ SentimentCaptureView } />
          <PrivateRoute path="/entry/:id" component={ EntryDetailView } />
          <PrivateRoute path="/month/:year/:month" component={ MonthDetailView } />
          <PrivateRoute path="/" component={ SentimentListView } />
        </Switch>
      </Router>
    </div>
  );
}
