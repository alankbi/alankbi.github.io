import React from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeConfig = {
  colors: {
    text: '#444',
    green: '#39B54A',
    yellow: '#FCAD21',
    red: '#D74724',
    blue: '#3E93CD',
    background: '#FAFAFA',
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
