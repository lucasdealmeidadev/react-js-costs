import { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Company, Projects, Project, NewProject, Contact } from './components/pages';
import { NavBar, Container, Footer } from './components/layout';

function App() {
	return (
		<Router>
			<NavBar />
			<Container customClass='min-height'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/company' element={<Company />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/project/:id' element={<Project />} />
					<Route path='/new-project' element={<NewProject />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</Container>
			<Footer />
		</Router>
	);
}

export default memo(App);
