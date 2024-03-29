// Utils
import React, { useEffect, useRef, memo, useState, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Modules Federation
import { mount } from 'auth/AuthApp';

// Contexts
import { AuthContext } from '../contexts/authContext';

function AuthApp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

  const onSignIn = useCallback(() => {
    signIn();
    navigate('/dashboard');
  }, [signIn]);

  const authRoot = useRef<null | HTMLDivElement>(null);
  const [navigateCallback, setNavigateCallback] = useState<undefined | ((path: string) => void)>(undefined);

  useEffect(() => {
    const data = mount(authRoot.current, {
      onNavigate: (path: string) => {
        if (location.pathname !== path) {
          navigate(path);
        }
      },
      initialPath: location.pathname,
      onSignIn,
    });
    const { onParentNavigate } = data || {};
    setNavigateCallback(() => onParentNavigate);
  }, [authRoot]);

  useEffect(() => {
    typeof navigateCallback === 'function' && navigateCallback(location.pathname);
  }, [location.pathname, navigateCallback]);

  return <div ref={authRoot} />;
}

const AuthMemoized = memo(AuthApp);

export default AuthMemoized;
