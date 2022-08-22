import { createTheme } from '@mui/material'

const theme = createTheme({
    palette:{
        primary: {
            main: '#1900FE',
            light: 'rgba(255, 80, 0, 0.5)'
        },
        secondary: {
            main: '#FF5000'
        },
        // success: {
        //     main: '#66bb6a',
        //     light: '#81c784',
        //     dark: '#388e3c'
        // },
        // error: {
        //     main: '#e57373',
        //     light: '#81c784',
        //     dark: '#d32f2f'
        // },
        // info: {
        //     main: '#29b6f6',
        //     light: '#4fc3f7',
        //     dark: '#0288d1'
        // },
        // warning: {
        //     main: '#ffa726',
        //     light: '#ffb74d',
        //     dark: '#f57c00'
        // }
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
        // MuiFormControl: {
        //     styleOverrides: {
        //         root: {}
        //     }
        // },
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
        // MuiTableHead: {

        // }
      },
})

export default theme