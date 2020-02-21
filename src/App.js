import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import store from './store';

import NavBar from './components/view/NavBar';
import Home from './components/layout/Home';
import Blog from './components/layout/Blog';
import About from './components/layout/About';

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;