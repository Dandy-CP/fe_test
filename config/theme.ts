import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Textfield Input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fieldset: {
            borderRadius: '10px',
          },
        },
      },
    },

    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
