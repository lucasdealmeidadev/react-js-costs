import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Company, NewProject, Contact } from './components/pages';
import { Container } from './layout';

function App() {
	return (
		<Router>
			<ul>
				<li>Home</li>
				<li>Contato</li>
			</ul>
			<Container customClass='min-height'>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/company' element={<Company />} />
					<Route path='/new-project' element={<NewProject />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
