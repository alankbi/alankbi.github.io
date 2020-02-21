import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    text: '#444',
    green: '#00ff00',
    background: '#f8f8f8',
  },
  font: 'Lato',
  fontSizes: {
    small: '14px',
    normal: '18px',
    title: '26px',
    header: '50px',
    navbar: '15px',
    navbartitle: '20px',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
