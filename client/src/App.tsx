import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import HeaderMenu from './components/headerMenu/HeaderMenu';

function App() {
	return (
		<Router>
			<HeaderMenu />
			<div className='App'>
				<AppRouter />
			</div>
		</Router>
	);
}

export default App;
