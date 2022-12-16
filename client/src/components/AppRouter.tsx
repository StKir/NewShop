import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useAppSelector } from '../store/store';
import { checkAuth } from '../store/authSlice';

function AppRouter() {
	const isAuth = useAppSelector(checkAuth);
	return (
		<Suspense>
			<Routes>
				{isAuth &&
					authRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			</Routes>
		</Suspense>
	);
}

export default AppRouter;
