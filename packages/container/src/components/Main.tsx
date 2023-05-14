// Utils
import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Header from './Header';

export default function Main() {
  return (
    <div>
      <Header
        signedIn={false}
        onSignOut={() => {
          console.log('Signed out!');
        }}
      />
      <Outlet />
    </div>
  );
}
