import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = configureStore({ reducer: moviesApp });

// Main component (will eventually use all the others)
class MoviesApplication extends React.Component {
  render() {
    return (
			<Provider store={store}>
				<Container>
					<MainView />
				</Container>
			</Provider>
		);
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
// ReactDom.render(React.createElement(MoviesApplication), container);

const root = createRoot(container);
root.render(<MoviesApplication />);
