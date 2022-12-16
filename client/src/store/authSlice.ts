import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

const authAdapter = createEntityAdapter<boolean>();

type authAdapterType = {
	isAuth: boolean
	_user: any
}

const initialState = {
	isAuth: false,
	_user: {}
} as authAdapterType

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeAuth: (state) => {
			state.isAuth = !state.isAuth;
		},
		getUser: (state, {payload} : PayloadAction<any>) => {
			state._user = payload
		}
    }});

const { reducer, actions } = authSlice;

export const checkAuth = (state: RootState) => state.auth.isAuth

export default reducer;

export const {
	changeAuth,
	getUser
} = actions;