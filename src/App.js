import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Company, Projects, NewProject, Contact } from './components/pages';
import { NavBar, Container, Footer } from './layout';

function App() {
	return (
		<Router>
			<NavBar />
			<Container customClass='min-height'>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/company' element={<Company />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/new-project' element={<NewProject />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</Container>
			<Footer />
		</Router>
	);
}

export default App;
