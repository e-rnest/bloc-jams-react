import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing'
import Library from './components/Library'
import Album from './components/Album'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<nav>
						<div className="nav-wrapper">
							<span className="logo">Jams</span>
							<div className="nav-links">
								<Link to='/'>Landing</Link>
								<Link to='/library'>Library</Link>
							</div>
						</div>
					</nav>
				</header>
				<main>
					<Route exact path="/" component={Landing} />
					<Route path="/library" component={Library} />
					<Route path="/album/:slug" component={Album} />
				</main>
			</div>
		);
	}
}

export default App;
