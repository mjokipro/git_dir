

import React from 'react'
import { ThemeProvider } from 'styled-components'
import Box from './Box';

const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};

export default function Theme() {
  return (
    <ThemeProvider theme={theme}>
      <Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
<Box color="primary">blue</Box>
    </ThemeProvider>
  )
}