import { Margin } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    dialog_box:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"Poppins",
        fontSize:18,
        fontColor:"rgb(0,0,0)",
        
    },

    title:{
        fontFamily:"Poppins",
        fontSize:24,
        fontWeight:100
    },

    head:{
        padding:25,
        textAlign:"center"
    },

    footer:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        fontFamily:"Poppins",
        lineHeight:"13.8px",
        fontSize:"12px",
        fontWeight:400,
    },

    footer_text:{
        fontFamily:"Poppins",
        lineHeight:"13.8px",
        fontSize:"12px",
        fontWeight:400,
        
        margin:"1rem 0 0.5rem 0",
        
        
    },

    footer_link:{
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"row",
        alignItems:"center",
        fontFamily:"Poppins",
        lineHeight:"13.8px",
        fontSize:"12px",
        fontWeight:400,
        
        marginBottom:"2rem",
        

    },

    link_text:{
        color: "rgb(12, 131, 31)",
        margin:"2px"
    }
})