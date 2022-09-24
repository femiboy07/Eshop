import { createTheme } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";





const theme = createTheme({
    palette: {
        status: {
            main: '#fff',
        },

        primary: {
            main: blueGrey[800],
        },

        secondary: {
            dark: '#ba000d',
            main: '#f44336',
        },



    },
    typography: {
        fontFamily: 'Dosis'
    }
})


export default theme;