import React from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeConfig = {
  colors: {
    text: '#444',
    green: '#33cc66',
    background: '#f8f8f8',
  },
  font: 'Lato',
  fontSizes: {
    small: '14px',
    normal: '18px',
    title: '26px',
    header: '50px',
    itemtitle: '45px',
    itemdesc: '22px',
    navbar: '15px',
    navbartitle: '20px',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={ThemeConfig}>{children}</ThemeProvider>
);

export default Theme;
