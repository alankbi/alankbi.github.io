import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import store from './store';

import NavBar from './components/view/NavBar';
import Home from './components/layout/Home';
import Blog from './components/layout/Blog';
import About from './components/layout/About';
import Theme from './Theme'
import styled from 'styled-components';


const Container = styled.div`
  font-family: ${ ({ theme }) => theme.font };
  background: ${ ({ theme }) => theme.background };
`;


const Content = styled.div`
  margin: 160px auto;
  width: 80%;
  justify-content: center;
`;

function App() {
  return (
    // <Provider store={store}>
    <Theme>
      <BrowserRouter>
        <Container className="app">
          <NavBar />
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/about" component={About} />
            </Switch>
          </Content>
        </Container>
      </BrowserRouter>
    </Theme>
    // </Provider>
  );
}

export default App;