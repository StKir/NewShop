import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Device from './pages/Device';
import Store from './pages/Store';
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	REGISTER_ROUTE,
	SHOP_ROUTE
} from './utils/consts';

interface rout {
	path: string;
	Component: () => JSX.Element;
}

export const authRoutes: rout[] = [
	{
		path: ADMIN_ROUTE,
		Component: Admin
	},
	{
		path: BASKET_ROUTE,
		Component: Basket
	}
];

export const publicRoutes: rout[] = [
	{
		path: SHOP_ROUTE,
		Component: Store
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Component: Device
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth
	},
	{
		path: REGISTER_ROUTE,
		Component: Auth
	}
];
