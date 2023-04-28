// utils
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

const router = createBrowserRouter([
	{
		element: (
			<div>
				<Header
					signedIn={false}
					onSignOut={() => {
						console.log('Signed out!');
					}}
				/>
				<MarketingApp />
			</div>
		),
		path: '/*',
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
