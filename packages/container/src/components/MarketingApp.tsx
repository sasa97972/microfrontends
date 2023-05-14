// Utils
import React, { useEffect, useRef, memo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Modules Federation
import { mount } from 'marketing/MarketingApp';

function MarketingApp() {
  const location = useLocation();
  const navigate = useNavigate();

  const marketingRoot = useRef<null | HTMLDivElement>(null);
  const [navigateCallback, setNavigateCallback] = useState<undefined | ((path: string) => void)>(undefined);

  useEffect(() => {
    const data = mount(marketingRoot.current, {
      onNavigate: (path: string) => {
        if (location.pathname !== path) {
          navigate(path);
        }
      },
    });
    const { onParentNavigate } = data || {};
    setNavigateCallback(() => onParentNavigate);
  }, [marketingRoot]);

  useEffect(() => {
    typeof navigateCallback === 'function' && navigateCallback(location.pathname);
  }, [location, navigateCallback]);

  return <div ref={marketingRoot} />;
}

const MarketingMemoized = memo(MarketingApp);

export default MarketingMemoized;
