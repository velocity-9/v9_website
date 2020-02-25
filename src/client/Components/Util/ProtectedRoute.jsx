import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        {
          ...rest.isAuthenticated ? (
            <Component
              isAuthenticated={rest.isAuthenticated}
              username={rest.username}
              {...props}
            />
          ) : (<Redirect to="/" />)
        }
      )}
    />
  );
}
