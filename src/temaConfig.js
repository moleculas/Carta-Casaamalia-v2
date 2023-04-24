import { createTheme } from "@mui/material";
//import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f1c761',
            light: '#f6dc9d',
            dark: '#e0b652'
        },
        secondary: blueGrey,
        error: red,
        custom: {
            light: '#ca2c30',
            main: '#bd2529',
            dark: '#ae1a1e',
            contrastText: '#ffffff',
        },
        background: {
            default: "#fafafa !important"
        }
    },
    typography: {
        h1: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h2: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h3: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h4: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h5: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h6: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        //defecto
        body1: {
            fontFamily: [
                'Roboto',
            ].join(','),
            fontSize: '0.9rem',
            '@media (min-width:600px)': {
                fontSize: '1rem',
            }
        },
        body2: {
            fontFamily: [
                'Roboto',
            ].join(','),
            fontSize: '0.8rem',
            '@media (min-width:600px)': {
                fontSize: '0.9rem',
            }
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {

            },
        },
        MUIRichTextEditor: {           
            editor: {               
                backgroundColor: "#fafafa",
                padding: "15px",
                height: "200px",
                maxHeight: "200px",
                overflow: "auto"
            }, 
            root: {
                backgroundColor: "#ebebeb",
            },
            toolbar: {
                padding: "5px",
            },          
        }
    },
})

export default theme;