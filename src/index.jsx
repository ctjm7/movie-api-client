import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MoviesApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MoviesApplication), container);


// After

// const container = document.getElementsByClassName('app-container');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(React.createElement(MoviesApplication);
