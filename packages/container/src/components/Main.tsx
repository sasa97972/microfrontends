// Utils
import React, { useCallback, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Contexts
import { AuthContext } from '../contexts/authContext';

// Components
import Header from './Header';

export default function Main() {
  const { isSignedIn, signOut } = useContext(AuthContext);

  const onSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <div>
      <Header
        isSignedIn={isSignedIn}
        onSignOut={onSignOut}
      />
      <Outlet />
    </div>
  );
}
