// Utils
import React, { useEffect, useRef, memo } from 'react';

// Modules Federation
import { mount } from 'marketing/MarketingApp';

function MarketingApp() {
	const marketingRoot = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		mount(marketingRoot.current);
	}, [marketingRoot]);

	return <div ref={marketingRoot} />;
}

const MarketingMemoized = memo(MarketingApp);

export default MarketingMemoized;