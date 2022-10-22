import { createTheme } from "@mui/material";






const theme = createTheme({
    palette: {
        status: {
            main: '#fff',
        },

        primary: {
            main: '#000000',
        },

        secondary: {
            dark: '#ba000d',
            main: '#f44336',
        },



    },
    typography: {
        fontFamily: 'Dosis',
        button:{
            textTransform:'none',
        }
    },
    components:{
        MuiToggleButton:{
            styleOverrides:{
                root:{
                    color:'#293264',
                    padding:'7px 25px',
                    textAlign:'center',
                    margin: "1px 15px 0 0", 
                    width:'max-content',
                    border: "1px solid !important",
                    borderRadius: "25px!important",
                    display:'flex',
                    
               "&.Mui-selected": {
                      backgroundColor: "#000000",
                      color:'white',
                      borderStyle: "none!important"
                    },

                }
            }
           
        },
        MuiInput:{
        styleOverrides:{
            root:{
              '&:before':{
                'content':'none'
              },
              "&:after":{
                borderBottom:'none'
              }
            },
            input: {
                fontSize:'1rem',
                textAlign:'center',
                opacity:'0.85',
                fontWeight:'500',
                padding:'0.1rem 0.5rem',
                width:"100%",
                flexGrow:'1',

                "&:focus":{
                    border:'1px solid black'
                },
                
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    display: "none",
                    border:'none'
                },

            }
           
        }
        
    }
}
    
})


export default theme;