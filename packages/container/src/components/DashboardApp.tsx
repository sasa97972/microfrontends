// Utils
import React, { useEffect, useRef, memo, useState, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Modules Federation
import { mount } from 'dashboard/DashboardApp';

// Contexts
import { AuthContext } from '../contexts/authContext';

function DashboardApp() {
  const navigate = useNavigate();
  const { isSignedIn } = useContext(AuthContext);

  const dashboardRoot = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
      return;
    }

    mount(dashboardRoot.current);
  }, [dashboardRoot.current, isSignedIn]);

  return <div ref={dashboardRoot} />;
}

export default memo(DashboardApp);
