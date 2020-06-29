import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...props }) => {
  function getAuthStatus() {
    const accessToken = localStorage.getItem('access');
    if (accessToken !== null) {
      return true;
    }
    return false;
  }

  return (
    <Route>
      {
          getAuthStatus()
            ? (
              <>
                <Component { ...props } />
              </>
            )
            : <Redirect to="/login" />
      }
    </Route>
  )
}
