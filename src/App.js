import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/view/NavBar';
import Footer from './components/view/Footer';
import Home from './components/layout/Home';
import Blog from './components/layout/Blog';
import About from './components/layout/About';
import ProjectPage from './components/layout/ProjectPage';
import NotFound from './components/layout/NotFound';
import Theme, { ThemeConfig } from './Theme'
import styled from 'styled-components';


const Container = styled.div`
  font-family: ${ ({ theme }) => theme.font };
`;

const Content = styled.div`
  margin: 160px auto;
  width: 80%;
  justify-content: center;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: ['blue', 'green', 'red', 'yellow'],
      colorIndex: 0,
    };

    document.body.style.backgroundColor = ThemeConfig.colors.background;

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    let { colors, colorIndex } = this.state;
    colorIndex = (colorIndex + 1) % colors.length;
    ThemeConfig.colors.current = ThemeConfig.colors[colors[colorIndex]];
    this.setState({ colorIndex });
  }

  render() {
    return (
      <Theme>
        <BrowserRouter>
          <Container className="app">
            <NavBar/>
            <Content style={{marginBottom: "120px"}}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/blog" component={Blog}/>
                <Route exact path="/about" component={About}/>
                <Route path="/projects/:project" component={ProjectPage}/>
                <Route component={NotFound}/>
              </Switch>
            </Content>
            <Footer colorChange={this.changeColor} />
          </Container>
        </BrowserRouter>
      </Theme>
    );
  }
}

export default App;