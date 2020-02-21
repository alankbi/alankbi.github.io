import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import store from './store';

import NavBar from './components/view/NavBar';
import Home from './components/layout/Home';
import Blog from './components/layout/Blog';
import About from './components/layout/About';
import styled from "styled-components";


const Container = styled.div`
  margin: 100px auto;
  width: 80%;
  background: blue;
  justify-content: center;
`;

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/about" component={About} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;