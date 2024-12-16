import React from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeConfig = {
  colors: {
    text: '#444',
    blue: '#465a7a',
    green: '#42593d',
    white: 'white',
    gray: 'gray',
    background: '#FCFCFC',
    current: '#465a7a',
  },
  gradients: {
    itemshadow: '0 1px 30px rgba(0, 0, 0, 0.12)',
    itemshadowhover: '0 1px 40px rgba(0, 0, 0, 0.24)',
    colorshadow: '0 0px 8px rgba(0, 0, 0, 0.16)',
  },
  font: 'Lato',
  fontSizes: {
    small: '15px',
    normal: '18px',
    large: '24px',
    title: '28px',
    header: '50px',
    headermobile: '40px',
    itemtitle: '40px',
    itemtitlemobile: '32px',
    itemdesc: '22px',
    navbar: '16px',
    navbartitle: '20px',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={ThemeConfig}>{children}</ThemeProvider>
);

export default Theme;
