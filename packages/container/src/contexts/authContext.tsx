import React, { createContext, ReactElement, useCallback, useMemo, useState } from 'react';

interface AuthContext {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContext>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

interface AuthContextProviderProps {
  children: ReactElement;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = useCallback(() => {
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
  }, []);

  const contextValue = useMemo<AuthContext>(() => ({
    isSignedIn,
    signIn,
    signOut
  }), [isSignedIn, signIn, signOut]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
