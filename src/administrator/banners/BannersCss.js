import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container:{
        display:'flex',
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
        width:"100%",
        background:"radial-gradient(ellipse at 7% 23%, rgba(169, 222, 218, 1) 0%, rgba(252, 236, 255, 1) 100%)"
    },

    box:{
        width:"40vw",
        height:"auto",
        background:"#fff",
        padding:20,
        borderRadius:5,
        
    },

    font:{
        fontFamily:"Poppins",
        fontWeight:600,
        fontSize:25,
        letterSpacing:1,
        
    },

    boton:{
        
        fontWeight:300
    },
   
    errorText:{
        fontSize:12.6,
        color:"rgba(211,60,77,255)",
        paddingLeft:15,
        paddingTop:3,
        letterSpacing:0.5,
        fontWeight:500
    },

    displaycontainer:{
        display:'flex',
        alignItems:"center",
        justifyContent:"center",
        height:"100vh",
        width:"100vw",
        background:"linear-gradient(120deg, #4ca1af, #c4e0e5)",
    },

    displaybox:{
        width:"70vw",
        height:"auto",
        background:"#fff",
        padding:20,
        borderRadius:5,
        
    },

    dialogbox:{
        width:"30vw",
        height:"auto",
        background:"#fff",
        padding:20,
        borderRadius:5,
    
    }

    
});

