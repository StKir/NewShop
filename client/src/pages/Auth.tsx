import React from 'react';
import { useAppDispatch } from '../store/store';
import { changeAuth } from '../store/authSlice';
import { Link } from 'react-router-dom';

function Auth() {
	const dispatch = useAppDispatch();

	return (
		<div>
			<button onClick={() => dispatch(changeAuth())}>click</button>
			<Link to={`/admin`}>click</Link>
		</div>
	);
}

export default Auth;
