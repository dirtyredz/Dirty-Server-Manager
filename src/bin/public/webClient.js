
import React from 'react';
import { render } from 'react-dom';
import App from '../website/App';

// render(<App />, document.getElementById('app'));

const app = document.getElementById( "app" );
ReactDOM.hydrate( <App />, app );