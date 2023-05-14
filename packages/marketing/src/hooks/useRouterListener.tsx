import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseRouterListenerProps {
  onNavigate?: (path: string) => void
}

export default function useRouterListener({ onNavigate }: UseRouterListenerProps) {
  const location = useLocation();

  useEffect(() => {
    typeof onNavigate === 'function' && onNavigate(location.pathname);
  }, [location, onNavigate]);
}
