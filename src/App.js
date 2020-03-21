import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/view/NavBar';
import Footer from './components/view/Footer';
import Theme, { ThemeConfig } from './Theme'
import styled from 'styled-components';
import Content from './components/layout/Content';


const Container = styled.div`
  font-family: ${ ({ theme }) => theme.font };
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

            <Content />

            <Footer colorChange={this.changeColor} />
          </Container>
        </BrowserRouter>
      </Theme>
    );
  }
}

export default App;