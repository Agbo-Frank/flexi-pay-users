import { createTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';

let theme = createTheme({
    palette:{
        primary: {
            main: '#1900FE',
            light: 'rgba(255, 80, 0, 0.5)'
        },
        secondary: {
            main: '#FF5000'
        }
    },
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: 15,
                    textTransform: 'capitalize',
                    '&:hover': {
                        backgroundColor: '#1900FE',
                        color: 'white',
                    },
                    '&:focus': {
                        backgroundColor: '#1900FE',
                        color: 'white',
                    },
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    boxShadow: '4px 6px 38px -13px rgba(0,0,0,0.75)'
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                hover: {
                    boxShadow: '4px 6px 38px -13px rgba(0,0,0,0.75)'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    borderRadius: 10
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: { 
                    borderRadius: 3,
                    [`& fieldset`]: {
                        borderRadius: 10,
                        // border: '1px solid  #1900FE'
                    },
                }
            }
        }
      },
})

theme = createTheme(theme, {
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: theme.breakpoints.down('xs') ? false : true
            },
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    borderRadius: theme.breakpoints.down('sm') ? 5 : 5
                }
            }
        },
    }
  });
  

export default theme