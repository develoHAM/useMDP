import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import PlannerPage from '../pages/PlannerPage';
import App from '../App';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: 'home',
				element: <HomePage />,
			},
			{
				path: 'mypage',
				element: <MyPage />,
			},
		],
	},
	{
		path: '/planner',
		element: <PlannerPage />
	}
]);

export default Router;
